import { Request, Response } from "express";
import { UsersTokensRepository } from "../../infra/repositories/UsersTokensRepository";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {
    async handle(request: Request, response: Response) {
        const token = request.body.token ||
            request.headers["x-access-token"] ||
            request.query.token;

        const usersTokensRepository = new UsersTokensRepository()
        const refreshTokenUseCase = new RefreshTokenUseCase(usersTokensRepository);

        const refresh_token = await refreshTokenUseCase.execute(token);

        return response.json(refresh_token);


    }
}
export { RefreshTokenController }