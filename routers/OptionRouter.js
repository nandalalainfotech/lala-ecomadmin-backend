import express from "express";
import expressAsyncHandler from "express-async-handler";
import OptionSaveModel from "../Models/OptionSaveModel.js";
const OptionRouter = express.Router();
OptionRouter.post(
  "/options",
  expressAsyncHandler(async (req, res) => {
    // console.log("req", req);
    const OptionDetails = new OptionSaveModel({
      mprodId: req.body.mprodId,
      appearence: req.body.appearence,
      availableForOrders: req.body.availableForOrders,
      webonly: req.body.webonly,
      Tag: req.body.Tag,
      Condition: req.body.Condition,
      Display: req.body.Display,
      ISBN: req.body.ISBN,
      EAN: req.body.EAN,
      UPC: req.body.UPC,
      MPN: req.body.MPN,
    });
    const SaveOption = await OptionDetails.save();
    res.send({ message: "Option Saved", category: SaveOption });
  })
);

OptionRouter.get(
  "/optionslist",
  expressAsyncHandler(async (req, res) => {
    const Optiondetails = await OptionSaveModel.find().sort({ createdAt: -1 });
    if (Optiondetails) {
      res.send(Optiondetails);
    } else {
      res.status(404).send({ message: "Option details Not Found" });
    }
  })
);

OptionRouter.put(
  "/optionupdate/:id",
  expressAsyncHandler(async (req, res) => {
    const Id = req.body._id;
    const prodOptUpdate = await OptionSaveModel.findById(Id);
    if (prodOptUpdate) {
      prodOptUpdate.appearence = req.body.appearence;
      prodOptUpdate.availableForOrders = req.body.availableForOrders;
      prodOptUpdate.webonly = req.body.webonly;
      prodOptUpdate.Tag = req.body.Tag;
      prodOptUpdate.Condition = req.body.Condition;
      prodOptUpdate.Display = req.body.Display;
      prodOptUpdate.ISBN = req.body.ISBN;
      prodOptUpdate.EAN = req.body.EAN;
      prodOptUpdate.UPC = req.body.UPC;
      prodOptUpdate.MPN = req.body.MPN;
      const updatedOptAttribute = await prodOptUpdate.save();
      res.send({ message: " Updated", attribute: updatedOptAttribute });
    } else {
      res.status(404).send({ message: "Option Not Found" });
    }
  })
);
export default OptionRouter;
