import { type ContextHandler } from "../../../middleware/context.ts";
import {
  getIntegrationStatusAction,
  TokenProviderSchema,
  fail,
  ok,
} from "@ccpilot/domain";

/**
 * GET: Retrieve the integration status of a given provider
 */
export const getIntegration: ContextHandler = async (req, res) => {
  const { ctx } = res.locals;
  const providerParam = req.params.provider as string;

  const validateProvider = TokenProviderSchema.safeParse(providerParam);

  if (!validateProvider.success)
    return res
      .status(404)
      .json(fail(`Provider ${providerParam} not yet supported!`));

  const result = await getIntegrationStatusAction(
    ctx.userId,
    validateProvider.data,
    ctx.repos.integrations,
  );

  if (!result.ok) return res.status(500).json(fail("Integration API Error"));

  res.status(200).json(ok(result.value));
};
