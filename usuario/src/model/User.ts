import { Model, Schema, model } from "mongoose";

interface UserModel {
  email: string
  role: string
}

const UserSchema = new Schema({
  email: { type: String, required: true },
  role: { type: String, required: true}
},{
  timestamps: false,
})

export const User: Model<UserModel> = model<UserModel>('User', UserSchema);