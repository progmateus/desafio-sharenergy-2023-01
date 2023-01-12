import { Request, Response } from "express";
import { UsersRepository } from "../../infra/repositories/UsersRepository";
import { UsersTokensRepository } from "../../infra/repositories/UsersTokensRepository";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
class AuthenticateUserController {

    async handle(request: Request, response: Response) {
        const { username, password } = request.body;

        const authenticateUserUseCase = new AuthenticateUserUseCase(
            new UsersRepository(),
            new UsersTokensRepository()
        );

        const token = await authenticateUserUseCase.execute({
            username,
            password
        })

        return response.json(token);
    }
}
export { AuthenticateUserController }