import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    isPaid: { type: Boolean, required: false },
    amount: { type: Number, required: false },
    // status: { type: Boolean, required: false },
    razorpay: {
      orderId: { type: String },
      paymentId: { type: String },
      signature: { type: String },
    },
  },
  {
    timestamps: true,
  }
);
const TestModel = mongoose.model("Test", testSchema);
export default TestModel;
