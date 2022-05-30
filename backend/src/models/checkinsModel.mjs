import mongoose from "mongoose";

// Create checkinsModel Schema
const checkinsSchema = new mongoose.Schema({
    address: {
    type: String,
    required: true,
    unique:true
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  }
});

const checkinsModel = new mongoose.model("checkinsModel", checkinsSchema);


export default checkinsModel;