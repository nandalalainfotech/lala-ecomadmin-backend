import mongoose from "mongoose";

const CombinationSchema = new mongoose.Schema(
  {
    comid: { type: String, required: true },
    comname: { type: String, required: true },
    comvalue: { type: String, required: true },
    comstock: { type: String, required: false },
    color: { type: String, required: false },
    filename: { type: String, required: false },
    Cost: { type: String, required: false },
    taxexclude: { type: String, required: false },
    taxinclude: { type: String, required: false },
    finalPrice: { type: String, required: false },
    comcheck: { type: Boolean, required: false },
    CombinationId: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "CatlogProduct",
    },
  },
  {
    timestamps: true,
  }
);

const Combinationchild = mongoose.model("Combinationchild", CombinationSchema);

export default Combinationchild;
