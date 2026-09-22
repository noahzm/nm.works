// @ts-check

import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import icon from "astro-icon"
import sitemap from "@astrojs/sitemap"
import { emailWorkPath, showEmailWork } from "./src/data/email-templates.ts"

// https://astro.build/config
export default defineConfig({
  site: "https://nm.works",
  prefetch: true,
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    icon(),
    sitemap({
      // The email portfolio stays out of the sitemap until it has content.
      filter: (page) =>
        showEmailWork || new URL(page).pathname.replace(/\/$/, "") !== emailWorkPath,
    }),
  ],
})
