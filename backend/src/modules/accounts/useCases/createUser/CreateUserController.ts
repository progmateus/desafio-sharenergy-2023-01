import { Request, Response } from "express"
import { UsersRepository } from "../../infra/repositories/UsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";
class CreateUserController {

    async handle(request: Request, response: Response) {
        const { name, lastname, username, password } = request.body;

        const createUserUseCase = new CreateUserUseCase(new UsersRepository());

        await createUserUseCase.execute({
            name,
            lastname,
            username,
            password
        })
        return response.status(201).send();
    }
}
export { CreateUserController }