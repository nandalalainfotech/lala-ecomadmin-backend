import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true, unique: true },
    profile: { type: String, required: true },
    active: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const EmployeDetails = mongoose.model("Employedetails", ProfileSchema);

export default EmployeDetails;
