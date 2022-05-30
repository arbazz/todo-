import mongoose from "mongoose";

// Create roles Schema
const rolesSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  }
});

const rolesModel = new mongoose.model("rolesModel", rolesSchema);


export default rolesModel;