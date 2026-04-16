import type {IUserRepository} from "@ccpilot/domain"
import { ok } from "@ccpilot/domain"
import type { SafeUser } from "@ccpilot/domain"


export const createUserRepo = (): IUserRepository => {
    return {
        createUser: async (user) => {
            const newUser = {
                id: "",
                name: user.name,
                email: user.email,
                password: user.password
            }

            return ok(newUser)
        },

        findById: async (id) => {
            console.log("[USER REPO]: Find user ", id)

            const userIdentity: SafeUser = {
                name: "",
                email: "",
            }

            return ok(userIdentity)
        }
    }
}