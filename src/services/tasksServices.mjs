import { HTTP_STATUS } from "../utils/Constant.mjs";
import { errorResponse, successResponse } from "../utils/helpers.mjs";
import tasksModel from "../models/taskModel.mjs";

const createTasks = async (data) => {
  try {
    console.log("createTasks Func");
    let { title, description, status, due_at } = data;

    if (
      title !== undefined &&
      description !== undefined &&
      status !== undefined &&
      due_at !== undefined
    ) {
      let newTask = await tasksModel.create(data);
      return successResponse(newTask, HTTP_STATUS.OK, "successful operation");
    } else {
      return errorResponse(
        HTTP_STATUS.NO_CONTENT,
        "Sorry Missing Parameters.All parameters are required . Try Again!!"
      );
    }
  } catch (error) {
    console.log("Catch Error ", error);
    return errorResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message);
  }
};

export default {
  createTasks,
};
