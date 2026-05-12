import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "FLP Final Exam",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "cs-CZ",
    baseUrl: "theramsay.github.io/flp-final-exam",
    ignorePatterns: [
      ".git",
      ".github",
      ".obsidian",
      ".quartz",
      "node_modules",
      "public",
      "scripts",
      "raw/discord",
      "raw/discord-pins",
      "raw/discord-analysis",
      "tools",
      "quartz.config.ts",
      "quartz.layout.ts",
      ".env",
    ],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#fbfaf7",
          lightgray: "#e7e2d8",
          gray: "#b8afa3",
          darkgray: "#504a44",
          dark: "#25221f",
          secondary: "#2f5f6f",
          tertiary: "#8a5a44",
          highlight: "rgba(47, 95, 111, 0.14)",
          textHighlight: "#fff2a888",
        },
        darkMode: {
          light: "#181816",
          lightgray: "#33312d",
          gray: "#6d675f",
          darkgray: "#d9d2c8",
          dark: "#f2eee7",
          secondary: "#7fb2c4",
          tertiary: "#d29b79",
          highlight: "rgba(127, 178, 196, 0.16)",
          textHighlight: "#7d6b2488",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
