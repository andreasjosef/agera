import { type Result } from "../shared/result.ts";
import { type TokenPayload, type TokenProvider } from "./types.ts";

export interface IIntegrationRepository {
  save: (
    userId: string,
    token: string,
    provider: TokenProvider,
  ) => Promise<Result<void>>;

  getForProvider: (
    user: string,
    provider: TokenProvider,
  ) => Promise<Result<TokenPayload>>;

  getAll: (user: string) => Promise<Result<TokenPayload[]>>;
}
