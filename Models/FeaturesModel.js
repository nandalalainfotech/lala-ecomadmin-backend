import mongoose from "mongoose";


const FeaturesSchema = new mongoose.Schema(
  {
    featurename: { type: String, required: true },
    featurecheck: { type: Boolean, required: false },
  },
  {
    timestamps: true,
  }
);
const Features = mongoose.model("Features", FeaturesSchema);

export default Features;
