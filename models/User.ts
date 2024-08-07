import mongoose, { CallbackWithoutResultAndOptionalError } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      default: ''
    },
    authProvider: {
        type: String,
        default: 'Email'
    },
    image: {
        type: String,
        default: ''
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("Users", UserSchema);
