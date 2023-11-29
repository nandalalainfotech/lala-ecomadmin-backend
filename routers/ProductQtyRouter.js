import express from "express";
import expressAsyncHandler from "express-async-handler";
import ProductQtyModel from "../Models/ProductQtyModel.js";
import CatlogProduct from "../Models/catProductModule.js";
const ProductQtyRouter = express.Router();
ProductQtyRouter.post(
  "/Quantities",
  expressAsyncHandler(async (req, res) => {
   
    const QuentitiesSave = new ProductQtyModel({
      mprodId: req.body.mprodId,
      Qty: req.body.Qty,
      minQty: req.body.minQty,
    });
    console.log("req-------->>>Test", QuentitiesSave);
    const createdQuentities = await QuentitiesSave.save();
    
    res.send({ message: "Quentities Added", category: createdQuentities });
  })
);

ProductQtyRouter.put(
  "/updatequantity/:id",
  expressAsyncHandler(async (req, res) => {
    let object1 = req.body.productId;
    console.log("object1-------->>>Test", object1);
    let select;
    const proddata = await CatlogProduct.findById({ _id: object1[0] });
    proddata.quantity = req.body.Qty;
    select = await proddata.save();

    const Id = req.body._id;
    const prodQtyUpdate = await ProductQtyModel.findById(Id);
    if (prodQtyUpdate) {
      prodQtyUpdate.Qty = req.body.Qty;
      prodQtyUpdate.minQty = req.body.minQty;
      const updatedQtyAttribute = await prodQtyUpdate.save();
      res.send({ message: " Updated", attribute: updatedQtyAttribute });
    } else {
      res.status(404).send({ message: "Quantity Not Found" });
    }
  })
);

ProductQtyRouter.get(
  "/quantitylist",
  expressAsyncHandler(async (req, res) => {
    const Qtydetails = await ProductQtyModel.find().sort({ createdAt: -1 });
    if (Qtydetails) {
      res.send(Qtydetails);
    } else {
      res.status(404).send({ message: "Quantity details Not Found" });
    }
  })
);

ProductQtyRouter.get(
  "/lastquantitylist",
  expressAsyncHandler(async (req, res) => {
    const Qtydetails = await ProductQtyModel.find().sort({ _id: -1 }).limit(1);
    if (Qtydetails) {
      res.send(Qtydetails);
    } else {
      res.status(404).send({ message: "Quantity details Not Found" });
    }
  })
);

ProductQtyRouter.get(
  "/findOnequantitylist/:id",
  expressAsyncHandler(async (req, res) => {
    const Qtydetails = await ProductQtyModel.findOne({
      mprodId: req.params.id,
    });
    if (Qtydetails) {
      res.send(Qtydetails);
    } else {
      res.status(404).send({ message: "Quantity details Not Found" });
    }
  })
);

export default ProductQtyRouter;
