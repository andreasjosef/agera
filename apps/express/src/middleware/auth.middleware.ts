import { authService } from "@ccpilot/auth-betterauth";
import { fail } from "@ccpilot/domain";
import type { Response, Request, NextFunction } from "express";

export interface RequestWithUser extends Request {
  userid: string;
}

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = await authService.getSession({
    headers: req.headers as Record<string, string>,
  });

  if (!result.ok) return res.status(401).json(fail(result.error));

  (req as RequestWithUser).userid = result.value.id;

  next();
};
