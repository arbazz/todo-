import emailValidator from "email-validator";
import mongoose from "mongoose";

// Create Users Schema
const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  }
});

const usersModel = new mongoose.model("usersModel", usersSchema);


export default usersModel;