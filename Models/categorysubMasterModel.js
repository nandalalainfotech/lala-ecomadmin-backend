import mongoose from 'mongoose'; 
import ThirdCategoryMaster from './categoryThirdModel.js';
const subcategoryMasterSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      checked: { type: Boolean, required: true },
      parent: { type: String, required: false },
      description: { type: String, required: false },
      coverimg: { type: String, required: false },
      catThumbnail: { type: String, required: false },
      menuThumbnail: { type: String, required: false },
      children : {type: [ThirdCategoryMaster.thirdCategorySchema],strict: false},
    },
    {
      timestamps: true,
      strict: false
    },
  );
  
  const subCategoryMaster = mongoose.model('subCategoryMaster', subcategoryMasterSchema);
  
  export default subCategoryMaster;