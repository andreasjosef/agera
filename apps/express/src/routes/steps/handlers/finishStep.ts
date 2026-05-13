import { getNextStepAction, ok } from "@ccpilot/domain";
import { type ContextHandler } from "../../../middleware/context.ts";
import { fail } from "@ccpilot/domain";

export const finishStep: ContextHandler = async (req, res) => {
  const { ctx } = res.locals;

  console.log(req.params);

  console.log("[STEP ROUTER] atempt to finish: ", req.params.id as string);
  const stepFinished = await ctx.repos.requirements.completeStep(
    req.params.id as string,
  );

  if (!stepFinished.ok)
    return res.status(500).json(fail("Error when trying to complete Step!"));

  res.status(200).json(ok(undefined));
};
