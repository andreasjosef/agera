// @ts-check
import { defineConfig } from "astro/config";

import starlight from "@astrojs/starlight";

import starlightThemeRapide from "starlight-theme-rapide";
import starlightTypeDoc from "starlight-typedoc";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      plugins: [
        starlightThemeRapide(),
        starlightTypeDoc({
          entryPoints: ["../../packages/domain/src/shared/result.ts"],
          tsconfig: "../../packages/domain/tsconfig.json",
          output: "domain-api-reference",
          typeDoc: {
            cleanOutputDir: true,
            excludeNotDocumented: true,
            outputFileStrategy: "members",
            router: "group",
            readme: "none",
            indexFormat: undefined,
            hideBreadcrumbs: true,
            hidePageTitle: true,
            hidePageHeader: true,
            useCodeBlocks: true,
            expandObjects: true,

            categorizeByGroup: true,
            groupOrder: ["Core", "*"],
          },
        }),
      ],
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
          label: "Domain API",
          autogenerate: { directory: "domain-api-reference" },
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
