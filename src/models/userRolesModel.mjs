import mongoose from "mongoose";

// Create userRoles Schema
const userRolesSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique:true
  },
  role_id: {
    type: String,
    required: true,
  },
});

const userRolesModel = new mongoose.model("userRolesModel", userRolesSchema);

export default userRolesModel;
