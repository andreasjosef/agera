// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeRapide from "starlight-theme-rapide";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      plugins: [starlightThemeRapide()],
      title: "CCPILOT Docs",
      sidebar: [
        {
          label: "Team Docs",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Protocols", slug: "team/protocol" },
          ],
        },
        {
          label: "Research",
          autogenerate: { directory: "research" },
        },
      ],
    }),
  ],
});
