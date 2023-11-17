import mongoose from "mongoose";

const categoryrSchema = new mongoose.Schema(
  {
    categoryId: { type: String, required: true, },
    subcategorygroup: { type: String, required: true },
    substatus: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Categorysub = mongoose.model("CategorySub", categoryrSchema);

export default Categorysub;
