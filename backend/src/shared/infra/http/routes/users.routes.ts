import { Router } from "express";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { DeleteUserByIdController } from "../../../../modules/accounts/useCases/deleteUserById/DeleteUserByIdController";
import { FindUserByIdController } from "../../../../modules/accounts/useCases/FindUserById/FindUserByIdController";

const usersRoutes = Router();
const createUserController = new CreateUserController();
const findUserByIdController = new FindUserByIdController();
const deleteUserByIdController = new DeleteUserByIdController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/:id", findUserByIdController.handle);
usersRoutes.delete("/:id", deleteUserByIdController.handle);



export { usersRoutes };

