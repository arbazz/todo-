import { Router } from "express";
import checkinsController from "../../../controllers/checkins/checkinsController.mjs";

const CheckinsRouter = Router();

const path = "/checkins";

CheckinsRouter.post(`${path}`,checkinsController.createCheckIns);


export { CheckinsRouter };
