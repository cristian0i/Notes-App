import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, trinm: true },
    email: { type: String, required: true, trinm: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
