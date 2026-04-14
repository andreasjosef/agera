import { Router } from "express";
import { ok } from "@ccpilot/domain";

const router: Router = Router();

router.get("/requirements", async (req, res) => {
  return res.status(204).json(ok(undefined));
});

export default router;
