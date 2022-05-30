import usersServices from "../../services/usersServices.mjs";
import { constructResponse } from "../../utils/helpers.mjs";

const createUsers = async (req, res) => {
  const response = await usersServices.createUsers(req.body);
  return constructResponse(res, response);
};

export default {
    createUsers
};
