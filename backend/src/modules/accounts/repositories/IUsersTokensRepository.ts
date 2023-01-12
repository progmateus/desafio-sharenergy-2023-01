import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO"
import { IUserTokens } from "../infra/mongoose/models/interfaces/IUserTokens";

interface IUsersTokensRepository {
    create(data: ICreateUserTokenDTO): Promise<IUserTokens>;
    findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<IUserTokens>
    deleteById(id: string): Promise<void>;
    findByRefreshToken(refresh_token: string): Promise<IUserTokens>
}
export { IUsersTokensRepository }