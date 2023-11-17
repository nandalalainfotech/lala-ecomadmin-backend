import mongoose from "mongoose";
const summarySchema = new mongoose.Schema(
  {
    preId: { type: String, required: false },
    Checked: { type: Boolean, required: false },
    Name: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);
const summaryModel = mongoose.model("summaryDetail", summarySchema);
export default summaryModel;
