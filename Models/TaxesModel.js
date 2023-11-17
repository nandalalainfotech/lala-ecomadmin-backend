import mongoose from 'mongoose';

const taxesSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Rate: { type: String, required: true },
    // status: { type: Boolean, required: false },
    checked: { type: Boolean, required: false },
  },
  {
    timestamps: true,
  }
);

const TaxesModel = mongoose.model('taxesDetails', taxesSchema);
export default TaxesModel;
