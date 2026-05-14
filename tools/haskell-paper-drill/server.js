#!/usr/bin/env node

const fs = require("fs");
const fsp = require("fs/promises");
const http = require("http");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");

const ROOT = __dirname;
const REPO_ROOT = path.resolve(ROOT, "..", "..");
const DATA_DIR = path.join(REPO_ROOT, ".paper-drill");
const TMP_DIR = path.join(DATA_DIR, "tmp");
const HISTORY_FILE = path.join(DATA_DIR, "history.json");
const HOST = process.env.HOST || "127.0.0.1";
const PORT = Number(process.env.PORT || 8787);
const MAX_BODY = 2 * 1024 * 1024;

const CHECKS = {
  sets: `module Main where

import Attempt
import Data.List (sort)

assert :: Bool -> String -> IO ()
assert True _ = pure ()
assert False msg = error msg

same :: Ord a => [a] -> [a] -> Bool
same a b = sort a == sort b

main :: IO ()
main = do
  assert (same (union [1,2] [2,3 :: Int]) [1,2,3]) "union basic"
  assert (same (union [] ["a","b"]) ["a","b"]) "union empty"
  assert (same (symd [1,2,3 :: Int] [2,4]) [1,3,4]) "symd basic"
  assert (same (symd "abc" "bcd") "ad") "symd chars"
`,
  bst: `module Main where

import Attempt

assert :: Bool -> String -> IO ()
assert True _ = pure ()
assert False msg = error msg

main :: IO ()
main = do
  let t0 = empty
  let t1 = ins 7 "seven" (ins 3 "three" (ins 9 "nine" t0))
  assert (lookupT 3 t1 == Just "three") "lookup existing left"
  assert (lookupT 9 t1 == Just "nine") "lookup existing right"
  assert (lookupT 4 t1 == Nothing) "lookup missing"
  let t2 = ins 3 "THREE" t1
  assert (lookupT 3 t2 == Just "THREE") "replace duplicate key"
`,
  histogram: `module Main where

import Attempt

assert :: Bool -> String -> IO ()
assert True _ = pure ()
assert False msg = error msg

main :: IO ()
main = do
  let xs = [Result "a" A, Result "b" C, Result "c" A, Result "d" F]
  assert (hist [] == []) "empty histogram"
  assert (hist xs == [(A,2),(C,1),(F,1)]) "hist counts and skips zero grades"
`,
  freeVars: `module Main where

import Attempt
import Data.List (sort)

assert :: Bool -> String -> IO ()
assert True _ = pure ()
assert False msg = error msg

same :: [String] -> [String] -> Bool
same a b = sort a == sort b

main :: IO ()
main = do
  assert (same (fv (Lam "x" (App (Var "x") (Var "y")))) ["y"]) "lambda removes bound var"
  assert (same (fv (App (Lam "x" (Var "x")) (Var "z"))) ["z"]) "application combines vars"
  assert (same (fv (App (Var "x") (Var "x"))) ["x"]) "no duplicates"
`,
  readh: `module Main where

import Attempt

assert :: Bool -> String -> IO ()
assert True _ = pure ()
assert False msg = error msg

main :: IO ()
main = do
  assert (readh "0" == 0) "zero"
  assert (readh "A" == 10) "single digit"
  assert (readh "10" == 16) "base step"
  assert (readh "1F" == 31) "mixed digits"
  assert (readh "ABC" == 2748) "larger value"
`,
  mid: `module Main where

import Attempt

assert :: Bool -> String -> IO ()
assert True _ = pure ()
assert False msg = error msg

balanced :: Ord a => a -> [a] -> Bool
balanced pivot xs =
  let smaller = length [x | x <- xs, x < pivot]
      greater = length [x | x <- xs, x > pivot]
   in abs (smaller - greater) <= 1

main :: IO ()
main = do
  assert (mid [1 :: Int] == 1) "singleton"
  assert (balanced (mid [1,2,3,4,5 :: Int]) [1,2,3,4,5]) "odd length"
  assert (balanced (mid [1,2,3,4 :: Int]) [1,2,3,4]) "even length"
  assert (balanced (mid "abcdefg") "abcdefg") "polymorphic over Ord"
`,
  exprEval: `module Main where

import Attempt

assert :: Bool -> String -> IO ()
assert True _ = pure ()
assert False msg = error msg

main :: IO ()
main = do
  assert (eval (Val 3) == 3) "value"
  assert (eval (Add (Val 2) (Val 5)) == 7) "addition"
  assert (eval (Sub (Val 9) (Val 4)) == 5) "subtraction"
  assert (eval (Add (Sub (Val 9) (Val 4)) (Val 10)) == 15) "nested"
`,
  lfi: `module Main where

import Attempt

assert :: Bool -> String -> IO ()
assert True _ = pure ()
assert False msg = error msg

main :: IO ()
main = do
  assert (take 10 lfi == [0,1,1,2,3,5,8,13,21,34 :: Integer]) "first ten fibonacci numbers"
  assert (take 5 (drop 5 lfi) == [5,8,13,21,34 :: Integer]) "infinite tail"
`,
};

