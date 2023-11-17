import mongoose from "mongoose";
const seoSchema = new mongoose.Schema(
  {
    mprodId: { type: String, required: true },
    metaTitle: { type: String, required: true },
    description: { type: String, required: true },
    friendlyURL: { type: String, required: true },
    redirection: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const seoModel = mongoose.model("SEOptimization", seoSchema);
export default seoModel;
