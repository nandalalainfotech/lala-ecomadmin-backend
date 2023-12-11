import express from "express";
import expressAsyncHandler from "express-async-handler";
import TaxesModel from "../Models/TaxesModel.js";
import { isAdmin, isAuth, isSeller } from "../utils.js";

const TaxesRouter = express.Router();

TaxesRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const taxes = await TaxesModel.find().sort({ createdAt: -1 });
    res.send({ taxes });
  })
);

TaxesRouter.post(
  "/taxes",
  expressAsyncHandler(async (req, res) => {
    const TaxesDetailsSave = new TaxesModel({
      Name: req.body.Name,
      Rate: req.body.Rate,
      checked: req.body.checked,
    });
    const createdtaxes = await TaxesDetailsSave.save();
    res.send({ message: "Taxes Added", category: createdtaxes });
  })
);

TaxesRouter.delete(
  "/:id",
  isAuth,
  // isAdmin,
  // isSeller,
  expressAsyncHandler(async (req, res) => {
    const taxes = await TaxesModel.findById(req.params.id);
    if (taxes) {
      const deleteProduct = await taxes.remove();
      res.send({ message: "Taxes Deleted", taxes: deleteProduct });
    } else {
      res.status(404).send({ message: "Taxes Not Found" });
    }
  })
);

TaxesRouter.put(
  "/updateTaxes/:id",

  expressAsyncHandler(async (req, res) => {
    // console.log(req);
    const Id = req.params.id;
    const taxUpdate = await TaxesModel.findById(Id);
    if (taxUpdate) {
      taxUpdate.Name = req.body.Name;
      taxUpdate.Rate = req.body.Rate;
      taxUpdate.checked = req.body.checked;
      const updatedTaxes = await taxUpdate.save();
      // console.log('updatedAttribute', updatedTaxes);
      res.send({ message: " Updated", taxdetail: updatedTaxes });
    } else {
      res.status(404).send({ message: "Taxes Not Found" });
    }
  })
);

TaxesRouter.put(
  "/enable/:id",
  isAuth,
  // isAdmin,
  // isSeller,
  expressAsyncHandler(async (req, res) => {
    const enableId = req.body.id;

    const taxEnable = await TaxesModel.findById(enableId);

    if (taxEnable) {
      if (req.body.active === true) {
        taxEnable.checked = req.body.active;
      } else {
        taxEnable.checked = req.body.deactive;
      }
      const updatecTaxEnable = await taxEnable.save();
      res.send({ message: "Tax Enable Updated", TaxEnable: updatecTaxEnable });
    }
  })
);

TaxesRouter.put("/checkboxitem/:id", isAuth, async (req, res) => {
  const taxmasterId = req.body.checkboxId;
  let updatetaxmaster = [];
  for (let i = 0; i < taxmasterId.length; i++) {
    const taxesmaster = await TaxesModel.findById({
      _id: taxmasterId[i],
    });

    if (taxesmaster) {
      if (req.body.checkedshow === true) {
        taxesmaster.checked = req.body.checkedshow;
      } else {
        taxesmaster.checked = req.body.checkedhide;
      }
      updatetaxmaster = await taxesmaster.save();
    }
  }
  res.send({ message: "Taxes Updated", taxmaster: updatetaxmaster });
});

TaxesRouter.delete(
  "/deletemultiple/:id",
  expressAsyncHandler(async (req, res) => {
    const deletId = req.body.id;
    let deletetax;
    for (let i = 0; i < deletId.length; i++) {
      const deleteTaxes = await TaxesModel.findById({ _id: deletId[i] });
      deletetax = await deleteTaxes.remove();
    }
    res.send({ message: "Attributed Deleted", deleteAtt: deletetax });
  })
);
export default TaxesRouter;
