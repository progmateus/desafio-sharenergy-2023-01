import { ICreateUserTokenDTO } from "../../dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { IUserTokens } from "../mongoose/models/interfaces/IUserTokens";
import { UserTokens } from "../mongoose/models/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
    private repository

    constructor() {
        this.repository = UserTokens
    }
    async create({
        user_id,
        expires_date,
        refresh_token,
    }: ICreateUserTokenDTO): Promise<IUserTokens> {
        return await this.repository.create({
            user_id,
            expires_date,
            refresh_token,
        })
    }
    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<IUserTokens> {
        return await this.repository.findOne({
            user_id,
            refresh_token
        });
    }
    async deleteById(id: string): Promise<void> {
        await this.repository.deleteOne({ id });
    }
    async findByRefreshToken(refresh_token: string): Promise<IUserTokens> {
        return await this.repository.findOne({ refresh_token });
    }
}
export { UsersTokensRepository };