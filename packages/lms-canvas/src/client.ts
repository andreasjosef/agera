import { fetchList, zodRawParser } from "@ccpilot/ts-fetch";
import { CANCourseObjectSchema, CANAssignmentObjectSchema } from "./schema.ts";

const BASE_URL = "https://chasacademy.instructure.com/api/v1";
const CANVAS_TOKEN =
  "19606~6tZeKACyPGCVM6v4nyneHL773mfBkYN99QXwJDNvxURTvMkLJBPVY4DXHBQZ2x6D";

const result = await fetchList(
  `${BASE_URL}/courses`,
  zodRawParser(CANCourseObjectSchema),
  {
    headers: {
      Authorization: `Bearer ${CANVAS_TOKEN}`,
    },
    onItemError: (err, item) => {
      console.log("Skipped an item due to parsing error", { err, item });
    },
  },
);

if (!result.ok) throw new Error(result.error);

result.value.forEach(async (course) => {
  const result = await fetchList(
    `${BASE_URL}/courses/${course.id}/assignments?per_page=40`,
    zodRawParser(CANAssignmentObjectSchema),
    {
      headers: {
        Authorization: `Bearer ${CANVAS_TOKEN}`,
      },
      onItemError: (err, item) => {
        console.log("Skipped an item due to parsing error", { err, item });
      },
    },
  );

  console.log(result);
});
