import { Request, Response } from "express";
import { UsersRepository } from "../../infra/repositories/UsersRepository";
import { FindUserByIdUseCase } from "./FindUserByIdUseCase";


class FindUserByIdController {
    async handle(request: Request, response: Response) {
        const { id } = request.params

        const usersRepository = new UsersRepository();
        const findUserByIdUseCase = new FindUserByIdUseCase(usersRepository)

        const user = await findUserByIdUseCase.execute(id)

        return response.json(user)
    }

}
export { FindUserByIdController }