import { safePostItem, zodRawParser } from "@ccpilot/ts-fetch";
import { StepSchema } from "@ccpilot/domain";
import { z } from "zod";

const OPEN_ROUTER_KEY =
  "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";

const SYSTEM_PROMPT = "You are a planning expert. Break this down into 3 steps";
const description = "I need to build a house in 6 weeks";

// type
type LLMRequest = {
  model: string;
  messages: [{}];
};

const ChoicesSchema = z.object({
  message: z.object({
    content: z.string(),
  }),
});

const LLMResponseSchema = z.object({
  choices: z.array(ChoicesSchema),
});

type LLMResponse = z.infer<typeof LLMResponseSchema>;

const payload: LLMRequest = {
  model: "openrouter/free",
  messages: [
    {
      role: "user",
      content: `${SYSTEM_PROMPT} ${description}`,
    },
  ],
};

const complete = async (SchemaParser) => {
  const tries = 5;

  const result = await safePostItem<LLMRequest, LLMResponse>(
    "https://openrouter.ai/api/v1/chat/completions",
    payload,
    zodRawParser(LLMResponseSchema),
    {
      headers: {
        Authorization: `Bearer ${OPEN_ROUTER_KEY}`,
      },
    },
  );

  if (!result.ok) {
    console.log(result.error);
    return;
  }

  const validated = SchemaParse.safeParse(
    result.value.choices[0].message.content,
  );

  if (!validated.succes) {
    // self healing code
  }

  ok(validate.success);

  console.log();
};

complete();
