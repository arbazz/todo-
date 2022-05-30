import { genSalt, hash, compare } from "bcrypt";
import { HTTP_STATUS } from "./Constant.mjs";

export const constructResponse = (res, responseData) => {
  const { success, message, status, data } = responseData;
  console.log("response Data : ",responseData)
  if (success)
    return res.status(status).json({
      data,
      message,
      success: true,
    });
  if (data)
    return res.status(status).json({
      data,
      message,
      success: false,
    });
  return res.status(status).json({
    message,
    success: false,
  });
};

export const successResponse = (data, status, message) => ({
  data,
  status: status || HTTP_STATUS.OK,
  message,
  success: true,
});

export const errorResponse = (status, message, data = null) => ({
  data,
  status: status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
  message: message || "Internal server error",
  success: false,
});

export const getKeyByValue = (obj, val) =>
  Object.keys(obj).find((key) => obj[key] === val);

export const hashString = async (string) => {
  try {
    if (!string)
      throw new Error(
        "In order to Hash the required string, please provide a string"
      );
    const SALT_ROUNDS = 10;
    const salt = await genSalt(SALT_ROUNDS);
    return await hash(string, salt);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const compareString = async (string, string2) => {
  try {
    if (!string)
      throw new Error(
        "In order to compare the required string, please provide a string"
      );
    string2 = string2.replace(/^\$2y(.+)$/i, "$2a$1");
    return await compare(string, string2);
  } catch (error) {
    throw new Error(error.message);
  }
};
