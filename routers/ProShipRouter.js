import express from "express";
import expressAsyncHandler from "express-async-handler";
import ProShipModel from "../Models/ProShipModel.js";
const ProShipRouter = express.Router();
ProShipRouter.post(
  "/Shipping",
  expressAsyncHandler(async (req, res) => {
    console.log('req', req);
    const ShippingDetail = new ProShipModel({
      mprodId: req.body.mprodId,
      width: req.body.width,
      height: req.body.height,
      depth: req.body.depth,
      weight: req.body.weight,
      delTime: req.body.delTime,
      // inStock: req.body.inStock,
      // outOfStock: req.body.outOfStock,
      // fees: req.body.fees,
      // carrier1: req.body.carrier1,
      // carrier2: req.body.carrier2,
      // carrier3: req.body.carrier3,
      // carrier4: req.body.carrier4,
    });
    const createdShipping = await ShippingDetail.save();
    res.send({ message: "Shipping Added", category: createdShipping });
  })
);

ProShipRouter.put(
  "/updateship/:id",
  expressAsyncHandler(async (req, res) => {
    const Id = req.body._id;
    const prodShipUpdate = await ProShipModel.findById(Id);
    if (prodShipUpdate) {
      prodShipUpdate.width = req.body.width;
      prodShipUpdate.depth = req.body.depth;
      prodShipUpdate.height = req.body.height;
      prodShipUpdate.weight = req.body.weight;
      prodShipUpdate.delTime = req.body.delTime;
      // prodShipUpdate.inStock = req.body.inStock;
      // prodShipUpdate.outOfStock = req.body.outOfStock;
      // prodShipUpdate.fees = req.body.fees;
      // prodShipUpdate.carrier1 = req.body.carrier1;
      // prodShipUpdate.carrier2 = req.body.carrier2;
      // prodShipUpdate.carrier3 = req.body.carrier3;
      // prodShipUpdate.carrier4 = req.body.carrier4;
      const updatedShipAttribute = await prodShipUpdate.save();
      res.send({ message: " Updated", attribute: updatedShipAttribute });
    } else {
      res.status(404).send({ message: "Shipping Not Found" });
    }
  })
);

ProShipRouter.get(
  "/shiplist",
  expressAsyncHandler(async (req, res) => {
    const Shipdetails = await ProShipModel.find();
    if (Shipdetails) {
      res.send(Shipdetails);
    } else {
      res.status(404).send({ message: "Shipping details Not Found" });
    }
  })
);

export default ProShipRouter;
