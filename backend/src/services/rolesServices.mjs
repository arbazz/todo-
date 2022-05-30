import { HTTP_STATUS } from "../utils/Constant.mjs";
import { errorResponse, successResponse } from "../utils/helpers.mjs";
import rolesModel from "../models/rolesModel.mjs"

const createRoles = async (data) => {
  try {
    console.log("createRoles Func");
    let { title, code } = data;

    if (
      title !== undefined &&
      code !== undefined
    ) 
      {
        let roles = await rolesModel.create(data);
          return successResponse(
            roles,
            HTTP_STATUS.OK,
            "successful operation"
          );
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
    createRoles,
};
