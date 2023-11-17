import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import UserCart from "../Models/userCartModel.js";
import { isAdmin, isAuth, isSellerOrAdmin } from "../utils.js";
import User from "../Models/userModel.js";
import { Logger } from "mongodb";

const UserCartRouter = express.Router();

UserCartRouter.get(
  "/cartlist/:id",
  expressAsyncHandler(async (req, res) => {
    const userId = req.params.id;

    const cartitems = await UserCart.find({ userId: userId });

    res.send(cartitems);
  })
);

// UserCartRouter.get("/cartId/:id",expressAsyncHandler(async (req, res) => {
//     console.log("reqaaaaa============>>>>",req.params.id)
//     const userId=req.params.id;
//     const createdCartId = await UserCart.find({userId:userId});
//     console.log("createdCartId",createdCartId)
//     // const cartitems = await UserCart.find();
//     res.send(createdCartId);
//   })
// );

UserCartRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    console.log("req", req);
    const productId = req.params.id;
    const cartupdate = await UserCart.findById(productId);
    if (cartupdate) {
      cartupdate.qty = req.body.qty;
      const updatedProduct = await cartupdate.save();
      res.send({ message: "Product Updated", cartupdate: updatedProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

UserCartRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const cart = new UserCart({
      userId: req.body.user._id,
      name: req.body.data.name,
      productId: req.body.data._id,
      price: req.body.data.price,
      countInStock: req.body.data.countInStock,
      rating: req.body.data.rating,
      image: req.body.image,
      qty: req.body.qty,
    });
   
    const cartlist = await UserCart.find({
      productId: req.body.data._id,
    });
    // console.log("cartlist0",cartlist);

    if (cartlist.length === 0) {
      const createdCart = await cart.save();
    
      res.send({ message: "Cart Created", cart: createdCart });
    }
  })
);

UserCartRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const createdCart = await UserCart.findById(req.params.id);
    if (createdCart) {
      const deletecreatedCart = await createdCart.remove();
      res.send({ message: "Cart Deleted", createdCart: deletecreatedCart });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

export default UserCartRouter;
