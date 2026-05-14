import { type ContextHandler } from "../../../middleware/context.ts";
import { fail, ok, toggleTimerActiveAction } from "@ccpilot/domain";

export const updateTimerStatus: ContextHandler = async (req, res) => {
  const { ctx } = res.locals;
  const userId = ctx.userId;
  const userStatusRepo = ctx.repos.status;

  const result = await toggleTimerActiveAction(userStatusRepo, userId);

  if (!result.ok) {
    return res.status(500).json(fail("Failed to toggle user status"));
  }

  return res.status(200).json(ok(result.value));
};
