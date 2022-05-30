import emailValidator from "email-validator";
import mongoose from "mongoose";

// Create tokens Schema
const tokensSchema = new mongoose.Schema({
    device_name: {
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


const tokenstModel = new mongoose.model("tokenstModel", tokensSchema);


export default tokenstModel;