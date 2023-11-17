import mongoose from "mongoose";

const pricingSchema = new mongoose.Schema(
  {
    mprodId: { type: String, required: true },
    RetailExcl: { type: String, required: false },
    RetailIncl: { type: String, required: false },
    RetailCost: { type: String, required: false },
    priceGroup: { type: String, required: false },
    Rate: { type: String, required: false },
    productId: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const prodPricingModel = mongoose.model("prodPricing", pricingSchema);
export default prodPricingModel;
