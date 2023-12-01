import mongoose from "mongoose";

const customerAddressSchema = new mongoose.Schema(
  {
    custEmail: { type: String, required: false },
    identificationNo: { type: String, required: false },
    addresAlias: { type: String, required: false },
    fname: { type: String, required: false },
    lname: { type: String, required: false },
    company: { type: String, required: false },
    vatNo: { type: String, required: false },
    address: { type: String, required: false },
    Addres2: { type: String, required: false },
    zip: { type: String, required: false },
    city: { type: String, required: false },
    country: { type: String, required: false },
    phone: { type: String, required: false },
    mobile: { type: String, required: false },
    other: { type: String, required: false },
    status: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const CustomAddress = mongoose.model("CustomAddress", customerAddressSchema);

export default CustomAddress;
