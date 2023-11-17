import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    prodname: { type: String, required: false },
    user: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    fileId: { type: mongoose.Schema.Types.ObjectID, ref: "Image" },
    imageId: { type: String, required: false },
    summary: { type: String, required: false },
    description: { type: String, required: false },
    featureId: [],
    featurestypevalue: [],
    brand: { type: String, required: false },
    search: { type: String, required: false },
    reference: { type: String, required: false },
    combination: { type: String, required: false },
    quantity: { type: String, required: false },
    taxexcluded: { type: String, required: false },
    taxincluded: { type: String, default: false },
    taxrule: { type: String, default: false },
    catId: { type: String, required: false },
    catChildId: { type: String, required: false },
    grandchildId: { type: String, required: false },
    qty: { type: String, required: false },
    mqty: { type: String, required: false },
    SLocation: { type: String, required: false },
    stockin: { type: String, required: false },
    stockout: { type: String, required: false },
    date: { type: Date, required: false },
    height: { type: String, default: false },
    width: { type: String, default: false },
    depth: { type: String, default: false },
    weight: { type: String, default: false },
    status: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const CatlogProduct = mongoose.model("CatlogProduct", productSchema);

export default CatlogProduct;
