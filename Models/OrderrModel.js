import mongoose from "mongoose";
const orderschema = new mongoose.Schema(
  {
    Amount: { type: String, required: false },
    CustomerName: { type: String, required: false },
    Dateandtime: { type: String, required: false },
    delivery: { type: String, required: false },
    billing: { type: String, required: false },
    email: { type: String, required: false },
    Status: { type: String, required: false },
    PaymentMode: { type: String, required: false },
    ShippingCharges: { type: String, required: false },
    carrier: { type: String, required: false },
    phone: { type: String, required: false },
    cartItems: [],
  },
  {
    timestamps: true,
  }
);
const OrderrModel = mongoose.model("OrderDetails", orderschema);

export default OrderrModel;
