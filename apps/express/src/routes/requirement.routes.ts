
import { Router } from "express";
import { rquirementsController } from "../controllers/requirements.controller.ts";


const requirementsRouter: Router = Router()

requirementsRouter.get('/requirements', rquirementsController)


export default requirementsRouter