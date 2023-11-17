import mongoose from "mongoose";
const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: null },
    checked: { type: Boolean, required: false, default: null },
    editor: { type: String, required: false, default: null },
    ckeditor: { type: String, required: false, default: null },
    fieldname: { type: String, required: false, default: null },
    originalname: { type: String, required: false, default: null },
    path: { type: String, required: false, default: null },
    filename: { type: String, required: false, default: null },
    mimetype: { type: String, required: false, default: null },
    encoding: { type: String, required: false, default: null },
    flag: { type: Boolean, required: false, default: null },
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
