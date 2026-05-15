import express from "express";
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
    // TODO: Add production domain to allowed origins
    origin: ["http://localhost:3000"],
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

app.listen(PORT, () =>
  console.log(`[CCPILOT API] running on http://localhost:${PORT}`),
);

export default app;
