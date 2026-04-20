import { Router } from "express";

import { fail, ok, syncCanvasReqsAction } from "@ccpilot/domain";

import { createCanvasClient } from "@ccpilot/lms-canvas";
import { createRequirementRepo, db } from "@ccpilot/persistence";
import {
  authenticateUser,
  type RequestWithUser,
} from "../middleware/auth.middleware.ts";

const canvas = createCanvasClient(process.env.CANVAS_TOKEN!);
const reqRepo = createRequirementRepo(db);

const router: Router = Router();

router.get("/", authenticateUser, async (req, res) => {
  // TODO: once reqReqo accepts the userid we pass it here as req.locals.user;
  const result = await reqRepo.getAll();

  console.log(
    "[REQ ROUTE] request with user: ",
    (req as RequestWithUser).userid,
  );

  if (!result.ok) {
    return res.status(400).json(fail(result.error));
  }

  return res.status(200).json(result);
});

router.post("/sync", async (req, res) => {
  // NOTE: use promise chaining here so we do not have to await the result and can immediately sent
  // the sync started startus back
  syncCanvasReqsAction(canvas, reqRepo).then((result) => {
    if (!result.ok) {
      console.error("Promblems during sync");
    }
  });

  return res.status(200).json(ok("sync started"));
});

export default router;
