import mongoose from "mongoose";
const FeaturesValueSchema = new mongoose.Schema(
  {
    featurevalue: { type: String, required: true },
    featuretype: { type: String, required: true },
    featurevaluecheck: { type: Boolean, required: false },
  },
  {
    timestamps: true,
  }
);

const FeaturesValue = mongoose.model("FeaturesValue", FeaturesValueSchema);

export default FeaturesValue;
