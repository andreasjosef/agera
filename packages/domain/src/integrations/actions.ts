import { isAfter } from "date-fns";
import { saveRequirement } from "../requirements/actions.ts";

import { type Result, ok, fail } from "../shared/result.ts";
import type {
  RequirementContext,
  NewRequirement,
} from "../requirements/types.ts";

import { type TokenProvider } from "./types.ts";
import { type IIntegrationRepository } from "./repository.ts";

export const saveIntegrationAction = async (
  userId: string,
  token: string,
  provider: TokenProvider,
  repo: IIntegrationRepository,
): Promise<Result<void>> => {
  return await repo.save(userId, token, provider);
};

export const syncCanvasReqsAction = async (
  ctx: RequirementContext,
): Promise<Result<void>> => {
  // TODO: this should eventually return SyncStatus result
  const courseResult = await ctx.canvas.fetchCourses();

  if (!courseResult.ok) return fail(courseResult.error);

  const assignmentResults = await Promise.all(
    courseResult.value.map((course) => ctx.canvas.fetchAssignments(course.id)),
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

    const result = await saveRequirement(ctx, requirement);

    if (!result.ok) {
      console.error(`[SYNC] Failed: ${assignement.title}`);
    }

    console.log(`[SYNC] Handeld: ${assignement.title}`);
  }

  console.log("[SYNC] Complete!");

  return ok(undefined);
};
