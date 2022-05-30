import { Router } from "express";
import usersController from "../../../controllers/users/usersController.mjs";

const UsersRouter = Router();

const path = "/users";

UsersRouter.post(`${path}`,usersController.createUsers);


export { UsersRouter };
