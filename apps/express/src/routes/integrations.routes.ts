import { Router } from "express";
import { ok, TokenPayloadSchema } from "@ccpilot/domain";

import {
  authenticateUser,
  type RequestWithUser,
} from "../middleware/auth.middleware.ts";
import { validateReq } from "../middleware/validate.ts";

const router = Router();
router.use(authenticateUser);

/**
 * POST: Save a new integration token to db
 */
router.post("/connect", validateReq(TokenPayloadSchema), (req, res) => {
  const user = (req as RequestWithUser).userid;

  // TODO: save the token to integrations table
  console.log("[INTEGRATIONS API] saving: ", req.body);

  // Then initiate sync here?
  // syncCanvasReqs() ?

  res.status(200).json(ok(undefined));
});

export default router;
