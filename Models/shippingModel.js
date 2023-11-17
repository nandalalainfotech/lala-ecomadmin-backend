import mongoose from "mongoose";
const shippingSchema = new mongoose.Schema(
  {
    preId: { type: String, required: false },
    checked: { type: Boolean, required: false },
    tax: { type: String, required: false },
    title: { type: String, required: false },
    test: [],
    editId: [],
  },
  {
    timestamps: true,
  },
);
const shippingModel = mongoose.model("Shippingdetails", shippingSchema);
export default shippingModel;
