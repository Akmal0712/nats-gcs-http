import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  login: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model("User", userSchema, "users");
export default UserModel;
