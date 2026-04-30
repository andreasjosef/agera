import { Router } from "express";
import {
  fail,
  ok,
  type TokenProvider,
  type CanvasSyncContext,
  type NewRequirement,
  type EnrichContext,
  NewRequirementSchema,
  syncCanvasReqsAction,
  getSyncStatusAction,
  createEnrichedRequirement,
} from "@ccpilot/domain";

import { appContext, type ContextHandler } from "../middleware/context.ts";
import {
  authenticateUser,
  type RequestWithUser,
} from "../middleware/auth.middleware.ts";

import { reqRepo } from "../services/instances.ts";

import { validateReq } from "../middleware/validate.ts";

const router: Router = Router();
router.use(authenticateUser);
router.use(appContext);

/**
 * GET: Fetch all requirements
 */
const getRequirementsHandler: ContextHandler = async (req, res) => {
  const { ctx } = res.locals;

  const result = await reqRepo.getAll(ctx.userId);

  if (!result.ok) {
    return res.status(400).json(fail(result.error));
  }

  return res.status(200).json(result);
};
router.get("/", getRequirementsHandler);

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
const initiateSyncHandler: ContextHandler = async (req, res) => {
  const { ctx } = res.locals;

  if (!ctx.services.canvas) {
    return res.status(412).json(fail("Canvas Connection Required"));
  }
  console.log("[REQ ROUTER] initiate sync for user: ", ctx.userId);

  // NOTE: We use promise chaining here so we do not have to await the result and can immediately sent
  // the sync started startus back
  syncCanvasReqsAction(ctx as CanvasSyncContext).then((result) => {
    if (!result.ok)
      console.error(`[CANVAS SYNC FAILURE] User: ${ctx.userId}`, result.error);
  });

  return res.status(202).json(ok("INITIALIZED"));
};
router.post("/sync", initiateSyncHandler);

/**
 * POST: Manually create a new requirement
 */
const manualRequirementHandler: ContextHandler = async (req, res) => {
  const { ctx } = res.locals;
  //const { title, due, description } = req.body;

  const newRequirement: NewRequirement = {
    title: "Test Mock",
    due: new Date().toString(),
    source: "MANUAL",
    steps: [],
    type: "assignment",
  };

  const result = await createEnrichedRequirement(
    ctx as EnrichContext,
    newRequirement,
    `Subject: Updated Submission Requirements for Final Project
     Hi Class,
     After reviewing the progress during yesterday's lab, I've decided to extend the deadline for the 
     Phase 1 Documentation. Please ensure you have your technical diagrams and the initial project scope
     uploaded to the portal by Friday at 5:00 PM.
     Make sure the file is in PDF format. If you are working in a group, only one person needs to submit, 
     but please list all team members on the cover page. Late submissions will be penalized 10% per hour.
     Best,
     Dr. Aris`,
  );

  if (!result.ok) return res.status(400).json(fail(result.error));

  return res.status(201).json(ok(result.value));
};

router.post(
  "/create",
  validateReq(NewRequirementSchema),
  manualRequirementHandler,
);

export default router;
