import { ICreateUserDTO } from "../dtos/ICreateUserDTO"
import { IUser } from "../infra/mongoose/models/interfaces/IUser";

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findById(id: string): Promise<IUser>;
    update(id: string): Promise<IUser>;
    findByUsername(username: string): Promise<IUser>;
    delete(id: string): Promise<void>
}
export { IUsersRepository }