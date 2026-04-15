import { type LLMClientInterface, ok } from "@ccpilot/domain";
import { safePostItem, zodRawParser } from "@ccpilot/ts-fetch";
import path from "path";
import dotenv from "dotenv";
import { type LLMRequest } from "./schema.ts";

const __dirname = import.meta.dirname;
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

if (!process.env.OPENROUTER_API_KEY) {
  throw new Error("OPENROUTER_API_KEY is missing from environment variables");
}

const url = "https://openrouter.ai/api/v1/chat/completions";
const RESPONSE_FORMAT = {
  response_format: {
    type: "json_schema",
    json_schema: {
      name: "step",
      strict: true,
      schema: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "unique-kebab-case-slug",
          },
          action: {
            type: "string",
            description:
              "The outcome-based title (e.g., 'Model the Data Persistence Layer').",
          },
          outcomeDefinition: {
            type: "string",
            description:
              "A precise description of the logical or technical state achieved.",
          },
          curiosityTrigger: {
            type: "string",
            description:
              "A 'hook' question or specific challenge to engage hyperfocus.",
          },
          theWin: {
            type: "string",
            description:
              "The specific value this step adds to the project or the user's understanding.",
          },
          category: {
            type: "string",
            description:
              "One of: ['admin', 'deep-work', 'planning', 'research', 'polish']",
          },
          complexity: {
            type: "number",
            description: "",
          },
          estimatedMinutes: {
            type: "number",
            description: "",
          },
          dependencyOrder: {
            type: "number",
            description: "",
          },
          quickStartLinkHint: {
            type: "string",
            description: "A high-value reference point or documentation hint.",
          },
        },
        required: ["id"],
        additionalProperties: false,
      },
    },
  },
};

export const createLLMClient = (): LLMClientInterface => {
  return {
    complete: async (system, user, schema) => {
      const SchemaParser = zodRawParser(schema);

      const payload: LLMRequest = {
        model: "openrouter/free",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        ...RESPONSE_FORMAT,
      };

      const result = await safePostItem(url, payload, SchemaParser, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
      });

      // TODO: Parse result
      // TODO: Safe healing code
      return ok([]);
    },
  };
};
