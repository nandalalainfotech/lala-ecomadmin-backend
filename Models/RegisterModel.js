import mongoose from "mongoose";
const regDetailsSchema = new mongoose.Schema(
  {
    fname: { type: String, required: false },
    // lname: { type: String, required: false },
    email: { type: String, required: false },
    label: { type: String, required: false },
    // samdel: { type: Boolean, required: false },
    address1: { type: String, required: false },
    address2: { type: String, required: false },
    city: { type: String, required: false },
    zipcode: { type: String, required: false },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    statename: { type: String, required: false },
    additionalinfo: { type: String, required: false },
    state: { type: String, required: false },
    country: { type: String, required: false },
    cityName: { type: String, required: false },
    countryName: { type: String, required: false },
    // productId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const RegisterModel = mongoose.model("registerDetails", regDetailsSchema);

export default RegisterModel;
