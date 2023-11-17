import mongoose from 'mongoose';

const generalSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, default: null },
        track: { type: String, required: false, default: null },
        fieldname: { type: String, required: false, default: null },
        originalname: { type: String, required: false, default: null },
        path: { type: String, required: false, default: null },
        filename: { type: String, required: false, default: null },
    },
    {
        timestamps: true,
    }
);

const GeneralModel = mongoose.model('generalSetingDetails', generalSchema);
export default GeneralModel;
