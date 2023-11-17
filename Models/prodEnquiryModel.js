import mongoose from 'mongoose';
const prodEnquirySchema = new mongoose.Schema(
  
    {
      fname: { type: String, required: true },
      lname: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      reqmessage: { type: String, required: true },
      productId: { type: String, required: true },
    },
    {
      timestamps: true,
    },
  
  );
  
  const ProdEnquiry = mongoose.model('ProdEnquiry', prodEnquirySchema);
  
  export default ProdEnquiry;