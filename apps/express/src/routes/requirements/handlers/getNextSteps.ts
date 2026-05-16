import { getPreviewAction } from "@ccpilot/domain";
import { type ContextHandler } from "../../../middleware/context.ts";
import { fail } from "@ccpilot/domain";

/**
 * GET: Fetch the next tasks
 * Query Param: ?limit=3
 */
export const getUpcomingSteps: ContextHandler = async (req, res) => {
  const { ctx } = res.locals;

  const limit = req.query.limit ? Number(req.query.limit) : 3;

  console.log("[REQ ROUTER] Generating preview with limit:", limit);

  const upcomingStepsResult = await getPreviewAction(ctx, limit);

  if (!upcomingStepsResult) {
    return res
      .status(500)
      .json(fail("Error when executing plan preview engine!"));
  }

  if (!upcomingStepsResult.ok) {
    return res.status(400).json(fail(upcomingStepsResult.error));
  }

  return res.status(200).json(upcomingStepsResult);
};
