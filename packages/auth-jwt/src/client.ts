import { fail, type IAuthService, ok } from "@ccpilot/domain";
import jwt, { type JsonWebTokenError } from "jsonwebtoken";

const getSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is missing from environment variables");
  }

  return secret;
};

export const createJwtClient = (): IAuthService => {
  return {
    sign: (userId) => {
      const secret = getSecret();

      return ok(jwt.sign({ userId }, secret, { expiresIn: "7d" }));
    },

    verify: (token) => {
      const secret = getSecret();

      try {
        // NOTE: Using subject registered claims used to uniquely identify user
        const decoded = jwt.verify(token, secret) as {
          sub: string;
        };

        return ok(decoded);
      } catch (err) {
        return fail((err as JsonWebTokenError).message);
      }
    },
  };
};
