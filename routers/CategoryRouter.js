import express from "express";
import expressAsyncHandler from "express-async-handler";
import Category from "../Models/CategoryModels.js";
import { isAdmin, isAuth, isSeller, isSellerOrAdmin } from "../utils.js";

const categoryRouter = express.Router();

categoryRouter.get(
  "/List",
  expressAsyncHandler(async (req, res) => {
    const Categorylist = await Category.find();
    if (Categorylist) {
      res.send(Categorylist);
    } else {
      res.status(404).send({ message: "Men Product Not Found" });
    }
  })
);

categoryRouter.post(
  "/",
  isAuth,
  isSeller,
  isAdmin,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const category = new Category({
      categoryname: req.body.categoryName,
      categorytittel: req.body.categoryTittel,
      categorygroup: req.body.categorygroup,
      categorytype: req.body.categorytype,
      status: req.body.categorystatus,
    });
    const createdCategory = await category.save();
    res.send({ message: "Product Created", category: createdCategory });
  })
);

export default categoryRouter;
