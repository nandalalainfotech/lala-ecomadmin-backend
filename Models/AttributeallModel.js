import mongoose from "mongoose";

const AttributeSchema = new mongoose.Schema(
    {
        nameall: { type: String, required: false, },
        attributename: { type: String, required: false, },
    },
    {
        timestamps: true,
    }
);

const Attributeall = mongoose.model("Attributeall", AttributeSchema);

export default Attributeall;
