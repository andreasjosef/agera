// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeRapide from "starlight-theme-rapide";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      plugins: [starlightThemeRapide()],
      title: "CCPILOT",
      sidebar: [
        {
          label: "Protocols",
          autogenerate: { directory: "protocols" },
        },
        {
          label: "Reference",
          items: [
            { label: "Overview", link: "/reference/" },
            {
              label: "Apps",
              autogenerate: { directory: "apps" },
            },
            {
              label: "Packages",
              autogenerate: { directory: "packages" },
            },
          ],
        },
        {
          label: "Research",
          collapsed: true,
          autogenerate: { directory: "research" },
        },
        {
          label: "Build Log",
          autogenerate: { directory: "logs" },
        },
      ],
    }),
  ],
});
