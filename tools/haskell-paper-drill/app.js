const tasks = [
  {
    id: "free-vars",
    topic: "data",
    tag: "Datové typy",
    title: "Lambda výrazy a volné proměnné",
    source: "2024/2025 řádný, Haskell část",
    sourceKind: "variant",
    sourceLabel: "varianta",
    sourceNote: "Původní téma: lambda AST, množinové operace a fv; pevné názvy jsou přidané kvůli testům.",
    checkId: "freeVars",
    concepts: ["datové typy", "rekurze", "seznamové množiny", "volné proměnné"],
    make(rng) {
      const helper = pick(rng, ["union", "minus", "insertUniq"]);
      return {
        subtitle: `Přesné názvy pro test: LExp, Var, Lam, App, fv. Pomocná funkce: ${helper}.`,
        text: `Definuj:

data LExp = Var String | Lam String LExp | App LExp LExp

1. Doplň vhodné odvozené instance.
2. Definuj union :: Eq a => [a] -> [a] -> [a] pro seznamy bez duplicit.
3. Definuj fv :: LExp -> [String], která vrátí volné proměnné bez duplicit.
4. Přidej krátký komentář k případu Lam.

Nepoužívej importy.`,
        rubric: [
          "Typ má přesně konstruktory Var, Lam a App.",
          "union nevrací duplicity a funguje i pro prázdný seznam.",
          "Lam odstraní vázanou proměnnou z výsledku těla.",
          "App spojí volné proměnné obou podvýrazů množinově.",
        ],
      };
    },
  },
  {
    id: "sets",
    topic: "lists",
    tag: "Seznamy",
    title: "Množiny jako seznamy",
    source: "2024/2025 řádný, Haskell část",
    sourceKind: "variant",
    sourceLabel: "varianta",
    sourceNote: "Vychází z množinové části starého zadání, ale je zúžené na samostatný drill.",
    checkId: "sets",
    concepts: ["base cases", "rekurze", "Eq", "duplicity"],
    make(rng) {
      const order = pick(rng, ["pořadí prvního výskytu", "nejdřív prvky levé množiny", "stabilní pořadí zleva"]);
      return {
        subtitle: `Reprezentace bez duplicit, ${order}.`,
        text: `Množiny reprezentuj seznamy bez duplicit.

1. Definuj union :: Eq a => [a] -> [a] -> [a].
2. Definuj symd :: Eq a => [a] -> [a] -> [a] pro symetrický rozdíl.
3. Připiš 3 malé příklady vstup-výstup v komentáři.

Nepoužívej Data.List ani jiné importy.`,
        rubric: [
          "union pokryje prázdné vstupy a nezavádí duplicity.",
          "symd vrací prvky, které jsou právě v jedné ze vstupních množin.",
          "Typy jsou obecné přes Eq a.",
          "Příklady odpovídají zvolené reprezentaci.",
        ],
      };
    },
  },
  {
    id: "bst",
    topic: "io",
    tag: "IO + strom",
    title: "Tabulka ze souboru do BST",
    source: "2024/2025 předtermín, Haskell fragment",
    sourceKind: "variant",
    sourceLabel: "varianta",
    sourceNote: "Vychází z fragmentu se stromem/IO; API je zpřesněné pro post-hoc test.",
    checkId: "bst",
    concepts: ["BST invariant", "Maybe", "rekurze", "IO rozhraní"],
    make(rng) {
      const sep = pick(rng, [":", "=", "|"]);
      return {
        subtitle: `Přesné názvy pro test: Tree, empty, ins, lookupT. Oddělovač v IO části: ${sep}`,
        text: `Definuj binární vyhledávací strom:

data Tree k v = ...
empty :: Tree k v
ins :: Ord k => k -> v -> Tree k v -> Tree k v
lookupT :: Ord k => k -> Tree k v -> Maybe v

Požadavky:
- ins vloží dvojici klíč-hodnota,
- při existujícím klíči hodnotu nahradí,
- lookupT vrací Nothing pro chybějící klíč,
- doplň readTable :: FilePath -> IO (Tree Int String).

Soubor má na každém řádku tvar k${sep}v. Vstup je korektní.
Nepoužívej importy.`,
        rubric: [
          "Tree má prázdný a neprázdný konstruktor.",
          "ins zachovává BST invariant a přepisuje duplicitní klíč.",
          "lookupT pokrývá všechny větve a vrací Maybe.",
          "IO část odděluje načtení souboru od čistého parsování.",
        ],
      };
    },
  },
  {
    id: "histogram",
    topic: "data",
    tag: "Datové typy",
    title: "Histogram známek",
    source: "2025/2026 půlsemestrálka signál",
    sourceKind: "signal",
    sourceLabel: "signál",
    sourceNote: "Není staré zkouškové zadání. Je to drill podle letošního signálu na datové typy a histogram.",
    checkId: "histogram",
    concepts: ["výčtový typ", "fold", "četnosti", "String výstup"],
    make(rng) {
      const outputName = pick(rng, ["ht", "showHist", "histText"]);
      return {
        subtitle: `Přesné názvy pro test: Grade, Result, hist. Textovou funkci nazvi ${outputName}.`,
        text: `Definuj:

data Grade = A | B | C | D | E | F
data Result = Result String Grade

1. Doplň vhodné odvozené instance.
2. Definuj hist :: [Result] -> [(Grade, Int)].
3. Výsledek hist vracej v pořadí A-F a známky s nulovou četností vynech.
4. Definuj ${outputName} :: [Result] -> String ve formátu:

A: 3
B: 1

Nepoužívej importy.`,
        rubric: [
          "Grade je konečný výčtový typ s použitelnou rovností.",
          "Result obsahuje identifikátor a známku.",
          "hist počítá četnosti čistě a nevrací nulové řádky.",
          "Textová funkce jen formátuje už spočítaný histogram.",
        ],
      };
    },
  },
  {
    id: "take-drop-proof",
    topic: "proof",
    tag: "Důkaz",
    title: "take/drop",
    source: "2023/2024 první opravný, Haskell část",
    sourceKind: "variant",
    sourceLabel: "varianta",
    sourceNote: "Téma take/drop bylo nalezené ve staré zkoušce; formulace je normalizovaná pro cvičení.",
    checkId: null,
    concepts: ["indukce", "++", "případy", "definice funkcí"],
    make() {
      return {
        subtitle: "Strukturální indukce s případem n = 0.",
        text: `Mějme definováno:

take 0 xs = []
take _ [] = []
take n (x:xs) = x : take (n-1) xs

drop 0 xs = xs
drop _ [] = []
drop n (x:xs) = drop (n-1) xs

Dokaž:

take n xs ++ drop n xs = xs

pro všechna nezáporná n a konečné seznamy xs.
Uvažuj nutné případy tak, aby bylo jasné, kdy používáš indukční předpoklad.`,
        rubric: [
          "Případ n = 0 je rozepsaný samostatně.",
          "Případ xs = [] je rozepsaný samostatně.",
          "Krok pro n > 0 a xs = x:xs' vede na IP pro n-1 a xs'.",
          "Použití definice ++ je explicitní.",
        ],
      };
    },
  },
  {
    id: "fold-proof",
    topic: "proof",
    tag: "Důkaz",
    title: "concat přes foldr",
    source: "2024/2025 řádný bonus, Haskell část",
    sourceKind: "variant",
    sourceLabel: "varianta",
    sourceNote: "Téma ccat/con je ze starého bonusu; podobný foldr důkaz se objevuje i v 2021/2022.",
    checkId: null,
    concepts: ["foldr", "indukce", "asociativita", "definice ++"],
    make() {
      return {
        subtitle: "Důkaz nad seznamem seznamů.",
        text: `Mějme:

ccat [] = []
ccat (xs:xss) = xs ++ ccat xss

con = foldr (++) []

Dokaž:

ccat xss = con xss

pro všechny konečné seznamy seznamů xss.
Piš kroky rovnosti a označ použití indukčního předpokladu.`,
        rubric: [
          "Báze prázdného seznamu je vyhodnocená na obou stranách.",
          "Indukční krok rozepíše ccat i foldr.",
          "IP je použitá na ocasu xss.",
          "Pokud používáš vlastnost ++, je pojmenovaná a potřebná.",
        ],
      };
    },
  },
  {
    id: "words-by-length",
    topic: "io",
    tag: "IO",
    title: "Skupiny slov podle délky",
    source: "2023/2024 první opravný, Haskell IO",
    sourceKind: "variant",
    sourceLabel: "varianta",
    sourceNote: "Vychází z nalezené IO úlohy se seskupováním slov; názvy funkcí se generují.",
    checkId: null,
    typecheckOnly: true,
    concepts: ["IO", "čisté jádro", "rekurze", "formátování"],
    make(rng) {
      const fn = pick(rng, ["fx", "groupWords", "printGroups"]);
      return {
        subtitle: `Hlavní IO akce: ${fn} :: FilePath -> IO ().`,
        text: `Definuj:

${fn} :: FilePath -> IO ()

Akce načte soubor, rozdělí obsah na slova a vypíše slova do skupin podle délky.

Požadavky:
- skupiny vypisuj od nejkratší po nejdelší,
- na pořadí slov uvnitř skupiny nezáleží,
- před každou skupinu uveď její délku,
- prázdný soubor ošetři rozumně.

Použij Prelude a běžné IO funkce, bez importů.`,
        rubric: [
          "Čistá část umí zařadit slova podle délky.",
          "Výpis je seřazen podle délky.",
          "IO akce je krátká a skládá čisté funkce.",
          "Prázdný vstup nepadá na pattern match.",
        ],
      };
    },
  },
  {
    id: "expr-pp",
    topic: "data",
    tag: "Datové typy",
    title: "Pretty-print aritmetického výrazu",
    source: "2022/2023 předtermín, Haskell styl",
    sourceKind: "variant",
    sourceLabel: "varianta",
    sourceNote: "Vychází ze starého tématu výrazů a pretty-printu; operátory se variantují.",
    checkId: null,
    typecheckOnly: true,
    concepts: ["AST", "precedence", "rekurze", "prostředí"],
    make(rng) {
      const ops = pick(rng, ["sčítání a násobení", "sčítání a odčítání", "sčítání, násobení a negace"]);
      return {
        subtitle: `Operátory: ${ops}.`,
        text: `1. Definuj datový typ pro celočíselné aritmetické výrazy: konstanta, proměnná a ${ops}.
2. Definuj eval pro prostředí reprezentované seznamem dvojic (jméno, hodnota).
3. Definuj pp :: Expr -> String s minimálním nutným závorkováním.

Příklad stylu:

(1+2)*3
1+2+3

Pokud si nejsi jistý prioritami, napiš je explicitně jako pomocnou funkci.`,
        rubric: [
          "Datový typ odpovídá všem operátorům v zadání.",
          "eval korektně rekurzuje a řeší proměnné z prostředí.",
          "pp používá precedenci nebo kontext.",
          "Asociativita je konzistentní.",
        ],
      };
    },
  },
];

