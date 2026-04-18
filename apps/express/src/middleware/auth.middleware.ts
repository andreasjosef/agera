import { authService } from '@ccpilot/auth-betterauth'
import { Response, NextFunction } from 'express'
import { AuthRequest } from '@ccpilot/domain'

interface RequestWithUser extends AuthRequest {
    user: {
        id: string;
        name: string;
        email: string;
    }
} 

export const authenticateUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    
    const result = await authService.getSession(req)

    if(!result.ok) return res.status(401).json({message: result.error})
    
    req.user = result.value

    next()
}