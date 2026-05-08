import { type Request } from "express";
import { type ContextHandler } from "../../../middleware/context.ts";
import { fail } from "@ccpilot/domain";

/**
 * GET: Fetch all requirements
 */
export const getRequirement: ContextHandler = async (req: Request, res) => {
  const { ctx } = res.locals;
  const reqId = req.params.requirementId as string;

  console.log("[REQ ROUTER] get req by id ", reqId);

  const result = await ctx.repos.requirements.findById(ctx.userId, reqId);

  if (!result.ok) {
    return res.status(404).json(fail(result.error));
  }

  return res.status(200).json(result);
};
