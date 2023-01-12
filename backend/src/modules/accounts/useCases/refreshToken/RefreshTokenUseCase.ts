import auth from "../../../../config/auth";
import { sign, verify } from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError";
import dayjs from "dayjs";

interface IPayload {
    sub: string;
    email: string;
}

interface ITokenResponse {
    token: string;
    refresh_token: string;
}

class RefreshTokenUseCase {

    private usersTokenRepository;

    constructor(usersTokenRepository) {
        this.usersTokenRepository = usersTokenRepository
    }

    async execute(token: string) {
        const { sub } = verify(token, process.env.SECRET_REFRESH_TOKEN) as IPayload

        const user_id = sub

        const userToken = await this.usersTokenRepository.findByUserIdAndRefreshToken(
            user_id,
            token
        );

        if (!userToken) {
            throw new AppError("Refresh Token does not exists", 404)
        }

        await this.usersTokenRepository.deleteById(userToken.id)

        const refresh_token = sign({}, process.env.SECRET_REFRESH_TOKEN, {
            subject: sub,
            expiresIn: auth.expires_in_refresh_token
        })

        const expires_date = dayjs().add(auth.refresh_token_expires_days, "days").toDate();

        await this.usersTokenRepository.create({
            expires_date,
            refresh_token,
            user_id
        });

        const newToken = sign({}, process.env.SECRET_TOKEN, {
            subject: user_id,
            expiresIn: auth.expires_in_token
        });

        return {
            refresh_token,
            token: newToken
        }

    }
}
export { RefreshTokenUseCase }