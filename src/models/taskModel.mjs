import mongoose from "mongoose";

// Create tasks Schema
const tasksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Complete", "Inprogress", "Incomplete"],
    required: true,
  },
  due_at: {
    type:String,
    required: true,
  },
});

const tasksModel = new mongoose.model("tasksModel", tasksSchema);

export default tasksModel;
