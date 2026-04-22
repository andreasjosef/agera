import { fail, type LLMClientInterface, ok } from "@ccpilot/domain";
import { safePostItem, zodRawParser } from "@ccpilot/ts-fetch";
import path from "path";
import dotenv from "dotenv";
import { LLMResponseSchema, type LLMRequest } from "./schema.ts";
import { z } from "zod";

const __dirname = import.meta.dirname;
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

if (!process.env.OPENROUTER_API_KEY) {
  throw new Error("OPENROUTER_API_KEY is missing from environment variables");
}

const url = "https://openrouter.ai/api/v1/chat/completions";

export const createLLMClient = (): LLMClientInterface => {
  return {
    complete: async (system, user, schema) => {
      const payload: LLMRequest = {
        model: "openrouter/free",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      };

      const result = await safePostItem(
        url,
        payload,
        zodRawParser(LLMResponseSchema),
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          },
        },
      );

      if (!result.ok) {
        return fail("Failed to parse LLM response");
      }

      const choicesContent = result.value.choices[0].message.content;
      const validated = schema.safeParse(JSON.parse(choicesContent));

      if (!validated.success) {
        console.log(z.prettifyError(validated.error));

        return fail("Failed to parse LLM choices");
      }

      return ok(validated.data);
    },
  };
};
