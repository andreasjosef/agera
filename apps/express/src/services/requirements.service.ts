import { type Result, type Requirement, ok, fail } from '@ccpilot/domain'

export const requirementsService = async (): Promise<Result<Requirement[]>>  => {
    try {
        const requirements: Requirement[] = []
        return ok(requirements)
    } 
    
    catch {
        return fail("Failed to fetch requirements");
    }
}