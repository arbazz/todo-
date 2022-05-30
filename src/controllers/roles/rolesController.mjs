import rolesServices from "../../services/rolesServices.mjs";
import { constructResponse } from "../../utils/helpers.mjs";

const createRoles = async (req, res) => {
  const response = await rolesServices.createRoles(req.body);
  return constructResponse(res, response);
};



export default {
    createRoles
};
