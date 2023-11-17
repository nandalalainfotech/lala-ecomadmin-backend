import mongoose from 'mongoose'; 
const thirdCategorySchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      checked: { type: Boolean, required: true },
      parent: { type: String, required: false },
      description: { type: String, required: false },
      coverimg: { type: String, required: false },
      catThumbnail: { type: String, required: false },
      menuThumbnail: { type: String, required: false },
      children :[new mongoose.Schema({
        name: { type: String, required: true },
        checked: { type: Boolean, required: true },
        parent: { type: String, required: false },
        description: { type: String, required: false },
        coverimg: { type: String, required: false },
        catThumbnail: { type: String, required: false },
        menuThumbnail: { type: String, required: false },
      },{ strict: false})]
    },
    {
      timestamps: true,
      strict: false
    },
  );
  
  const FourthCategoryMaster = mongoose.model('FourthCategoryMaster', thirdCategorySchema);
  
  export default FourthCategoryMaster;