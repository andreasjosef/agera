import { promptManifest } from "./manifest.generated.ts";
/**
 * Requirement Prompts & Loader
 *
 * These prompts implement our "Executive Function as a Service" strategy by transforming
 * academic requirements into structured logical outcomes.
 *
 * We utilize a modular, component-based structure to ensure high reasoning,
 * consistent persona, and token caching.
 *
 *   /core      - Persona, NPF Logic, and Language Style.
 *   /templates - Task-specific logic.
 *   /json      - Zod-aligned schemas to force structured output.
 */

/**
 * Loads a prompt component from the domain with locale support.
 * (In order to support future language switch)
 */
export const loadPrompt = (
  promptPath: string,
  locale: string = "sv",
): string => {
  const promptVariations = [`${promptPath}.${locale}`, promptPath];

  for (const key of promptVariations) {
    if (promptManifest[key]) {
      return promptManifest[key];
    }
  }

  throw new Error(`[CCPILOT DOMAIN] Prompt not found: ${promptPath}`);
};

/**
 * Assembles a complete system prompt from multiple parts.
 */
export const assembleSystemPrompt = (
  parts: string[],
  locale: string = "sv",
): string => {
  return parts.map((part) => loadPrompt(part, locale)).join("\n\n");
};
