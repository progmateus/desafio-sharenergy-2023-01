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
        return await this.repository.findById(id).exec();
    }

    async findByUsername(username: string): Promise<IUser> {
        return await this.repository.findOne({ username })
    }

    async delete(id: string): Promise<void> {
        await this.repository.deleteOne({ id })
    }

    async update({
        id,
        name,
        lastname,
        username,
        password
    }): Promise<void> {
        return await this.repository.updateOne({ _id: id }, {
            name,
            lastname,
            username,
            password
        })
    }


}
export { UsersRepository };