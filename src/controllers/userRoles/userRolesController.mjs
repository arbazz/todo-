import userRolesServices from "../../services/userRolesServices.mjs";
import { constructResponse } from "../../utils/helpers.mjs";

const assignUserRoles = async (req, res) => {
  const response = await userRolesServices.assignUserRoles(req.body);
  return constructResponse(res, response);
};

export default {
    assignUserRoles
};
