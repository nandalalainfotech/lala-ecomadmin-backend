import mongoose from "mongoose";

const specfiCombinSchema = new mongoose.Schema(
  {
    scomid: { type: String, required: false },
    scomname: { type: String, required: false },
    scomvalue: { type: String, required: false },
    sCombiId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const specifiCombination = mongoose.model(
  "specifiCombination",
  specfiCombinSchema
);

export default specifiCombination;
