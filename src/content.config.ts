import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Astro 6 requires the content config at src/content.config.ts (the legacy
// src/content/config.ts location is removed). Published MDX still lives in
// src/content/blog/ (the glob base below is root-relative). Briefs and
// drafts-in-flight live in the gitignored tmp/, not here.
const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    // Set ONLY when a post is canonical somewhere else. Default canonical is
    // this URL (oracaus.dev/blog/<slug>); dev.to cross-posts point back here.
    canonicalUrl: z.string().url().optional(),
  }),
});

export const collections = { blog };
