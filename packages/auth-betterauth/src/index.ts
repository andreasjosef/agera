import { toNodeHandler } from "better-auth/node";

import { auth } from "./better-auth-config.ts";
import { createBetterAuthService } from "./service.ts";

export const authService = createBetterAuthService(auth);
export const authHandlerNode = toNodeHandler(auth);
