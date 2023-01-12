import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUser } from "../mongoose/models/interfaces/IUser";
import { User } from "../mongoose/models/User";

class UsersRepository implements IUsersRepository {
    private repository

    constructor() {
        this.repository = User
    }

    async create({
        id,
        name,
        lastname,
        username,
        password
    }: ICreateUserDTO): Promise<void> {
        const user = await this.repository.create({
            id,
            name,
            lastname,
            username,
            password
        })
    }
    async findById(id: string): Promise<IUser> {
        return await this.repository.findOne({ id })
    }
    async update(id: string): Promise<IUser> {
        return await this.repository.findOne({ id })
    }
    async findByUsername(username: string): Promise<IUser> {
        return await this.repository.findOne({ username })
    }


}
export { UsersRepository };