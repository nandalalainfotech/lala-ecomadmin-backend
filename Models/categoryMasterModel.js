import mongoose from "mongoose";
import subCategoryMaster from "./categorysubMasterModel.js";

const categoryMasterSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    checked: { type: Boolean, required: false },
    parent: { type: String, required: false },
    description: { type: String, required: false },
    coverimg: { type: String, required: false },
    catThumbnail: { type: String, required: false },
    menuThumbnail: { type: String, required: false },
    parentId: { type: String, required: false },
    children: [mongoose.Schema.Types.Mixed],
  },
  {
    timestamps: true,
    strict: false,
  }
);

const CategoryMaster = mongoose.model("CategoryMaster", categoryMasterSchema);

export default CategoryMaster;
