import { HTTP_STATUS } from "../utils/Constant.mjs";
import { errorResponse, successResponse } from "../utils/helpers.mjs";
import tokenstModel from "../models/tokensModel.mjs";

// return successResponse('Success!', HTTP_STATUS.OK, 'Email has been verified successfully!');
// return errorResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message);

const createTokens = async (data) => {
  try {
    console.log("createTokens Func");
    let { email, password, device_name } = data;

    if (
      email !== undefined &&
      password !== undefined &&
      device_name !== undefined
    ) {
      if (password.length >= 8) {
        let tokens = await tokenstModel
          .findOne({ email: email })
          .sort({ _id: -1 })
          .exec();
        if (tokens) {
          return errorResponse(
            HTTP_STATUS.FORBIDDED,
            "User Already Exists, Token not created.Registered Unique Email"
          );
        } else {
          let newToken = await tokenstModel.create(data);
          return successResponse(
            newToken,
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
  createTokens,
};
