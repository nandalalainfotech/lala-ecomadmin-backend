import mongoose from "mongoose";

const categoryrSchema = new mongoose.Schema(
  {
    categoryname: { type: String, required: true, },
    categorytittel: { type: String, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const CategoryMain = mongoose.model("CategoryMain", categoryrSchema);

export default CategoryMain;
