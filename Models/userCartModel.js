import mongoose from "mongoose";
// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, unique: true },
//     seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    
//     price: { type: Number, required: true },
//     countInStock: { type: Number, required: true },
//     rating: { type: Number, default: false },
   
  

//   },
//   {
//     timestamps: true,
//   }
// );

var cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
  image: { type: String, required: true },
  // product:[productSchema],
  productId: { type: mongoose.Schema.Types.ObjectID, ref: 'Product' },
  name: { type: String, required: true, },
  // seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
  
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  rating: { type: Number, default: false },
  qty: { type: Number, required: true },
},
{
  timestamps: true,
}
);

const UserCart = mongoose.model("UserCart", cartSchema);

export default UserCart;
