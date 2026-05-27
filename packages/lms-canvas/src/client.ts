import { fetchList, zodRawParser } from "@ccpilot/ts-fetch";

import {
  type CanvasCourse,
  type CanvasAssignment,
  type CanvasClientInterface,
  ok,
  fail,
} from "@ccpilot/domain";

import {
  CanvasCourseResponseSchema,
  CANAssignmentObjectSchema,
  type CanvasResponseAssignment,
} from "./schema.ts";

const BASE_URL = "https://chasacademy.instructure.com/api/v1";

export const createCanvasClient = (apiKey: string): CanvasClientInterface => {
  return {
    fetchAssignments: async (courseId) => {
      // TODO: Refacotr the whole fetch logic out into ./api.ts
      const result = await fetchList<CanvasResponseAssignment>(
        `${BASE_URL}/courses/${courseId}/assignments?per_page=40`,
        zodRawParser(CANAssignmentObjectSchema),
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          // onItemError: (err, item) => {
          //   console.log("Skipped an item due to parsing error", { item, err });
          // },
        },
      );

      if (!result.ok) return fail(result.error);

      const assignments: CanvasAssignment[] = [];

      // mapping the response type to domain type
      // TODO: this should be moved to a mapper function for easier updating and fixing
      result.value.forEach((assignment) => {
        assignments.push({
          id: assignment.id.toString(),
          url: assignment.html_url,
          title: assignment.name,
          due: assignment.due_at,
          description: assignment.description,
        });
      });

      return ok(assignments);
    },

    fetchCourses: async () => {
      // TODO: Refactor the whole fetch logic out into ./api.ts
      const result = await fetchList(
        `${BASE_URL}/courses`,
        zodRawParser(CanvasCourseResponseSchema),
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          // onItemError: (err, item) => {
          //   console.log("Skipped an item due to parsing error", { item, err });
          // },
        },
      );

      if (!result.ok) return fail(result.error);

      const courses: CanvasCourse[] = [];

      // mapping the response type to domain type
      // TODO: this should be moved to a mapper function for easier updating and fixing
      result.value.forEach((course) =>
        courses.push({
          id: course.id.toString(),
          calendar: course.calendar.ics,
        }),
      );

      return ok(courses);
    },
  };
};
