import mongoose from "mongoose";
const citySchema = new mongoose.Schema(
  {
    iso: { type: String, required: false },
    state: { type: String, required: false },
    zone: { type: String, required: false },
    country: { type: String, required: false },
    checked: { type: Boolean, required: false },
    city: { type: String, required: false },
    stateId: { type: String, required: false },
    zoneId: { type: String, required: false },
    countryId: { type: String, required: false },
    pincodes: [],
  },
  {
    timestamps: true,
  }
);
const cityModel = mongoose.model("city", citySchema);
export default cityModel;
