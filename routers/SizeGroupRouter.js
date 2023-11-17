import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth, isSeller, isSellerOrAdmin } from "../utils.js";
import SizeGroupModel from "../Models/SizeGroupModel.js";
const SizeGroupRouter = express.Router();
SizeGroupRouter.post(
  "/sizeshiping",
  expressAsyncHandler(async (req, res) => {
    const shipSizeDetails = new SizeGroupModel({
      preId: req.body.preId,
      width: req.body.width,
      height: req.body.height,
      depth: req.body.depth,
      weight: req.body.weight,
    });
    const createdShipSize = await shipSizeDetails.save();
    res.send({
      message: "Size Weight Group Deatails Added",
      category: createdShipSize,
    });
  }),
);

SizeGroupRouter.get(
  "/sizeshiplist",
  expressAsyncHandler(async (req, res) => {
    const SizeGroupModeldetails = await SizeGroupModel.find()
      .sort({ createdAt: -1 })
      .limit(1);

    if (SizeGroupModeldetails) {
      res.send(SizeGroupModeldetails);
    } else {
      res.status(404).send({ message: "SizeGroupModeldetails Not Found" });
    }
  }),
);

SizeGroupRouter.put(
  "/updateship/:id",
  isAuth,
  isSeller,
  isAdmin,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const Id = req.params.id;
    const shipingsizeUpdate = await SizeGroupModel.findById(Id);
    if (shipingsizeUpdate) {
      shipingsizeUpdate.width = req.body.width;
      shipingsizeUpdate.height = req.body.height;
      shipingsizeUpdate.depth = req.body.depth;
      shipingsizeUpdate.weight = req.body.weight;
      const updateShip = await shipingsizeUpdate.save();

      res.send({ message: "Updated", updatedship: updateShip });
    } else {
      res.status(404).send({ message: "Shipping details not found" });
    }
  }),
);

SizeGroupRouter.get(
  "/sizeshipalllist",
  expressAsyncHandler(async (req, res) => {
    const SizeGroupAlldetails = await SizeGroupModel.find().sort({
      createdAt: -1,
    });
    if (SizeGroupAlldetails) {
      res.send(SizeGroupAlldetails);
    } else {
      res.status(404).send({ message: "Size Group Model details Not Found" });
    }
  }),
);
export default SizeGroupRouter;
