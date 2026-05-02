import { type ContextHandler } from "../../../middleware/context.ts";
import { fail } from "@ccpilot/domain";

/**
 * GET: Fetch all requirements
 */
export const getRequirements: ContextHandler = async (req, res) => {
  const { ctx } = res.locals;

  const result = await ctx.repos.requirements.getAll(ctx.userId);

  if (!result.ok) {
    return res.status(400).json(fail(result.error));
  }

  return res.status(200).json(result);
};
