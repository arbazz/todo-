import { HTTP_STATUS } from "../utils/Constant.mjs";
import { errorResponse, successResponse } from "../utils/helpers.mjs";
import checkinsModel from "../models/checkinsModel.mjs";

const createCheckIns = async (data) => {
  try {
    console.log("createCheckIns Func");
    let { address, latitude, longitude } = data;

    if (
      address !== undefined &&
      latitude !== undefined &&
      longitude !== undefined
    ) {
        let checkins = await checkinsModel
          .findOne({ address: address })
          .sort({ _id: -1 })
          .exec();
        if (checkins) {
          return errorResponse(
            HTTP_STATUS.FORBIDDED,
            "checkin already Exists"
          );
        } else {
          let newCheckins = await checkinsModel.create(data);
          return successResponse(
            newCheckins,
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
    createCheckIns,
};
