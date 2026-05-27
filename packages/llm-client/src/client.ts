import { z } from "zod";
import path from "path";
import dotenv from "dotenv";
import { fail, type LLMClientInterface, ok } from "@ccpilot/domain";
import { safePostItem, zodRawParser } from "@ccpilot/ts-fetch";
import { LLMResponseSchema, type LLMRequest } from "./schema.ts";

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
        // model: "openrouter/free",
        //model: "minimax/minimax-m2.7",
        model: "google/gemini-2.5-flash-lite",
        //model: "openrouter/auto",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        response_format: { type: "json_object" },
        extra_body: {
          reasoning_split: true,
        },
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
        console.log("[LLM CLIENT] llm response error: ", result.error);
        return fail("Failed to parse LLM response");
      }

      const choicesContent = result.value.choices[0].message.content;

      try {
        const sanitized = choicesContent
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        const parsed = JSON.parse(sanitized);
        const validated = schema.safeParse(parsed);

        if (!validated.success) {
          console.log(
            "[LLM CLIENT] response error: ",
            z.prettifyError(validated.error),
          );
          return fail("LLM response did not match Schema");
        }

        return ok(validated.data);
      } catch (err) {
        console.log("[LLM CLIENT] caught malformed json crash: ", err);
        return fail("LLM returned invalid json");
      }
    },
  };
};
