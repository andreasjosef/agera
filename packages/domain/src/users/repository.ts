import { type Result } from "../shared/result.ts";
import type { UserIdentity, NewUser, SafeUser } from "./types.ts";

/**
 * Defines the persistence contract for User entities within the domain.
 * This repository is responsible for the "Handshake" between the Domain
 * and the Database.
 * @group Definitions
 */
export interface IUserRepository {
  /**
   * Persists a new user to the storage layer.
   *
   * @param user - The unpersisted user data (without a system-generated ID).
   * @returns A {@link Result} containing the persisted {@link UserIdentity} on success.
   */
  createUser: (user: NewUser) => Promise<Result<UserIdentity>>;
  /**
   * Retrieves a specific user from the storage layer using their unique identifier.
   *
   * @param id - The unique UUID identifier of the user.
   * @returns A {@link Result} containing the {@link UserIdentity} if found,
   * or a failure if the user does not exist.
   */
  findById: (id: string) => Promise<Result<SafeUser>>;
}
