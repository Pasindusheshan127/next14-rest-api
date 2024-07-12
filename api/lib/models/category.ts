import { Schema, models, model } from "mongoose";

const categorySchema = new Schema(
  {
    title: { type: "string", require: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Category = models.Category || model("Category", categorySchema);
export default Category;
