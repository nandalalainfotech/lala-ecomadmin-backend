import mongoose from "mongoose";

const categoryrSchema = new mongoose.Schema(
  {
    categorychildId: { type: String, required: true },
    childcategorygroup: { type: String, required: true },
    childcategorytype: { type: String, required: true, },
    childstatus: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Categorychild = mongoose.model("Categorychild", categoryrSchema);

export default Categorychild;