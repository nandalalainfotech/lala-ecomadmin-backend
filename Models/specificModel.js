import mongoose from "mongoose";
const specificSchema = new mongoose.Schema(
  {
    mprodId: { type: String, required: true },
    StartingDate: { type: String, required: false },
    EndDate: { type: String, required: false },
    Count: { type: String, required: false },
    discount: { type: String, required: false },
    TypeOfDiscount: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);
const specificModel = mongoose.model("specificPriceDetails", specificSchema);
export default specificModel;
