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
};

export type LLMResponse = z.infer<typeof LLMResponseSchema>;
