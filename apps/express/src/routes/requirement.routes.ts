import { Router } from "express";
import { requirementsController } from "../controllers/requirements.controller.ts";

const requirementsRouter: Router = Router()

requirementsRouter.get('/requirements', requirementsController)

export default requirementsRouter