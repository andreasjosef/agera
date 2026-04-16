import { type Result } from "../shared/result.ts";

/**
 * Defines the contract for identity management and token generation.
 * This interface allows the system to verify identities
 * without being coupled to specific technical implementations
 * like JWT or session cookies.
 * @group Definitions
 */
export interface IAuthService {
  /**
   * Generates a secure authentication token for a specific user identifier.
   * @param userId - The unique identifier of the user to be authenticated.
   * @returns A {@link Result} containing the signed token string on success.
   */
  sign: (userId: string) => Result<string>;

  /**
   * Validates a raw authentication token and extracts the subject identity.
   * @param token - The raw token string provided by the client.
   * @returns A {@link Result} containing the verified subject ('sub') identifier.
   */
  verify: (token: string) => Result<{ sub: string }>;
}
