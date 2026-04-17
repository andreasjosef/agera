import {
  type IAuthService,
  type AuthRequest,
  type SafeUser,
  ok,
  fail,
} from "@ccpilot/domain";

import { auth as authInstance } from "./better-auth-config.ts";

/**
 * Factory function that implements an IAuthService
 * using a Better Auth instance.
 *
 * @param auth - The initialized Better Auth instance.
 */
export const createBetterAuthService = (
  auth: typeof authInstance,
): IAuthService => {
  return {
    getSession: async (req: AuthRequest) => {
      const session = await auth.api.getSession({
        headers: new Headers(req.headers as Record<string, string>),
      });

      if (!session) {
        return fail("No active session!");
      }

      const user: SafeUser = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
      };

      return ok(user);
    },
  };
};
