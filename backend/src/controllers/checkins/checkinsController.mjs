import checkinsServices from "../../services/checkinsServices.mjs";
import { constructResponse } from "../../utils/helpers.mjs";

const createCheckIns = async (req, res) => {
  const response = await checkinsServices.createCheckIns(req.body);
  return constructResponse(res, response);
};



export default {
    createCheckIns
};
