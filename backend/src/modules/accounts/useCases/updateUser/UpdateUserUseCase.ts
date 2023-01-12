import { compare, hash } from 'bcryptjs';
import * as yup from 'yup';
import { AppError } from '../../../../errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';


class UpdateUserUseCase {

    private usersRepository: IUsersRepository

    constructor(usersRepository) {
        this.usersRepository = usersRepository
    }

    async execute({ id,
        name,
        lastname,
        username,
        new_password,
        last_password
    }) {
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
            new_password: yup.string().min(6).max(80),
            last_password: yup.string().min(6, "last password incorrect").max(80, "last password incorrect")
                .when("new_password", (new_password, schema) => new_password ? schema.required() : schema.notRequired())

        });

        await schema.validate({
            name,
            lastname,
            username,
            new_password,
            last_password,
        }, { abortEarly: false, })


        const user = await this.usersRepository.findById(id)


        if (!user) {
            throw new AppError("User does not exists", 404)
        }

        user.name = name.toLowerCase();

        user.lastname = lastname.toLowerCase();

        user.username = username.toLowerCase();

        if (new_password && last_password) {

            const passwordMatch = await compare(last_password, user.password);

            if (!passwordMatch) {
                throw new AppError("last password incorrect!", 400)
            }

            user.password = await hash(new_password, 8);
        }

        await this.usersRepository.update(user);
    }
}
export { UpdateUserUseCase }