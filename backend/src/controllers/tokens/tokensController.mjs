import tokensServices from "../../services/tokensServices.mjs";
import { constructResponse } from "../../utils/helpers.mjs";

const createTokens = async (req, res) => {
  const response = await tokensServices.createTokens(req.body);
  return constructResponse(res, response);
};



export default {
    createTokens
};
