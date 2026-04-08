import z from "zod";

import { fetchList, zodRawParser } from "@ccpilot/ts-fetch";

const BASE_URL = "https://chasacademy.instructure.com/api/v1";

const CourseObjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  calendar: z.object({
    ics: z.string(),
  }),
});

const AssignmentObjectSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const parseCourseResponse = zodRawParser(CourseObjectSchema);
const parseAssignmentResponse = zodRawParser(AssignmentObjectSchema);

async function main() {
  const result = await fetchList(`${BASE_URL}/courses`, parseCourseResponse, {
    headers: {
      Authorization:
        "Bearer 19606~6tZeKACyPGCVM6v4nyneHL773mfBkYN99QXwJDNvxURTvMkLJBPVY4DXHBQZ2x6D",
    },
    onItemError: (err, item) => {
      console.log("Skipped an item due to parsing error", { err, item });
    },
  });

  if (!result.ok) throw new Error(result.error);

  result.value.forEach(async (course) => {
    const result = await fetchList(
      `${BASE_URL}/courses/${course.id}/assignments?per_page=40`,
      parseAssignmentResponse,
      {
        headers: {
          Authorization:
            "Bearer 19606~6tZeKACyPGCVM6v4nyneHL773mfBkYN99QXwJDNvxURTvMkLJBPVY4DXHBQZ2x6D",
        },
        onItemError: (err, item) => {
          console.log("Skipped an item due to parsing error", { err, item });
        },
      },
    );

    console.log(result);
  });
}

main().catch(console.log);
