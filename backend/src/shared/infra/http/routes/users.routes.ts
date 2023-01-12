import { Router } from "express";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { DeleteUserByIdController } from "../../../../modules/accounts/useCases/deleteUserById/DeleteUserByIdController";
import { FindUserByIdController } from "../../../../modules/accounts/useCases/FindUserById/FindUserByIdController";
import { UpdateUserController } from "../../../../modules/accounts/useCases/updateUser/UpdateUserController";
import { ensureAuthenticated } from "../middlewares/EnsureAuthenticated";

const usersRoutes = Router();
const createUserController = new CreateUserController();
const findUserByIdController = new FindUserByIdController();
const deleteUserByIdController = new DeleteUserByIdController();
const updateUserController = new UpdateUserController()

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/:id", ensureAuthenticated, findUserByIdController.handle);
usersRoutes.delete("/:id", ensureAuthenticated, deleteUserByIdController.handle);
usersRoutes.put("/", ensureAuthenticated, updateUserController.handle);




export { usersRoutes };

