import { isAfter } from "date-fns";

import { type Result, ok, fail } from "../shared/result.ts";

import { type NewRequirement } from "../requirements/types.ts";
import { type IRequirementRepository } from "../requirements/repository.ts";
import { type CanvasClientInterface } from "../services/canvas.ts";

export const syncCanvasReqsAction = async (
  canvas: CanvasClientInterface,
  repo: IRequirementRepository,
): Promise<Result<string>> => {
  // TODO: this should eventually return SyncStatus result
  const courseResult = await canvas.fetchCourses();

  if (!courseResult.ok) return fail(courseResult.error);

  const assignmentResults = await Promise.all(
    courseResult.value.map((course) => canvas.fetchAssignments(course.id)),
  );

  const now = new Date();

  const assignements = assignmentResults.flatMap((res) => {
    if (!res.ok) return [];
    return res.value.filter((assignment) => isAfter(assignment.due, now));
  });

  for (const assignement of assignements) {
    // REFACTOR: Move this into a mapper function
    const requirement: NewRequirement = {
      title: assignement.title.trim(),
      source: "canvas",
      due: assignement.due,
      steps: [],
      type: "assignment",
    };

    repo.save(requirement);
  }

  console.log("[ CANVAS SYNC ACTION ]:  Sync Finished!");

  return ok("Sync finished");
};
