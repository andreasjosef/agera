import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { ok } from "@ccpilot/domain";

import { authHandlerNode } from "@ccpilot/auth-betterauth";

import requirementsRouter from "./routes/requirements/router.ts";
import integrationsRouter from "./routes/integrations/router.ts";
import stepsRouter from "./routes/steps/router.ts";
import statusRouter from "./routes/status/router.ts";

// TEMP FOR PROBLEM LOGGING WITH DB
import { db } from "@ccpilot/persistence";
import { sql } from "drizzle-orm";

import promMid from "express-prometheus-middleware";

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

app.use(promMid({
  metricsPath: '/metrics',
  collectDefaultMetrics: true,
  requestDurationBuckets: [0.1, 0.5, 1, 1.5],
  requestLengthBuckets: [512, 1024, 5120, 10240],
  responseLengthBuckets: [512, 1024, 5120, 10240],
}));

app.get("/api/health", (req, res) => {
  res.status(200).json(ok("Up and running !"));
});

// TEMPORARY TEST FOR DB HEALTH IN PROD
app.get("/api/health/db", async (req, res) => {
  try {
    await db.execute(sql`SELECT 1`);
    res.status(200).json(ok("DB connected"));
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err instanceof Error ? err.message : "Unknown DB error",
    });
  }
});

app.use("/api/requirements", requirementsRouter);
app.use("/api/integrations", integrationsRouter);
app.use("/api/steps", stepsRouter);
app.use("/api/status", statusRouter);

/**
 * Final safety net. If something lands here it is a critical system error.
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
