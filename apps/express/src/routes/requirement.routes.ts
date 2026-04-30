import { Router } from "express";
import {
  fail,
  ok,
  type RequirementContext,
  type TokenProvider,
  syncCanvasReqsAction,
  getSyncStatusAction,
  NewRequirementSchema,
  createEnrichedRequirement,
  loadIntegrationTokenAction,
} from "@ccpilot/domain";

import {
  authenticateUser,
  type RequestWithUser,
} from "../middleware/auth.middleware.ts";

import {
  canvasClient,
  reqRepo,
  openrouterClient,
  integrationsRepo,
} from "../services/instances.ts";

import { validateReq } from "../middleware/validate.ts";
import { createCanvasClient } from "@ccpilot/lms-canvas";

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
 * GET: The Sync Status for an ongoing requirement sync operation
 */
router.get("/sync/:provider", async (req, res) => {
  const userId = (req as unknown as RequestWithUser).userid;
  const provider = req.params.provider.toUpperCase() as TokenProvider;

  const statusResult = await getSyncStatusAction(reqRepo, userId, provider);

  if (!statusResult.ok) {
    return res.status(500).json(statusResult);
  }

  res.status(200).json(statusResult);
});

/**
 * POST: Initiate a manual Canvas Sync and Step generation
 */
router.post("/sync", async (req, res) => {
  const userId = (req as RequestWithUser).userid;

  // NOTE: We will have to the canvas client instance here later,
  // because we will have to get the canvas token for the authenticated
  // user from the integration table
  const reqCtx: RequirementContext = {
    userId,
    canvas: canvasClient,
    llm: openrouterClient,
    repo: reqRepo,
  };

  console.log("[REQ ROUTER] initiate sync for user: ", userId);

  // NOTE: We use promise chaining here so we do not have to await the result and can immediately sent
  // the sync started startus back
  syncCanvasReqsAction(reqCtx).then((result) => {
    if (!result.ok)
      console.error(`[CANVAS SYNC FAILURE] User: ${userId}`, result.error);
  });

  return res.status(202).json(ok("INITIALIZED"));
});

router.post("/create", validateReq(NewRequirementSchema), async (req, res) => {
  const userId = (req as RequestWithUser).userid;
  const { description } = req.body;

  const tokenResult = await loadIntegrationTokenAction(
    userId,
    "CANVAS",
    integrationsRepo,
  );

  if (!tokenResult.ok)
    return res.status(401).json(fail("Integration token not found"));

  const reqCtx: RequirementContext = {
    userId,
    canvas: createCanvasClient(tokenResult.value.token),
    llm: openrouterClient,
    repo: reqRepo,
  };

  const data = req.body;

  const result = await createEnrichedRequirement(
    reqCtx,
    data,
    data.description,
  );

  if (!result.ok) return res.status(400).json(fail(result.error));

  return res.status(201).json(ok(result.value));
});

export default router;
