import z from "zod";

import { type Result } from "../shared/result.ts";

/**
 * Defines the general contract between ccpilot and external LLM service apis
 * */
export interface LLMClientInterface {
  /**
   * Takes a raw prompt input and returns the full text completion
   * */
  complete: <T>(
    system: string,
    user: string,
    schema: z.ZodSchema<T>,
  ) => Promise<Result<T[]>>;
}
