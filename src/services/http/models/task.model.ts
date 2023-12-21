import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  status: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TaskModel = mongoose.model("Task", taskSchema, "tasks");
export default TaskModel;
