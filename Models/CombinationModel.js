
import mongoose from "mongoose";


const CombinationchilsSchema = new mongoose.Schema(
  {
    combinationId: [mongoose.Schema.Types.Mixed],
  },
  {
    timestamps: true,
  }
);

const Combination = mongoose.model("Combination", CombinationchilsSchema);

export default Combination;