const RECOMMENDATIONS = {
  syntax: "15 minut opisovat signatury a pattern matching bez editoru.",
  types: "Ke každé funkci napsat signaturu dřív než tělo.",
  names: "U zkouškových zadání opisovat přesné názvy typů, konstruktorů a funkcí.",
  "base-cases": "Před rekurzí vypsat všechny prázdné a singleton případy.",
  recursion: "Trénovat jeden strukturální krok a pojmenovat menší problém.",
  invariant: "Před kódem napsat invariant reprezentace a kontrolovat ho po každé větvi.",
  prelude: "Zopakovat foldr/foldl/map/filter/words/lines/unlines.",
  io: "Oddělovat IO obal od čistého parseru a formátovače.",
  proof: "Psát důkaz jako řetěz rovností s explicitní definicí a IP.",
  behavior: "Dopsat 3 malé vstup-výstup příklady před implementací.",
  "data-model": "Nejdřív nakreslit konstruktory a invariant typu.",
};

const ERROR_LABELS = {
  syntax: "syntaxe/odsazení",
  types: "typy/signatury",
  names: "názvy/konstruktory",
  "base-cases": "base cases",
  recursion: "rekurzivní krok",
  invariant: "invariant/duplicity",
  prelude: "Prelude/helpery",
  io: "IO hranice",
  proof: "důkaz/IP",
  behavior: "chování/testy",
};

