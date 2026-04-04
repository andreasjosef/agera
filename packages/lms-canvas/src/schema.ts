import z from "zod";

export const CANCourseObjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  calendar: z.object({
    ics: z.string(),
  }),
});

export const CANAssignmentObjectSchema = z.object({
  id: z.number(),
  name: z.string(),
});
