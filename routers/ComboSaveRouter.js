import express from "express";
import expressAsyncHandler from "express-async-handler";
import ComboSaveModel from "../Models/ComboSaveModel.js";

const ComboSaveRouter = express.Router();
ComboSaveRouter.post(
  "/combo",
  expressAsyncHandler(async (req, res) => {
    // console.log("req", req);
    const Combodetails = new ComboSaveModel({
      id: req.body.id,
      Cost: req.body.Cost,
      taxexclude: req.body.taxexclude,
      taxinclude: req.body.taxinclude,
      finalPrice: req.body.finalPrice,
      qty: req.body.qty,
    });
    const SaveCombo = await Combodetails.save();
    res.send({ message: "Combo Saved", category: SaveCombo });
  })
);

ComboSaveRouter.put(
  "/updateCombo/:id",
  expressAsyncHandler(async (req, res) => {
    // console.log('req',res);
    const Id = req.params.id;
    const comboUpdate = await ComboSaveModel.findById(Id);
    if (comboUpdate) {
      comboUpdate.Cost = req.body.Cost;
      comboUpdate.taxexclude = req.body.taxexclude;
      comboUpdate.taxinclude = req.body.taxinclude;
      comboUpdate.finalPrice = req.body.finalPrice;
      comboUpdate.qty = req.body.qty;
      const updatecombo = await comboUpdate.save();
      // console.log('updatedAttribute', updatedTaxes);
      res.send({ message: " Updated", combodetail: updatecombo });
    } else {
      res.status(404).send({ message: "Combination Not Found" });
    }
  })
);

export default ComboSaveRouter;
