import { Model, Schema, model } from "mongoose";

interface UserModel {
  email: string
  role: string
  products: Array<String>
}

const UserSchema = new Schema({
  email: { type: String, required: true },
  role: { type: String, required: true},
  products: { type: Array, required: false }
},{
  timestamps: false,
})

export const User: Model<UserModel> = model<UserModel>('User', UserSchema);