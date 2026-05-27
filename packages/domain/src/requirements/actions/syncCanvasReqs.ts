import { isAfter } from "date-fns";
import { type Result, fail, ok } from "../../shared/result.ts";
import { type AppContext } from "../../shared/context.ts";
import { type NewRequirement } from "../../requirements/definitions.ts";
import { createEnrichedRequirement } from "../../requirements/index.ts";

/**
 * Orchestrates the retrieval of Canvas assignments and delegates
 * their creation to the internal llm enrichment requirement pipeline.
 */
export const syncCanvasReqsAction = async (
  ctx: AppContext,
): Promise<Result<void>> => {
  await ctx.repos.integrations.updateStatus(ctx.userId, "CANVAS", "SYNCING");
  const canvas = ctx.services.canvas;
  const integration = await ctx.repos.integrations.getForProvider(
    ctx.userId,
    "CANVAS",
  );

  if (!canvas) {
    return fail("No Canvas Token found. Connect a canvas account!");
  }

  if (!integration.ok) {
    return fail("No Integration found.");
  }

  const courseResult = await canvas.fetchCourses();
  console.log("[CANVAS SYNX REQ] course result", courseResult);
  if (!courseResult.ok) return fail(courseResult.error);

  console.log("[CANVAS SYNX REQ] canvas context ", ctx.services.canvas);
  console.log("[CANVAS SYNX REQ] course result", courseResult);

  const assignmentResults = await Promise.all(
    courseResult.value.map((course) => canvas.fetchAssignments(course.id)),
  );

  await ctx.repos.integrations.updateStatus(ctx.userId, "CANVAS", "STABLE");

  const now = new Date();

  const assignements = assignmentResults.flatMap((res) => {
    if (!res.ok) return [];
    return res.value.filter((assignment) => isAfter(assignment.due, now));
  });

  for (const assignement of assignements) {
    // REFACTOR: Move this into a mapper function
    const requirement: NewRequirement = {
      title: assignement.title.trim(),
      source: "CANVAS",
      url: assignement.url,
      due: assignement.due,
      steps: [],
      type: "assignment",
      integrationId: integration.value.id,
      externalId: String(assignement.id), //ny
    };

    await createEnrichedRequirement(ctx, requirement, assignement.description);
  }

  return ok(undefined);
};
