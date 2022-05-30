import { Router } from "express";
import rolesController from "../../../controllers/roles/rolesController.mjs";

const RolesRouter = Router();

const path = "/roles";

RolesRouter.post(`${path}`,rolesController.createRoles);


export { RolesRouter };
