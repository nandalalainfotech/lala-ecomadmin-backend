import mongoose from "mongoose";
const stateSchema = new mongoose.Schema(
  {
    iso: { type: String, required: false },
    state: { type: String, required: false },
    zone: { type: String, required: false },
    country: { type: String, required: false },
    checked: { type: Boolean, required: false },
    countrtyId: { type: String, required: false },
  },
  {
    timestamps: true,
  },
);
const stateModel = mongoose.model("state", stateSchema);
export default stateModel;
