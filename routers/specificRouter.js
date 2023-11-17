import express from "express";
import expressAsyncHandler from "express-async-handler";
import specifiCombination from "../Models/specificComModel.js";
import specificModel from "../Models/specificModel.js";
const specificRouter = express.Router();
specificRouter.post(
  "/specificPrice",
  expressAsyncHandler(async (req, res) => {
    // let newCom;
    let newComItem;

    const spePriceDetail = new specificModel({
      mprodId: req.body.mprodId,
      StartingDate: req.body.StartingDate,
      EndDate: req.body.EndDate,
      Count: req.body.Count,
      discount: req.body.discount,
      TypeOfDiscount: req.body.TypeOfDiscount,
    });
    const newCom = await spePriceDetail.save();
    if (newCom) {
      for (let i = 0; i < req.body.combination.length; i++) {
        const spePrice = new specifiCombination({
          scomid: req.body.combination[i].id,
          scomname: req.body.combination[i].atributename,
          scomvalue: req.body.combination[i].atributevalue,
          sCombiId: newCom._id,
        });
        newComItem = spePrice.save();
      }
    }

    res.send({
      message: "Specific Price details Added",
      category: newCom,
    });
    res.send({
      message: "Specific Price details Added",
      category: newComItem,
    });
  })
);

specificRouter.get(
  "/gridList",
  expressAsyncHandler(async (req, res) => {
    // console.log('req', req);
    const details = await specificModel.find();
    if (details) {
      res.send(details);
    } else {
      res.status(404).send({ message: " Specific Product Details Not Found" });
    }
  })
);

specificRouter.get(
  "/specificList",
  expressAsyncHandler(async (req, res) => {
    // console.log('req', req);
    const pricedetails = await specificModel.find();
    if (pricedetails) {
      res.send(pricedetails);
    } else {
      res.status(404).send({ message: " Specific Product Details Not Found" });
    }
  })
);

specificRouter.delete(
  "/deleteSpecifics/:id",
  expressAsyncHandler(async (req, res) => {
    const deleteSpecific = await specificModel.findById(req.params.id);
    if (deleteSpecific) {
      const deleteSpecific1 = await deleteSpecific.remove();
      res.send({ message: "Attribute Deleted", deleteAtt: deleteSpecific1 });
    } else {
      res.status(404).send({ message: "Specific Price  Details Not Found" });
    }
  })
);

specificRouter.put(
  "/updateSpecific/:id",

  expressAsyncHandler(async (req, res) => {
    const Id = req.body._id;
    const specificPriceUpdate = await specificModel.findById(Id);
    if (specificPriceUpdate) {
      specificPriceUpdate.StartingDate = req.body.StartingDate;
      specificPriceUpdate.EndDate = req.body.EndDate;
      specificPriceUpdate.Count = req.body.Count;
      specificPriceUpdate.discount = req.body.discount;
      specificPriceUpdate.TypeOfDiscount = req.body.TypeOfDiscount;
      specificPriceUpdate.combination = req.body.combination;

      const updatedpriceAttribute = await specificPriceUpdate.save();
      res.send({ message: " Updated", attribute: updatedpriceAttribute });
    } else {
      res.status(404).send({ message: "Specific price  Not Found" });
    }
  })
);

export default specificRouter;
