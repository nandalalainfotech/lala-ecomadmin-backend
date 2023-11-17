import mongoose from "mongoose";
const OptionSchema = new mongoose.Schema(
  {
    mprodId: { type: String, required: true },
    appearence: { type: String, required: true },
    availableForOrders: { type: String, required: true },
    webonly: { type: String, required: true },
    Tag: { type: String, required: true },
    Condition: { type: String, required: true },
    Display: { type: String, required: true },
    ISBN: { type: String, required: true },
    EAN: { type: String, required: true },
    UPC: { type: String, required: true },
    MPN: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const OptionSaveModel = mongoose.model("OptionDetails", OptionSchema);
export default OptionSaveModel;





