import { Router } from "express";

import { fail, ok, syncCanvasReqsAction } from "@ccpilot/domain";

import { createCanvasClient } from "@ccpilot/lms-canvas";
import { createRequirementRepo, db } from "@ccpilot/persistence";
import {
  authenticateUser,
  type RequestWithUser,
} from "../middleware/auth.middleware.ts";
import { createLLMClient } from "@ccpilot/llm-client";

const canvas = createCanvasClient(process.env.CANVAS_TOKEN!);
const reqRepo = createRequirementRepo(db);
const openrouter = createLLMClient();

const router: Router = Router();

router.get("/", authenticateUser, async (req, res) => {
  const result = await reqRepo.getAll((req as RequestWithUser).userid);

  if (!result.ok) {
    return res.status(400).json(fail(result.error));
  }

  return res.status(200).json(result);
});

router.post("/sync", authenticateUser, async (req, res) => {
  // NOTE: use promise chaining here so we do not have to await the result and can immediately sent
  // the sync started startus back
  const userId = (req as RequestWithUser).userid;
  syncCanvasReqsAction({ canvas, repo: reqRepo, llm: openrouter, userId }).then(
    (result) => {
      if (!result.ok) {
        console.error("Promblems during sync");
      }
    },
  );

  return res.status(200).json(ok("sync started"));
});

export default router;
