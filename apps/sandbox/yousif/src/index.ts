import { createUserRepo } from '@ccpilot/persistence'

const userRepo = createUserRepo()

const user = await userRepo.createUser({name: "Yousif", email: "Yosuif@gmail.com", password: "yousif12345"})

const findUser = async (id: string) => {
    const result = await userRepo.findById(id)

    if(!result.ok) return `${result.error}`

    return result.value

}

