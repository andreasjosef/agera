import { type ContextHandler } from "../../../middleware/context.ts";
import { fail, ok, getTimerActive } from "@ccpilot/domain";

export const getActiveStatus: ContextHandler = async (req, res) => {
  const { ctx } = res.locals;

  const userId = ctx.userId;
  const userStatusRepo = ctx.repos.status;

  const result = await getTimerActive(userStatusRepo, userId);

  if (!result.ok) {
    return res.status(500).json(fail("Failed to get user status"));
  }

  return res.status(200).json(ok(result.value));
};
