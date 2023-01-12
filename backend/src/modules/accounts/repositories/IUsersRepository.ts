import { ICreateUserDTO } from "../dtos/ICreateUserDTO"
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { IUser } from "../infra/mongoose/models/interfaces/IUser";

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findById(id: string): Promise<IUser>;
    findByUsername(username: string): Promise<IUser>;
    delete(id: string): Promise<void>;
    update(data: IUpdateUserDTO): Promise<void>;
}
export { IUsersRepository }