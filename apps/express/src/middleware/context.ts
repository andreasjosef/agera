import type { NextFunction, Request, Response } from "express";
import { createCanvasClient } from "@ccpilot/lms-canvas";
import { type AppContext, loadIntegrationTokenAction } from "@ccpilot/domain";

import type { RequestWithUser } from "./auth.middleware.ts";

import {
  integrationsRepo,
  openrouterClient,
  reqRepo,
  userStatusRepo,
} from "../services/instances.ts";

/**
 * Guarantees that res.locals.ctx exists and is typed.
 */
export type ContextResponse = Response<any, { ctx: AppContext }>;

/**
 * To be used with any route that follows this middleware.
 */
export type ContextHandler = (
  req: Request,
  res: ContextResponse,
  next: NextFunction,
) => Promise<any> | void;

/**
 * Injects a user-specific AppContext into res.locals.
 * This provides access to repositories and services.
 *
 * NOTE: The Canvas client is conditionally initialized;
 * this means that route handlers requiring integration must check
 * for a null service and handle via narrowing before proceeding.
 */
export const appContext = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = (req as RequestWithUser).userid;

  const tokenResult = await loadIntegrationTokenAction(
    userId,
    "CANVAS",
    integrationsRepo,
  );

  const canvasClient = tokenResult.ok
    ? createCanvasClient(tokenResult.value.token)
    : null;

  res.locals.ctx = {
    userId,
    repos: {
      requirements: reqRepo,
      integrations: integrationsRepo,
      status: userStatusRepo,
    },
    services: {
      canvas: canvasClient,
      llm: openrouterClient,
    },
  };

  next();
};
