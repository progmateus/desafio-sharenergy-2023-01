import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError";
import auth from "../../../../config/auth";
import dayjs from "dayjs";

interface IResponse {
    user: {
        id: string,
    },
    token: string;
    refresh_token: string;
}

class AuthenticateUserUseCase {
    private usersRepository
    private usersTokensRepository

    constructor(usersRepository, usersTokensRepository) {
        this.usersRepository = usersRepository
        this.usersTokensRepository = usersTokensRepository
    }

    async execute({ username, password }) {

        if (username?.length < 3 || username?.length > 80 || !username) {
            throw new AppError("Email or password incorrect", 401)
        }

        if (password?.length < 6 || password?.length > 80 || !password) {
            throw new AppError("Email or password incorrect", 401)
        }

        const user = await this.usersRepository.findByUsername(username.toLocaleLowerCase());

        if (!user) {
            throw new AppError("Email or password incorrect", 401)
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect", 401)
        }

        const {
            expires_in_token,
            expires_in_refresh_token,
            refresh_token_expires_days,
            ///  secret_token,
            ///  secret_refresh_token
        } = auth

        const token = sign({}, process.env.SECRET_TOKEN, {
            subject: user.id,
            expiresIn: expires_in_token
        })

        const refresh_token = sign({}, process.env.SECRET_REFRESH_TOKEN, {
            subject: user.id,
            expiresIn: expires_in_refresh_token
        })

        const refresh_token_expires_date = dayjs().add(refresh_token_expires_days, "days").toDate();

        await this.usersTokensRepository.create({
            user_id: user.id,
            refresh_token,
            expires_date: refresh_token_expires_date
        })

        const tokenReturn: IResponse = {
            token,
            user: {
                id: user.id,
            },
            refresh_token,
        };

        return tokenReturn
    }
}
export { AuthenticateUserUseCase };