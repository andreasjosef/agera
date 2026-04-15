import { type LLMClientInterface, ok } from "@ccpilot/domain";
import { safePostItem, zodRawParser } from "@ccpilot/ts-fetch";
import path from "path";
import dotenv from "dotenv";

const __dirname = import.meta.dirname;
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

if (!process.env.OPENROUTER_API_KEY) {
  throw new Error("OPENROUTER_API_KEY is missing from environment variables");
}
3;
const url = "https://openrouter.ai/api/v1/chat/completions";
const responseFormat = {
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
          },
          estimatedMinutes: {
            type: "number",
          },
          dependencyOrder: {
            type: "number",
          },
          quickStartLinkHint: {
            type: "string",
            description: "A high-value reference point or documentation hint.",
          },
        },
        required: [""],
        additionalProperties: false,
      },
    },
  },
};

export const createLLMClient = (): LLMClientInterface => {
  return {
    complete: async (system, user, schema) => {
      const SchemaParser = zodRawParser(schema);

      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openrouter/free",
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
          response_format: responseFormat,
        }),
      };

      const result = await safePostItem(url, options, SchemaParser);

      console.log("[LLM-CLIENT]:", result);

      return ok([]);
    },
  };
};
