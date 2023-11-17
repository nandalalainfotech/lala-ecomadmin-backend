import mongoose from "mongoose";

const AttributeSchema = new mongoose.Schema(
  {
    nameallid: { type: String, required: false, },
    attributename: { type: String, required: true, },
    attributetype: { type: String, required: true },
    attributecheck: { type: Boolean, required: false },
  },
  {
    timestamps: true,
  }
);

const Attribute = mongoose.model("Attribute", AttributeSchema);

export default Attribute;
