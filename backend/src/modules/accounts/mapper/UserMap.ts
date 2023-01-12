import { instanceToInstance } from "class-transformer"
import { IUserResponseDTO } from "../dtos/IUserResponseDTO"
import { IUser } from "../infra/mongoose/models/interfaces/IUser"

class UserMap {
    static toDTO({
        id,
        name,
        lastname,
        username
    }: IUser): IUserResponseDTO {
        const user = instanceToInstance({
            id,
            name,
            lastname,
            username,
        })

        return user
    }
}
export { UserMap }