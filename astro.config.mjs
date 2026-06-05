// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import tailwindcss from "@tailwindcss/vite";

// Apex site for the Oracaus house brand. Static output → GitHub Pages.
// expressiveCode() must precede mdx() so MDX code fences pick up the
// frame/title/line-marker treatment. Tailwind v4 wires through the Vite
// plugin (same path the demo uses), so the @theme tokens transfer 1:1.
export default defineConfig({
  site: "https://oracaus.dev",
  // Self-hosted, latin-subset, variable fonts via Astro's native Fonts API. One
  // file per family/style (the weight range, not discrete weights) keeps the
  // request count down. Downloaded from Fontsource at build and emitted as
  // same-origin @font-face with metric-matched fallback faces (zero layout shift
  // on swap), so no preload is needed and there is no runtime third party.
  // Exposed as CSS variables the @theme tokens consume.
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Inter",
      cssVariable: "--font-inter",
      weights: ["100 900"],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
      optimizedFallbacks: true,
    },
    {
      provider: fontProviders.fontsource(),
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains-mono",
      weights: ["100 800"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["monospace"],
      optimizedFallbacks: true,
    },
  ],
  integrations: [
    // emitExternalStylesheet: false inlines EC's CSS into each code-bearing page
    // instead of linking a separate render-blocking stylesheet (it doesn't honour
    // build.inlineStylesheets). Only blog posts carry it; it's a few KB.
    expressiveCode({
      themes: ["github-dark-dimmed"],
      emitExternalStylesheet: false,
    }),
    mdx(),
    react(),
    sitemap(),
  ],
  vite: { plugins: [tailwindcss()] },
  // Inline all CSS into <head> rather than linking it. The site + expressive-code
  // stylesheets are a few KB each and sit just above Astro's auto-inline threshold,
  // so by default they load as render-blocking requests. Total CSS is tiny, so the
  // HTML-payload cost is negligible against removing them from the critical path.
  build: { inlineStylesheets: "always" },
});
