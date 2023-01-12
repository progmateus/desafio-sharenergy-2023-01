import { Router } from "express";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { FindUserByIdController } from "../../../../modules/accounts/useCases/FindUserById/FindUserByIdController";

const usersRoutes = Router();
const createUserController = new CreateUserController();
const findUserByIdController = new FindUserByIdController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/:id", findUserByIdController.handle);


export { usersRoutes };

