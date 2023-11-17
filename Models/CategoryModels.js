import mongoose from "mongoose";

const categoryrSchema = new mongoose.Schema(
  {
    categoryname: { type: String, required: true, },
    categorytittel: { type: String, required: true },
    categorygroup: { type: String, required: true },
    categorytype: { type: String, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categoryrSchema);

export default Category;
