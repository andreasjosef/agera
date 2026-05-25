import { getNextStepAction } from "@ccpilot/domain";
import { type ContextHandler } from "../../../middleware/context.ts";
import { fail } from "@ccpilot/domain";

/**
 * GET: Fetch all requirements
 */
export const getNextStep: ContextHandler = async (req, res) => {
  const { ctx } = res.locals;

  const energyLevel = Math.min(9, Math.max(1, Number(req.query.energyLevel) || 9));

  const nextStepResult = await getNextStepAction(ctx, energyLevel);

  if (!nextStepResult.ok) {
    return res.status(400).json(fail(nextStepResult.error));
  }

  return res.status(200).json(nextStepResult);
};
