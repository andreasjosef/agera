import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { ok } from "@ccpilot/domain";

import { authHandlerNode } from "@ccpilot/auth-betterauth";

import requirementsRouter from "./routes/requirement.routes.ts";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();
app.use(
  cors({
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

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);

export default app;
