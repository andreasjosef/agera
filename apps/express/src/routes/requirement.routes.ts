import { Router } from "express";
import {
  fail,
  ok,
  type RequirementContext,
  syncCanvasReqsAction,
} from "@ccpilot/domain";

import {
  authenticateUser,
  type RequestWithUser,
} from "../middleware/auth.middleware.ts";

import {
  canvasClient,
  reqRepo,
  openrouterClient,
} from "../services/instances.ts";

const router: Router = Router();
router.use(authenticateUser);

/**
 * GET: Fetch all requirements
 */
router.get("/", async (req, res) => {
  const userId = (req as RequestWithUser).userid;
  const result = await reqRepo.getAll(userId);

  if (!result.ok) {
    return res.status(400).json(fail(result.error));
  }

  return res.status(200).json(result);
});

/**
 * POST: Initiate Canvas Sync and Step generation
 */
router.post("/sync", async (req, res) => {
  const userId = (req as RequestWithUser).userid;
  const reqCtx: RequirementContext = {
    userId,
    canvas: canvasClient,
    llm: openrouterClient,
    repo: reqRepo,
  };

  // NOTE: We use promise chaining here so we do not have to await the result and can immediately sent
  // the sync started startus back
  syncCanvasReqsAction(reqCtx).then((result) => {
    if (!result.ok)
      console.error(`[CANVAS SYNC FAILURE] User: ${userId}`, result.error);
  });

  return res.status(202).json(ok("INITIALIZED"));
});

export default router;
