import z from "zod";

export const CanvasCourseResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  calendar: z.object({
    ics: z.string(),
  }),
});

export const CANAssignmentObjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  due_at: z.string(),
});

export type CanvasResponseAssignment = z.infer<
  typeof CANAssignmentObjectSchema
>;
