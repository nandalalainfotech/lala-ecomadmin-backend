import mongoose from 'mongoose';

const customerAddressSchema = new mongoose.Schema(
  
    {
      custEmail: { type: String, required: true },
      identificationNo: { type: String, required: true },
      addresAlias: { type: String, required: true },
      fname: { type: String, required: true },
      lname: { type: String, required: true },
      company: { type: String, required: true },
      vatNo: { type: String, required: true },
      address: { type: String, required: true },
      Addres2: { type: String, required: true },
      zip: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true },
      mobile: { type: String, required: true },
      other: { type: String, required: true },
    },
    {
      timestamps: true,
    },
  
  );
  
  const CustomAddress = mongoose.model('CustomAddress', customerAddressSchema);
  
  export default CustomAddress;