import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@ccpilot/persistence";

import { resultWrapper } from "./plugins/result-wrappter.ts";

export const auth = betterAuth({
  plugins: [resultWrapper()],
  baseURL: "http://localhost:4000/api/auth",
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
});
