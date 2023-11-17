
import mongoose from "mongoose";


const ProfileSchema = new mongoose.Schema(
  {
    empprofile: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const EmployeProfile = mongoose.model("EmployeProfile", ProfileSchema);

export default EmployeProfile;