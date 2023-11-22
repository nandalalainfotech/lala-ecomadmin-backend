import mongoose from 'mongoose';
const ShippingSchema = new mongoose.Schema(
  {
    mprodId: { type: String, required: true },
    width: { type: String, required: true },
    height: { type: String, required: true },
    depth: { type: String, required: true },
    weight: { type: String, required: true },
    delTime: { type: String, required: true },
    // inStock: { type: String, required: true },
    // outOfStock: { type: String, required: true },
    // fees: { type: String, required: true },
    // carrier1: { type: Boolean, required: true },
    // carrier2: { type: Boolean, required: true },
    // carrier3: { type: Boolean, required: true },
    // carrier4: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);
const ProShipModel = mongoose.model('productShipping', ShippingSchema);
export default ProShipModel;
