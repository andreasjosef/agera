import { z } from "zod";

export const LLMChoicesSchema = z.object({
  message: z.object({
    content: z.string(),
  }),
});

export const LLMResponseSchema = z.object({
  choices: z.array(LLMChoicesSchema),
});

export type LLMRequest = {
  model: string;
  messages: { role: string; content: string }[];
  response_format?: { type: "json_object" };
  extra_body?: {
    reasoning_split: true;
  };
};

export type LLMResponse = z.infer<typeof LLMResponseSchema>;
