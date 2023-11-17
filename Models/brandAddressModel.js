import mongoose from 'mongoose';
const brandAddressSchema = new mongoose.Schema(
  
    {
      brand: { type: String, required: true },
      lastname: { type: String, required: true },
      firstname: { type: String, required: true },
      address: { type: String, required: true },
      address2: { type: String, required: true },
      zip: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      dni: { type: String, required: true },
      phone: { type: String, required: true },
      mobile: { type: String, required: true },
      other: { type: String, required: true },
    },
    {
      timestamps: true,
    },
  
  );
  
  
  
  
  const BrandAddress = mongoose.model('BrandAddress', brandAddressSchema);
  
  export default BrandAddress;