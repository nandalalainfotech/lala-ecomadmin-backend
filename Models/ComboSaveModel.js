import mongoose from "mongoose";
const ComboSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    Cost: { type: String, required: true },
    taxexclude: { type: String, required: false },
    taxinclude: { type: String, required: true },
    finalPrice: { type: String, required: true },
    qty: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);
const ComboSaveModel = mongoose.model("ComboDetails", ComboSchema);
export default ComboSaveModel;
