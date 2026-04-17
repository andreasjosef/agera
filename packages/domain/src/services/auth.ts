import { type SafeUser } from "../users/types.ts";
import { type Result } from "../shared/result.ts";

/**
 * A platform-agnostic representation of an incoming network request.
 *
 * This ensures the Domain doesn't depend on framework-specific types
 * like Express.Request.
 */
export interface AuthRequest {
  /** Map of lowercase header keys to their string values. */
  headers: Record<string, string | undefined>;
}

/**
 * Defines the contract for identity management and session orchestration.
 *
 * This interface allows the system to verify identities without being coupled
 * to specific technical implementations like JWT
 *
 * * @group Definitions
 */
export interface IAuthService {
  /**
   * Translates an incoming request into a verified User Identity.
   *
   * @param req - The simplified {@link AuthRequest} containing necessary headers/cookies.
   * @returns A {@link Result} containing the {@link SafeUser} if the session is valid.
   */
  getSession: (req: AuthRequest) => Promise<Result<SafeUser>>;
}
