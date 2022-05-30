import { Router } from "express";;
import tasksController from "../../../controllers/tasks/tasksController.mjs";

const TasksRouter = Router();

const path = "/tasks";

TasksRouter.post(`${path}`,tasksController.createTasks);


export { TasksRouter };
