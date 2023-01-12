import { AppError } from "../../../../errors/AppError"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { UserMap } from "../../mapper/UserMap"

class FindUserByIdUseCase {
    private usersRepository: IUsersRepository

    constructor(usersRepository) {
        this.usersRepository = usersRepository
    }

    async execute(id: string) {

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            throw new AppError("Invalid uuid")
        }

        const user = await this.usersRepository.findById(id)

        if (!user) {
            throw new AppError("User does not exists", 404)
        }

        return UserMap.toDTO(user);
    }
}
export { FindUserByIdUseCase }