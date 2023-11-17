import mongoose from "mongoose";

const statusSchema = new mongoose.Schema(
  {
    Status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const StatusModel = mongoose.model("StatusDetails", statusSchema);
export default StatusModel;
