import mongoose from "mongoose";

const AttributeValueSchema = new mongoose.Schema(

  {
    value: { type: String, required: false },
    allId: { type: String, required: false },
    color: { type: String, required: false },
    attributeVlaue: { type: String, required: false },
    attributename: { type: String, required: false },
    fieldname: { type: String, required: false },
    originalname: { type: String, required: false },
    path: { type: String, required: false },
    filename: { type: String, required: false },
    mimetype: { type: String, required: false },
    encoding: { type: String, required: false },
    flag: { type: Boolean, required: false },
    attvaluecheck: { type: Boolean, required: false },
    all: { type: Boolean, required: false },
  },
  {
    timestamps: true,
  },
);

const AttributeValue = mongoose.model("AttributeValue", AttributeValueSchema);

export default AttributeValue;
