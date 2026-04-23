import { Router } from "express";
import {
  authenticateUser,
  type RequestWithUser,
} from "../middleware/auth.middleware.ts";
import { ok } from "@ccpilot/domain";

const router = Router();
router.use(authenticateUser);

router.post("/connect", (req, res) => {
  const user = (req as RequestWithUser).userid;

  console.log("[INTEGRATIONS API]Trying to save for user: ", user);
  res.status(200).json(ok(undefined));
});

export default router;
