import mongoose from "mongoose";
const gatewaySchema = new mongoose.Schema(
  {
    isPaid: { type: Boolean },
    amount: { type: Number },
    razorpay: {
      email: { type: String },
      orderId: { type: String },
      paymentId: { type: String },
      signature: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const GatewayModel = mongoose.model("Gatewaydetails", gatewaySchema);

export default GatewayModel;
