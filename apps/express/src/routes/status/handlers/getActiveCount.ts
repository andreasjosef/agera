import { type ContextHandler } from "../../../middleware/context.ts";
import { fail, ok, getActiveTimerCount } from "@ccpilot/domain";

export const getActiveCount: ContextHandler = async (req, res) => {
  const { ctx } = res.locals;
  const userStatusRepo = ctx.repos.status;

  const result = await getActiveTimerCount(userStatusRepo);

  if (!result.ok) {
    return res.status(500).json(fail("Failed to get active count"));
  }

  return res.status(200).json(ok(result.value));
};
