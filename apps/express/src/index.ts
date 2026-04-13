import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ok } from "@ccpilot/domain";

import requirementsRouter from "./routes/requirement.routes.ts";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.status(200).json(ok("Up and running !"));
});

app.use("/api", requirementsRouter);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);

export default app;
