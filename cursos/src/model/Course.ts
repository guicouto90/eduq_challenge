import { Model, Schema, model } from "mongoose";

interface CourseModel {

}

const CourseSchema = new Schema({

},{
  timestamps: false,
})

export const Course: Model<CourseModel> = model<CourseModel>('Course', CourseSchema);