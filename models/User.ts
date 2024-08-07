import mongoose, { Document } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password?: string;
  authProvider?: string;
  image?: string;
}

const UserSchema = new mongoose.Schema<IUser>(
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

