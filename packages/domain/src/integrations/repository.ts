import { type Result } from "../shared/result.ts";
import type { Integration, IntegrationToken, TokenProvider } from "./types.ts";

export interface IIntegrationRepository {
  save: (
    userId: string,
    token: string,
    provider: TokenProvider,
  ) => Promise<Result<void>>;

  getForProvider: (
    user: string,
    provider: TokenProvider,
  ) => Promise<Result<Integration>>;

  getAll: (user: string) => Promise<Result<IntegrationToken[]>>;
}
