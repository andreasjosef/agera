import type { Request, Response } from "express"
import { requirementsService } from "../services/requirements.service.ts"


export const requirementsController = async (req: Request, res: Response) => {
    const result = await requirementsService()

    if(!result.ok) return res.status(500).json(result)

    return res.json(result)
}