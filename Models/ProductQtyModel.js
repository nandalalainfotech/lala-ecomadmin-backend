import mongoose from "mongoose";
const QuantitiesSchema = new mongoose.Schema(
  {
    mprodId: { type: String, required: false },
    Qty: { type: String, required: false },
    minQty: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);
const ProductQtyModel = mongoose.model("productQuentities", QuantitiesSchema);
export default ProductQtyModel;
