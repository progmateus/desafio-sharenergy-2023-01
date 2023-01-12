import { Request, Response } from "express";
import { UsersRepository } from "../../infra/repositories/UsersRepository";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
    async handle(request: Request, response: Response) {
        const { name, lastname, username, new_password, last_password } = request.body;
        const { id } = request.user

        const usersRepository = new UsersRepository();
        const updateUserUseCase = new UpdateUserUseCase(usersRepository);


        await updateUserUseCase.execute({
            id,
            name,
            lastname,
            username,
            new_password,
            last_password
        });

        response.status(200).send();
    }
}
export { UpdateUserController }