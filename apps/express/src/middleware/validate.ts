import type { Request, Response, NextFunction } from "express";

import { ZodObject, ZodError, prettifyError } from "zod";
import { fail } from "@ccpilot/domain";

export const validateReq =
  (schema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json(fail(prettifyError(error)));
      }

      return res.status(400).json(fail("Invalid request"));
    }
  };
