import { createIntegrationsRepository } from "@ccpilot/persistence"

type TokenProvider = "CANVAS" | "MANUAL";
const integrationRepo = createIntegrationsRepository();

const user: {
  userId: string;
  token: string;
  provider: TokenProvider;
} = {
  userId: "lzi8WhxEuYd531hsVwtJh9EhHsGmY1Ln",
  token: "cndkfnd34vsflkn4653fklgnfkn",
  provider: "CANVAS",
};

async function main() {
  const result = await integrationRepo.save(
    user.userId,
    user.token,
    user.provider
  );

  console.log(result);
}

main();