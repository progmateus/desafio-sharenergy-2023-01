import { Request, Response } from "express";
import { UsersRepository } from "../../infra/repositories/UsersRepository";
import { DeleteUserByIdUseCase } from "./DeleteUserByIdUseCase";

class DeleteUserByIdController {

    async handle(request: Request, response: Response) {
        const { id } = request.params

        const usersRepository = new UsersRepository();
        const deleteUserById = new DeleteUserByIdUseCase(usersRepository);

        await deleteUserById.execute(id)

        return response.status(204).send();
    }
}
export { DeleteUserByIdController }