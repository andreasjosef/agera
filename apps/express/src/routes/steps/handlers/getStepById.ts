import { getStepByIdAction } from "@ccpilot/domain";
import { type ContextHandler } from "../../../middleware/context.ts";
import { fail } from "@ccpilot/domain";

export const getStepById: ContextHandler = async (req, res) => {
  const { ctx } = res.locals;
  const stepId = req.params.id as string;

  console.log("[STEP ROUTER] get step by id ", stepId);

  const result = await getStepByIdAction(ctx, stepId);

  if (!result.ok) {
    return res.status(404).json(fail(result.error));
  }

  return res.status(200).json(result);
};