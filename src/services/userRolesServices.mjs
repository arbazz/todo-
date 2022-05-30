import { HTTP_STATUS } from "../utils/Constant.mjs";
import { errorResponse, successResponse } from "../utils/helpers.mjs";
import userRolesModel from "../models/userRolesModel.mjs";

const assignUserRoles = async (data) => {
  try {
    console.log("createTokens Func");
    let { user_id, role_id } = data;

    if (user_id !== undefined && role_id !== undefined) {
      let userRole = await userRolesModel
        .findOne({ user_id: user_id })
        .sort({ _id: -1 })
        .exec();
      if (userRole) {
        return errorResponse(
          HTTP_STATUS.FORBIDDED,
          "User Already Exists,Registered Unique user_id"
        );
      } else {
        let newUserRole = await userRolesModel.create(data);
        return successResponse(
          newUserRole,
          HTTP_STATUS.OK,
          "successful operation"
        );
      }
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
  assignUserRoles,
};