function json(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > MAX_BODY) {
        reject(new Error("Request body is too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (_error) {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

async function readHistory() {
  try {
    const raw = await fsp.readFile(HISTORY_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function writeHistory(history) {
  await fsp.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${HISTORY_FILE}.tmp`;
  await fsp.writeFile(tmp, `${JSON.stringify(history, null, 2)}\n`);
  await fsp.rename(tmp, HISTORY_FILE);
}

function unique(values) {
  return [...new Set((values || []).filter(Boolean))];
}

function increment(map, key, by = 1) {
  if (!key) return;
  map.set(key, (map.get(key) || 0) + by);
}

function sortedCounts(map) {
  return Array.from(map.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

function errorTagsFor(item) {
  return unique([...(item.errorTags || []), ...(item.detectedErrorTags || []), ...(item.checkResult?.errorTags || [])]);
}

function summarize(history) {
  const attempts = history.length;
  const scored = history.filter((item) => Number.isFinite(item.selfScore));
  const averageScore =
    scored.length === 0 ? null : scored.reduce((sum, item) => sum + item.selfScore, 0) / scored.length;
  const weakCounts = new Map();
  const errorCounts = new Map();
  const topicErrorCounts = new Map();
  const topicScores = new Map();

  for (const item of history) {
    for (const concept of item.weakConcepts || []) {
      increment(weakCounts, concept);
    }
    const errors = errorTagsFor(item);
    for (const error of errors) {
      increment(errorCounts, error);
      increment(topicErrorCounts, `${item.tag || item.topic || "mix"}::${error}`);
    }
    if (Number.isFinite(item.selfScore)) {
      const current = topicScores.get(item.topic) || { count: 0, total: 0 };
      current.count += 1;
      current.total += item.selfScore;
      topicScores.set(item.topic, current);
    }
  }

  const weakList = sortedCounts(weakCounts);
  const errorList = sortedCounts(errorCounts).map(([tag, count]) => ({
    tag,
    label: ERROR_LABELS[tag] || tag,
    count,
    recommendation: RECOMMENDATIONS[tag] || null,
  }));
  const topicErrorList = sortedCounts(topicErrorCounts).map(([key, count]) => {
    const [topic, tag] = key.split("::");
    return {
      topic,
      tag,
      label: `${topic}: ${ERROR_LABELS[tag] || tag}`,
      count,
    };
  });
  const topicList = Array.from(topicScores.entries()).map(([topic, value]) => ({
    topic,
    attempts: value.count,
    averageScore: value.total / value.count,
  }));
  const recent = history
    .slice(-8)
    .reverse()
    .map((item) => ({
      title: item.title,
      topic: item.topic,
      score: item.selfScore,
      errors: errorTagsFor(item).map((tag) => ERROR_LABELS[tag] || tag),
      finishedAt: item.finishedAt,
    }));

  return {
    attempts,
    averageScore,
    weakestConcept: weakList[0]?.[0] || null,
    weakConcepts: weakList.map(([concept, count]) => ({ concept, count })),
    topError: errorList[0] || null,
    errorStats: errorList,
    topicErrorStats: topicErrorList,
    topicScores: topicList,
    recommendations: unique([
      ...errorList.slice(0, 3).map((item) => item.recommendation || item.label),
      ...weakList.slice(0, 3).map(([concept]) => RECOMMENDATIONS[concept] || concept),
    ].filter(Boolean)),
    recent,
  };
}

function run(command, args, cwd, timeoutMs = 5000) {
  return new Promise((resolve) => {
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    let settled = false;
    const done = (result) => {
      if (settled) return;
      settled = true;
      resolve(result);
    };
    const child = spawn(command, args, {
      cwd,
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, HOME: process.env.HOME || os.homedir() },
    });
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill("SIGKILL");
    }, timeoutMs);
    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", (error) => {
      clearTimeout(timer);
      done({ ok: false, code: null, output: error.message, timedOut });
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      const output = `${stdout}${stderr}`.trim();
      done({ ok: code === 0 && !timedOut, code, output, timedOut });
    });
  });
}

function wrapAttemptSource(answer) {
  const source = String(answer || "").replace(/\r\n/g, "\n");
  if (/^\s*module\s+[A-Z][A-Za-z0-9_.']*\s+where/m.test(source)) return source;
  const lines = source.split("\n");
  const pragmas = [];
  while (lines[0] && /^\s*{-#/.test(lines[0])) {
    pragmas.push(lines.shift());
  }
  return `${pragmas.join("\n")}${pragmas.length ? "\n" : ""}module Attempt where\n\n${lines.join("\n")}\n`;
}

function classifyCheckResult(result) {
  if (result.ok) return [];
  const output = [result.typecheck?.output, result.tests?.output].filter(Boolean).join("\n").toLowerCase();
  const tags = [];
  if (/parse error|lexical error|layout|parse error on input/.test(output)) tags.push("syntax");
  if (/couldn't match|ambiguous type|expected|actual|no instance for|arising from/.test(output)) tags.push("types");
  if (/not in scope|data constructor not in scope|variable not in scope/.test(output)) tags.push("names");
  if (result.typecheck?.timedOut || result.tests?.timedOut) tags.push("recursion");
  if (result.tests && !result.tests.ok) tags.push("behavior");
  return unique(tags.length ? tags : ["behavior"]);
}

async function checkAttempt(payload) {
  const checkId = payload.checkId || null;
  if (checkId && !CHECKS[checkId]) {
    return { ok: false, error: `Unknown checkId: ${checkId}` };
  }
  await fsp.mkdir(TMP_DIR, { recursive: true });
  const dir = await fsp.mkdtemp(path.join(TMP_DIR, "attempt-"));
  const attemptPath = path.join(dir, "Attempt.hs");
  const testPath = path.join(dir, "Test.hs");
  await fsp.writeFile(attemptPath, wrapAttemptSource(payload.answer || ""));

  const typecheck = await run("ghc", ["-ignore-dot-ghci", "-fno-code", "-v0", attemptPath], dir, 5000);
  if (!typecheck.ok) {
    const result = { ok: false, typecheck, tests: null };
    return { ...result, errorTags: classifyCheckResult(result) };
  }
  if (!checkId) {
    return { ok: true, typecheck, tests: null };
  }
  await fsp.writeFile(testPath, CHECKS[checkId]);
  const tests = await run("runghc", ["-ignore-dot-ghci", `-i${dir}`, testPath], dir, 5000);
  const result = { ok: typecheck.ok && tests.ok, typecheck, tests };
  return { ...result, errorTags: classifyCheckResult(result) };
}

async function health() {
  const ghc = await run("ghc", ["--numeric-version"], ROOT, 2000);
  const runghc = await run("runghc", ["--version"], ROOT, 2000);
  return {
    ok: ghc.ok && runghc.ok,
    ghcVersion: ghc.output || null,
    runghc: runghc.ok,
  };
}

function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || `${HOST}:${PORT}`}`);
  const pathname = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const target = path.resolve(ROOT, `.${pathname}`);
  if (!(target === ROOT || target.startsWith(`${ROOT}${path.sep}`))) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  fs.stat(target, (statError, stat) => {
    if (statError || !stat.isFile()) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const ext = path.extname(target);
    const type =
      {
        ".html": "text/html; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".js": "text/javascript; charset=utf-8",
      }[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    fs.createReadStream(target).pipe(res);
  });
}

async function handleApi(req, res) {
  try {
    const url = new URL(req.url, `http://${req.headers.host || `${HOST}:${PORT}`}`);
    if (req.method === "GET" && url.pathname === "/api/health") {
      json(res, 200, await health());
      return;
    }
    if (req.method === "GET" && url.pathname === "/api/history") {
      json(res, 200, await readHistory());
      return;
    }
    if (req.method === "GET" && url.pathname === "/api/stats") {
      json(res, 200, summarize(await readHistory()));
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/check") {
      json(res, 200, await checkAttempt(await parseBody(req)));
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/attempts") {
      const attempt = await parseBody(req);
      const history = await readHistory();
      history.push({ ...attempt, savedAt: new Date().toISOString() });
      await writeHistory(history);
      json(res, 201, { ok: true, attempts: history.length });
      return;
    }
    json(res, 404, { error: "API route not found" });
  } catch (error) {
    json(res, 500, { error: error.message });
  }
}

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/api/")) {
    handleApi(req, res);
    return;
  }
  serveStatic(req, res);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    process.stderr.write(`Port ${PORT} is already in use. Try: PORT=8788 node tools/haskell-paper-drill/server.js\n`);
    process.exit(1);
  }
  if (error.code === "EACCES" || error.code === "EPERM") {
    process.stderr.write(`Cannot listen on ${HOST}:${PORT}: ${error.message}\n`);
    process.exit(1);
  }
  throw error;
});

server.listen(PORT, HOST, () => {
  process.stdout.write(`FLP Paper Drill: http://${HOST}:${PORT}\n`);
});
