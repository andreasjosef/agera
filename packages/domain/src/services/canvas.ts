import { z } from "zod";
import { type Result } from "../shared/result.ts";

export const CanvasAssignmentSchema = z.object({
  id: z.string(),
  title: z.string(),
  due: z.string(),
  description: z.string(),
});

export type CanvasAssignment = z.infer<typeof CanvasAssignmentSchema>;

export const CanvasCourseSchema = z.object({
  id: z.string(),
  calendar: z.url(),
});

export const CanvasConnectionPayloadSchema = z.object({
  token: z.string(),
});

export type CanvasCourse = z.infer<typeof CanvasCourseSchema>;

export interface CanvasClientInterface {
  /**
   * Fetches the assignments for a given course and transforms
   * them into the CanvasAssignment internal domain type
   */
  fetchAssignments: (courseId: string) => Promise<Result<CanvasAssignment[]>>;

  /**
   * Fetches the all the courses the user is in inrolled in
   */
  fetchCourses: () => Promise<Result<CanvasCourse[]>>;
}
