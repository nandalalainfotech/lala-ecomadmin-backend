import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema(
  {
    paymentName: { type: String, required: false },
    mode: { type: String, required: false },
    AppId: { type: String, required: false },
    secKey: { type: String, required: false },
    checked: { type: Boolean, required: false },
    filename: { type: String, required: false },
  },
  {
    timestamps: true,
  },
);
const PaymentModel = mongoose.model("payment", paymentSchema);
export default PaymentModel;
