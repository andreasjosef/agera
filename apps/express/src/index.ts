import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { ok } from "@ccpilot/domain";

import { authHandlerNode } from "@ccpilot/auth-betterauth";

import requirementsRouter from "./routes/requirements/router.ts";
import integrationsRouter from "./routes/integrations/router.ts";
import stepsRouter from "./routes/steps/router.ts";
import statusRouter from "./routes/status/router.ts";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "https://c4g-group4.cc.k3s.chas-lab.dev"],
    credentials: true,
  }),
);

app.all("/api/auth/*splat", authHandlerNode);

app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json(ok("Up and running !"));
});

app.use("/api/requirements", requirementsRouter);
app.use("/api/integrations", integrationsRouter);
app.use("/api/steps", stepsRouter);
app.use("/api/status", statusRouter);

/**
 * Final safety net. If something lands here it is a critical system error.
 * Everything else I handled with domain error codes and railway repsonses innan
 **/
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  const isError = err instanceof Error;
  const message = isError ? err.message : "Unknown Error";

  console.error(`[CCPILOT SYSTEM ERROR]: ${message}`);

  res.status(500).json({
    ok: false,
    error: message,
  });
});

app.listen(PORT, () =>
  console.log(`[CCPILOT API] running on http://localhost:${PORT}`),
);

export default app;
