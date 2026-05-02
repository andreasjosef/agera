import { type ContextHandler } from "../../../middleware/context.ts";
import { fail, ok } from "@ccpilot/domain";
import { syncCanvasReqsAction } from "@ccpilot/domain";

/**
 * POST: Initiate a Canvas Sync and Step generation
 */
export const initiateSync: ContextHandler = async (req, res) => {
  const { ctx } = res.locals;

  if (!ctx.services.canvas) {
    return res.status(412).json(fail("Canvas Connection Required"));
  }

  console.log("[REQ ROUTER] initiate sync for user: ", ctx.userId);

  // NOTE: We use promise chaining here so we do not have to await the result and can immediately sent
  // the sync started startus back
  syncCanvasReqsAction(ctx).then((result) => {
    if (!result.ok)
      console.error(`[CANVAS SYNC FAILURE] User: ${ctx.userId}`, result.error);
  });

  return res.status(202).json(ok("INITIALIZED"));
};
