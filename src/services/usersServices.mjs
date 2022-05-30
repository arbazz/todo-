import { HTTP_STATUS } from "../utils/Constant.mjs";
import { errorResponse, successResponse } from "../utils/helpers.mjs";
import usersModel from "../models/usersModel.mjs"

const createUsers = async (data) => {
  try {
    console.log("createUsers Func");
    let {name, email, password } = data;
    if (
      email !== undefined &&
      password !== undefined &&
      name !== undefined
    ) {
      if (password.length >= 8) {
        let user = await usersModel
          .findOne({ email: email })
          .sort({ _id: -1 })
          .exec();
        if (user) {
          return errorResponse(
            HTTP_STATUS.FORBIDDED,
            "User Already Exists. Please Registered Unique Email"
          );
        } else {
          let newUser = await usersModel.create(data);
          return successResponse(
            newUser,
            HTTP_STATUS.OK,
            "successful operation"
          );
        }
      } else {
        return errorResponse(
          HTTP_STATUS.UNAUTHORIZED,
          "Sorry Enter Correct Password . Passwrod should be contain minimum 8 Characters. Try Again!!"
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
    createUsers,
};
