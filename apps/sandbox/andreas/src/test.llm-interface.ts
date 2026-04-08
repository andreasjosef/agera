import { type LLMClientInterface } from "@ccpilot/domain";

function createMockAdapter(): LLMClientInterface {
  const complete = async (prompt: string) => {
    console.log("Prompt: ", prompt);

    const response = "Generated a bunch of steps for you!";

    return new Promise<string>((resolve) => {
      resolve(response);
    });
  };

  return {
    complete,
  };
}

const llm = createMockAdapter();
const completion = await llm.complete(
  "Please generate a bunch of steps for me",
);

console.log(completion);