const weakConceptCatalog = [
  ["syntax", "syntaxe"],
  ["types", "typy"],
  ["base-cases", "base cases"],
  ["recursion", "rekurze"],
  ["prelude", "Prelude"],
  ["io", "IO"],
  ["proof", "důkaz"],
  ["data-model", "datový model"],
];

const state = {
  current: null,
  running: false,
  finished: false,
  variant: 0,
  startedAt: null,
  finishedAt: null,
  checkResult: null,
  api: false,
};

const els = {
  topic: document.getElementById("topic"),
  seed: document.getElementById("seed"),
  start: document.getElementById("start"),
  submit: document.getElementById("submit"),
  next: document.getElementById("next"),
  reset: document.getElementById("reset"),
  statusText: document.getElementById("statusText"),
  serverStatus: document.getElementById("serverStatus"),
  stats: document.getElementById("stats"),
  source: document.getElementById("source"),
  provenance: document.getElementById("provenance"),
  checkability: document.getElementById("checkability"),
  title: document.getElementById("title"),
  subtitle: document.getElementById("subtitle"),
  tag: document.getElementById("tag"),
  assignmentText: document.getElementById("assignmentText"),
  answer: document.getElementById("answer"),
  editorStatus: document.getElementById("editorStatus"),
  modeStatus: document.getElementById("modeStatus"),
  review: document.getElementById("review"),
  rubricList: document.getElementById("rubricList"),
  runCheck: document.getElementById("runCheck"),
  checkOutput: document.getElementById("checkOutput"),
  selfScore: document.getElementById("selfScore"),
  weakConcepts: document.getElementById("weakConcepts"),
  notes: document.getElementById("notes"),
  saveAttempt: document.getElementById("saveAttempt"),
};

