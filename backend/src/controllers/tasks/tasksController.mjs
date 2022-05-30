import tasksServices from "../../services/tasksServices.mjs";
import { constructResponse } from "../../utils/helpers.mjs";

const createTasks = async (req, res) => {
  const response = await tasksServices.createTasks(req.body);
  return constructResponse(res, response);
};



export default {
    createTasks
};
