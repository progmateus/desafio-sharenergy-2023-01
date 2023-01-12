import * as yup from 'yup';
import { hash } from "bcryptjs"
import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";


class CreateUserUseCase {


    private usersRepository: IUsersRepository;

    constructor(repository) {
        this.usersRepository = repository
    }

    async execute({
        name,
        lastname,
        username,
        password
    }: ICreateUserDTO) {

        const badCharactersRegex = /[!#$%&'*()+`{|}~]/g;


        let schema = yup.object().shape({
            name: yup.string().required().min(3).max(80).test("is-valid-name", "Invalid characters", (value) => {

                const isValidName = badCharactersRegex.test(value);
                if (isValidName === true) {
                    return false
                }
                return true
            }),
            lastname: yup.string().required().min(3).max(80).test("is-valid-lastname", "Invalid characters", (value) => {
                const isValidLastname = badCharactersRegex.test(value);
                if (isValidLastname === true) {
                    return false
                }
                return true
            }),
            username: yup.string().required().min(3).max(80),
            password: yup.string().required().min(6).max(80),
        });

        await schema.validate({
            name,
            lastname,
            username,
            password
        }, { abortEarly: false, })

        const userAlreadyExists = await this.usersRepository.findByUsername(username.toLocaleLowerCase());

        if (userAlreadyExists) {
            throw new AppError("User already exists", 409)
        }

        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
            name: name.toLocaleLowerCase(),
            lastname: lastname.toLocaleLowerCase(),
            username: username.toLocaleLowerCase(),
            password: passwordHash
        })
    }
}

export { CreateUserUseCase };