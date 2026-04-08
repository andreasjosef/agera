
import { Router } from "express";
import { getRequirements } from "../controllers/requirements.controller.ts";



const requirementsRouter: Router = Router()


requirementsRouter.get('/requirements', getRequirements)



export default requirementsRouter