import mongoose from "mongoose";
const zoneSchema = new mongoose.Schema(
  {
    zoneName: { type: String, required: false },
    checked: { type: Boolean, required: false },
  },
  {
    timestamps: true,
  },
);
const zoneModel = mongoose.model("Zone", zoneSchema);
export default zoneModel;
