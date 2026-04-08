
import type { Requirement } from '../../../../packages/domain/src/requirements/types'
import { ok, fail} from '../../../../packages/domain/src/shared/result.ts'
import type {Result} from '../../../../packages/domain/src/shared/result.ts'

export const requirementsService = async (): Promise<Result<Requirement[]>>  => {
    try {
        const requirements: Requirement[] = []
        return ok(requirements)
    } 
    
    catch {
        return fail("Failed to fetch requirements");
    }
}