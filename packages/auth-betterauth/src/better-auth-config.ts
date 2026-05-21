import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@ccpilot/persistence";

import { resultWrapper } from "./plugins/result-wrappter.ts";

const isProduction = process.env.NODE_ENV === "production";

export const auth = betterAuth({
  plugins: [resultWrapper()],
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:4000/api/auth",
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [process.env.TRUSTED_ORIGINS ?? "http://localhost:3000"],
  advanced: {
    secureCookies: isProduction,
    cookiePrefix: isProduction ? "__Secure-" : "",
  },
});
