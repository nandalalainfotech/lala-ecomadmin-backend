import mongoose from "mongoose";
const shipSizeSchema = new mongoose.Schema(
  {
    preId: { type: String, required: false },
    width: { type: String, required: false },
    height: { type: String, required: false },
    depth: { type: String, required: false },
    weight: { type: String, required: false },
  },
  {
    timestamps: true,
  },
);
const SizeGroupModel = mongoose.model("sizeWeightGroup", shipSizeSchema);
export default SizeGroupModel;
