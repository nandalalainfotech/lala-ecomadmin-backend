import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    fname: { type: String, required: false, default: null },
    lname: { type: String, required: false, default: null },
    emailorphone: { type: String, required: false, default: null },
    phone: { type: String, required: false, default: null },
    password: { type: String, required: false, default: null },
    cpassword: { type: String, required: false, default: null },
    dob: { type: String, required: false, default: null },
    cusGroup: { type: String, required: false, default: null },
    showOffers: { type: Boolean, required: false, default: null },
    checked: { type: Boolean, required: false, default: null },
  },
  {
    timestamps: true,
  }
);

const CustomerDetailsModel = mongoose.model("CustomerDetails", ProfileSchema);

export default CustomerDetailsModel;
