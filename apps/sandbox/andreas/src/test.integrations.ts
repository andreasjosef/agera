import {
  syncCanvasReqsAction,
  type IRequirementRepository,
} from "@ccpilot/domain";

import { createCanvasClient } from "@ccpilot/lms-canvas";

const CANVAS_TOKEN =
  "19606~6tZeKACyPGCVM6v4nyneHL773mfBkYN99QXwJDNvxURTvMkLJBPVY4DXHBQZ2x6D";

const reqRepo: IRequirementRepository = {
  getAll: async () => {
    console.log("loading requirements...");

    return {
      ok: false,
      error: "Just testing a load",
    };
  },
  save: async (req) => {
    return {
      ok: true,
      value: req,
    };
  },
};

import { isAfter } from "date-fns";

const canvas = createCanvasClient(CANVAS_TOKEN);

console.log("--- Fetching courses...");
const courses = await canvas.fetchCourses();
console.log("--- Finished.");

if (courses.ok) {
  const assignmentsPromises = courses.value.map((course) =>
    canvas.fetchAssignments(course.id),
  );

  console.log("--- Fetching Assignments...");
  const results = await Promise.all(assignmentsPromises);

  const assignments = results
    .filter((response) => response.ok)
    .flatMap((response) => response.value);

  assignments.forEach((assignment) => {
    const niceDate = new Date(assignment.due).toLocaleDateString();

    if (isAfter(assignment.due, new Date())) {
      console.log(`${assignment.id} is due ${niceDate}`);
    }
  });
}

await syncCanvasReqsAction(canvas, reqRepo);
