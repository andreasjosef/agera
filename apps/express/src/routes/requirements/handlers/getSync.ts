import z from "zod";
import { type Request } from "express";
import { type ContextHandler } from "../../../middleware/context.ts";
import { TokenProviderSchema, fail } from "@ccpilot/domain";
import { getSyncStatusAction } from "@ccpilot/domain";

/**
 * GET: The Sync Status for an ongoing requirement sync operation
 */
export const getSyncStatus: ContextHandler = async (req: Request, res) => {
  const { ctx } = res.locals;
  const provider = req.params.provider as string;

  const validateProvider = TokenProviderSchema.safeParse(
    provider.toUpperCase(),
  );

  if (!validateProvider.success)
    return res.status(400).json(fail(z.prettifyError(validateProvider.error)));

  const syncStatusResult = await getSyncStatusAction(
    ctx.repos.requirements,
    ctx.repos.integrations,
    ctx.userId,
    validateProvider.data,
  );

  if (!syncStatusResult.ok) {
    return res.status(500).json(syncStatusResult);
  }

  res.status(200).json(syncStatusResult);
};