function pick(rng, values) {
  return values[Math.floor(rng() * values.length)];
}

function hashSeed(value) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  return function rng() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function node(tagName, className, text) {
  const el = document.createElement(tagName);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

function appendInline(parent, text) {
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let index = 0;
  for (const match of text.matchAll(pattern)) {
    if (match.index > index) {
      parent.append(document.createTextNode(text.slice(index, match.index)));
    }
    const token = match[0];
    if (token.startsWith("**")) {
      parent.append(node("strong", null, token.slice(2, -2)));
    } else {
      parent.append(node("code", null, token.slice(1, -1)));
    }
    index = match.index + token.length;
  }
  if (index < text.length) {
    parent.append(document.createTextNode(text.slice(index)));
  }
}

function selectedWeakConcepts() {
  return Array.from(els.weakConcepts.querySelectorAll("input:checked")).map((input) => input.value);
}

function renderWeakConcepts() {
  els.weakConcepts.replaceChildren(
    ...weakConceptCatalog.map(([value, label]) => {
      const wrap = document.createElement("label");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.value = value;
      wrap.append(input, document.createTextNode(label));
      return wrap;
    }),
  );
}

function updateEditorStatus() {
  const chars = els.answer.value.length;
  const lines = els.answer.value ? els.answer.value.split("\n").length : 0;
  els.editorStatus.textContent = `${chars} znaků, ${lines} řádků`;
  if (state.startedAt && state.running) {
    els.modeStatus.textContent = "rozpracováno";
  }
}

function chooseTask(rng) {
  const topic = els.topic.value;
  const pool = topic === "any" ? tasks : tasks.filter((task) => task.topic === topic);
  return pick(rng, pool.length ? pool : tasks);
}

function isCodeLine(line) {
  const value = line.trim();
  if (!value) return false;
  return (
    /^data\s/.test(value) ||
    /^[a-z][A-Za-z0-9_']*\s*::/.test(value) ||
    /^[a-z][A-Za-z0-9_']*\s+.*=/.test(value) ||
    /^[a-z][A-Za-z0-9_']*\s*=/.test(value) ||
    /^[A-Z]:\s/.test(value) ||
    /^[(][^)]/.test(value) ||
    value.includes(" -> ") ||
    value.includes(" = ") ||
    value.includes("++")
  );
}

function isNoteLine(line) {
  const value = line.trim();
  return /^(Nepoužívej|Použij|Vstup je|Soubor má|Pokud si|Uvažuj|Piš)/.test(value);
}

function isSectionHeading(line) {
  return /^(Definuj|Požadavky|Příklad požadovaného stylu|Příklad stylu|Mějme|Dokaž):$/.test(line.trim());
}

function renderAssignment(text) {
  const root = document.createDocumentFragment();
  let paragraph = [];
  let code = [];
  let list = null;

  function flushParagraph() {
    if (!paragraph.length) return;
    const p = node("p", "assignment-paragraph");
    appendInline(p, paragraph.join(" "));
    root.append(p);
    paragraph = [];
  }

  function flushCode() {
    if (!code.length) return;
    const pre = node("pre", "assignment-code", code.join("\n"));
    root.append(pre);
    code = [];
  }

  function flushList() {
    if (!list) return;
    root.append(list);
    list = null;
  }

  function startList(type) {
    if (!list || list.tagName.toLowerCase() !== type) {
      flushList();
      list = document.createElement(type);
      list.className = "assignment-list";
    }
  }

  for (const rawLine of text.split("\n")) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      flushCode();
      flushList();
      continue;
    }

    const numbered = trimmed.match(/^(\d+)\.\s+(.*)$/);
    const bullet = trimmed.match(/^-\s+(.*)$/);
    if (numbered || bullet) {
      flushParagraph();
      flushCode();
      startList(numbered ? "ol" : "ul");
      const li = document.createElement("li");
      appendInline(li, numbered ? numbered[2] : bullet[1]);
      list.append(li);
      continue;
    }

    if (isSectionHeading(trimmed)) {
      flushParagraph();
      flushCode();
      flushList();
      const heading = node("h3", "assignment-section");
      appendInline(heading, trimmed.slice(0, -1));
      root.append(heading);
      continue;
    }

    if (isNoteLine(trimmed)) {
      flushParagraph();
      flushCode();
      flushList();
      const note = node("p", "assignment-note");
      appendInline(note, trimmed);
      root.append(note);
      continue;
    }

    if (isCodeLine(trimmed) || line.startsWith("  ")) {
      flushParagraph();
      flushList();
      code.push(line);
      continue;
    }

    flushCode();
    flushList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  flushCode();
  flushList();
  els.assignmentText.replaceChildren(root);
}

function renderTask(task, generated) {
  state.current = {
    id: task.id,
    topic: task.topic,
    tag: task.tag,
    title: task.title,
    source: task.source,
    sourceKind: task.sourceKind,
    sourceLabel: task.sourceLabel,
    sourceNote: task.sourceNote,
    checkId: task.checkId,
    typecheckOnly: task.typecheckOnly || false,
    concepts: task.concepts,
    ...generated,
  };
  state.checkResult = null;
  els.source.textContent = task.source;
  els.provenance.textContent = task.sourceLabel;
  els.provenance.className = `meta-token ${task.sourceKind}`;
  els.provenance.title = task.sourceNote;
  els.checkability.textContent = task.checkId ? "GHC test" : task.typecheckOnly ? "GHC typy" : "rubrika";
  els.checkability.className = task.checkId || task.typecheckOnly ? "meta-token check" : "meta-token";
  els.title.textContent = task.title;
  els.subtitle.textContent = generated.subtitle;
  els.tag.textContent = task.tag;
  renderAssignment(generated.text);
  els.rubricList.replaceChildren(
    ...generated.rubric.map((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      return li;
    }),
  );
  els.answer.value = "";
  els.answer.readOnly = false;
  els.review.hidden = true;
  els.runCheck.disabled = true;
  els.saveAttempt.disabled = true;
  els.checkOutput.textContent = "Po odevzdání dostupné pro vybraná zadání.";
  els.notes.value = "";
  els.selfScore.value = "3";
  els.weakConcepts.querySelectorAll("input").forEach((input) => {
    input.checked = false;
  });
  updateEditorStatus();
}

function startDrill(offset = 0) {
  const seedText = els.seed.value.trim() || new Date().toISOString().slice(0, 10);
  const seed = hashSeed(`${seedText}:${els.topic.value}:${offset}`);
  const rng = mulberry32(seed);
  const task = chooseTask(rng);
  renderTask(task, task.make(rng));
  state.running = true;
  state.finished = false;
  state.startedAt = new Date().toISOString();
  state.finishedAt = null;
  els.submit.disabled = false;
  els.modeStatus.textContent = "rozpracováno";
  els.statusText.textContent = "Rozpracováno. Testy a rubrika se ukážou po odevzdání.";
  els.answer.focus();
}

function finishSession() {
  if (!state.current || state.finished) return;
  state.running = false;
  state.finished = true;
  state.finishedAt = new Date().toISOString();
  els.answer.readOnly = true;
  els.submit.disabled = true;
  els.review.hidden = false;
  const canCheck = state.api && (state.current.checkId || state.current.typecheckOnly);
  els.runCheck.disabled = !canCheck;
  els.saveAttempt.disabled = !state.api;
  els.modeStatus.textContent = "odevzdáno";
  els.statusText.textContent = "Odevzdáno. Teď můžeš pustit GHC check, projít rubriku a uložit pokus.";
}

function resetSession() {
  state.running = false;
  state.finished = false;
  state.startedAt = null;
  state.finishedAt = null;
  state.checkResult = null;
  els.answer.readOnly = false;
  els.submit.disabled = true;
  els.runCheck.disabled = true;
  els.saveAttempt.disabled = true;
  els.review.hidden = true;
  els.modeStatus.textContent = "paper mode";
  els.statusText.textContent = "Bez timeru. Rubrika a testy až po odevzdání.";
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || `HTTP ${response.status}`);
    error.data = data;
    throw error;
  }
  return data;
}

async function loadHealth() {
  try {
    const health = await api("/api/health");
    state.api = true;
    els.serverStatus.className = "server-status ok";
    els.serverStatus.textContent = `server ok, GHC ${health.ghcVersion || "?"}`;
    await refreshStats();
  } catch (_error) {
    state.api = false;
    els.serverStatus.className = "server-status off";
    els.serverStatus.textContent = "server offline";
    els.stats.textContent = "Spusť: node tools/haskell-paper-drill/server.js";
  }
}

function renderStats(stats) {
  els.stats.innerHTML = "";
  if (!stats.attempts) {
    els.stats.append(node("div", "muted", "Zatím žádné uložené pokusy."));
    return;
  }
  const rows = [
    ["Pokusy", String(stats.attempts)],
    ["Průměr", stats.averageScore === null ? "-" : `${stats.averageScore.toFixed(1)} / 5`],
    ["Nejhorší koncept", stats.weakestConcept || "-"],
    ["Doporučení", stats.recommendations[0] || "-"],
  ];
  for (const [key, value] of rows) {
    const row = node("div", "stat-row");
    row.append(node("span", "stat-key", key), node("span", null, value));
    els.stats.append(row);
  }
  if (stats.recent.length) {
    const recent = node("div", "muted");
    recent.textContent = `Naposledy: ${stats.recent[0].title} (${stats.recent[0].score}/5)`;
    els.stats.append(recent);
  }
}

function elapsedSeconds() {
  if (!state.startedAt || !state.finishedAt) return null;
  return Math.max(0, Math.round((new Date(state.finishedAt).getTime() - new Date(state.startedAt).getTime()) / 1000));
}

async function refreshStats() {
  if (!state.api) return;
  const stats = await api("/api/stats");
  renderStats(stats);
}

async function runCheck() {
  if (!state.current || !state.finished) return;
  els.runCheck.disabled = true;
  els.checkOutput.textContent = "Běží...";
  try {
    const result = await api("/api/check", {
      method: "POST",
      body: JSON.stringify({
        answer: els.answer.value,
        checkId: state.current.checkId,
        typecheckOnly: state.current.typecheckOnly,
      }),
    });
    state.checkResult = result;
    const status = result.ok ? "OK" : "FAIL";
    const detail = [result.typecheck?.output, result.tests?.output].filter(Boolean).join("\n\n");
    els.checkOutput.textContent = `${status}\n${detail || "Bez výstupu."}`;
  } catch (error) {
    els.checkOutput.textContent = `FAIL\n${error.message}`;
  } finally {
    els.runCheck.disabled = !(state.api && state.finished && (state.current.checkId || state.current.typecheckOnly));
  }
}

async function saveAttempt() {
  if (!state.current || !state.finished || !state.api) return;
  const attempt = {
    taskId: state.current.id,
    title: state.current.title,
    topic: state.current.topic,
    tag: state.current.tag,
    source: state.current.source,
    sourceKind: state.current.sourceKind,
    sourceLabel: state.current.sourceLabel,
    concepts: state.current.concepts,
    checkId: state.current.checkId,
    startedAt: state.startedAt,
    finishedAt: state.finishedAt,
    limitMin: null,
    elapsedSec: elapsedSeconds(),
    chars: els.answer.value.length,
    answer: els.answer.value,
    selfScore: Number(els.selfScore.value),
    weakConcepts: selectedWeakConcepts(),
    notes: els.notes.value,
    checkResult: state.checkResult,
  };
  els.saveAttempt.disabled = true;
  try {
    await api("/api/attempts", { method: "POST", body: JSON.stringify(attempt) });
    await refreshStats();
    els.statusText.textContent = "Pokus uložen.";
  } catch (error) {
    els.statusText.textContent = `Uložení selhalo: ${error.message}`;
    els.saveAttempt.disabled = false;
  }
}

els.start.addEventListener("click", () => {
  state.variant = 0;
  startDrill(state.variant);
});

els.next.addEventListener("click", () => {
  state.variant += 1;
  startDrill(state.variant);
});

els.submit.addEventListener("click", () => finishSession());
els.reset.addEventListener("click", resetSession);
els.answer.addEventListener("input", updateEditorStatus);
els.runCheck.addEventListener("click", runCheck);
els.saveAttempt.addEventListener("click", saveAttempt);

renderWeakConcepts();
resetSession();
loadHealth();
