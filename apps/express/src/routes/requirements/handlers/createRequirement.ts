import { type ContextHandler } from "../../../middleware/context.ts";
import {
  type EnrichContext,
  type NewRequirement,
  fail,
  ok,
} from "@ccpilot/domain";
import { createEnrichedRequirement } from "@ccpilot/domain";

/**
 * POST: Manually create a new requirement
 */
export const createRequirement: ContextHandler = async (req, res) => {
  const { ctx } = res.locals;
  //const { title, due, description } = req.body;

  const newRequirement: NewRequirement = {
    title: "Test Mock",
    due: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toString(),
    source: "MANUAL",
    steps: [],
    type: "assignment",
  };

  const result = await createEnrichedRequirement(
    ctx as EnrichContext,
    newRequirement,
    `Subject: Updated Submission Requirements for Final Project
     Hi Class,
     After reviewing the progress during yesterday's lab, I've decided to extend the deadline for the 
     Phase 1 Documentation. Please ensure you have your technical diagrams and the initial project scope
     uploaded to the portal by Friday at 5:00 PM.
     Make sure the file is in PDF format. If you are working in a group, only one person needs to submit, 
     but please list all team members on the cover page. Late submissions will be penalized 10% per hour.
     Best,
     Dr. Aris`,
  );

  if (!result.ok) return res.status(400).json(fail(result.error));

  return res.status(201).json(ok(result.value));
};
