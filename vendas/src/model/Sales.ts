import { Model, Schema, model } from "mongoose";

interface SalesModel {
  serviceKey: string
  buyerEmail: string
  productId: string
  status: string
}

const SalesSchema = new Schema({
  serviceKey: { type: String, required: true },
  buyerEmail: { type: String, required: true},
  productId: { type: String, required: true },
  status: { type: String, required: true }
},{
  timestamps: false,
})

export const Sales: Model<SalesModel> = model<SalesModel>('Sales', SalesSchema);