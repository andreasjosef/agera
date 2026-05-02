import { type ContextHandler } from "../../../middleware/context.ts";
import {
  type AppContext,
  type SyncStatusResponse,
  saveIntegrationAction,
  syncCanvasReqsAction,
  fail,
  ok,
} from "@ccpilot/domain";

import { createCanvasClient } from "@ccpilot/lms-canvas";

/**
 * POST: Save a new integration token to db. This triggers the sync
 * and will then utilize the llm client to generate the steps for
 * the requirements gathered.
 */
export const connectCanvas: ContextHandler = async (req, res) => {
  const { ctx } = res.locals;
  const { token, provider } = req.body;

  const result = await saveIntegrationAction(
    ctx.userId,
    token,
    provider,
    ctx.repos.integrations,
  );

  if (!result.ok) {
    res.status(500).json(fail(result.error));
  }

  // patching the context here in the route because at this point the context on
  // res.locals is stale and does not have a canvas instance which is needed in order to init the sync.
  const updatedContext: AppContext = {
    ...ctx,
    services: {
      ...ctx.services,
      canvas: createCanvasClient(token),
    },
  };

  // NOTE the current implementation is limited to creating a hardcoded canvas client.
  // As we add more integratoins in the future the client and
  // and sync action should be handeld dynamically depending on the token provider.
  syncCanvasReqsAction(updatedContext).then((result) => {
    if (!result.ok)
      console.error(`[CANVAS SYNC FAILURE] User: ${ctx.userId}`, result.error);
  });

  res.status(202).json(
    ok<SyncStatusResponse>({
      status: "INITIALIZED",
      stats: { active: 0, total: 0 },
    }),
  );
};
