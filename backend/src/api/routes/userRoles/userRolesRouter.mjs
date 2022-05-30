import { Router } from "express";
import userRolesController from "../../../controllers/userRoles/userRolesController.mjs";

const UserRolesRouter = Router();

const path = "/user-roles";

UserRolesRouter.post(`${path}`,userRolesController.assignUserRoles);


export { UserRolesRouter };
