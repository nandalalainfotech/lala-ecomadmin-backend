import express from "express";
import expressAsyncHandler from "express-async-handler";
import Features from "../Models/FeaturesModel.js";
import { isAdmin, isAuth, isSeller, isSellerOrAdmin } from "../utils.js";
import FeaturesValue from "../Models/FeaturesValueModel.js";

const FeaturesRouter = express.Router();

FeaturesRouter.get(
  "/Flist",
  expressAsyncHandler(async (req, res) => {
    const Featurelist = await Features.find().sort({ createdAt: -1 });
    if (Featurelist) {
      res.send(Featurelist);
    } else {
      res.status(404).send({ message: "Featurelist Not Found" });
    }
  })
);

FeaturesRouter.put(
  "/:id",
  isAuth,
  // isSeller,
  // isAdmin,
  // isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const FeaturesId = req.params.id;
    const Featuresupdate = await Features.findById(FeaturesId);
    if (Featuresupdate) {
      Featuresupdate.featurename = req.body.featurename;
      const updatedFeatures = await Featuresupdate.save();
      res.send({ message: " Updated", Features: updatedFeatures });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

FeaturesRouter.post(
  "/",
  isAuth,
  // isSeller,
  // isAdmin,
  // isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const feature = new Features({
      featurename: req.body.Featurename,
    });
    const featureCategory = await feature.save();
    res.send({ message: "Product Created", feature: featureCategory });
  })
);

FeaturesRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const deleteAttribute = await Features.findById(req.params.id);
    if (deleteAttribute) {
      const deleteattributed = await deleteAttribute.remove();
      res.send({ message: "Attributed Deleted", deleteAtt: deleteattributed });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

FeaturesRouter.put(
  "/featureactive/:id",
  isAuth,
  // isAdmin,
  // isSeller,
  expressAsyncHandler(async (req, res) => {
    const attributeId = req.body.checkboxId;
    let updatecAtt = [];
    for (let i = 0; i < attributeId.length; i++) {
      const Attributemaster = await Features.findById({ _id: attributeId[i] });

      if (Attributemaster) {
        if (req.body.checkedshow === true) {
          Attributemaster.featurecheck = req.body.checkedshow;
        } else {
          Attributemaster.featurecheck = req.body.checkedhide;
        }
        updatecAtt = await Attributemaster.save();
      }
    }
    res.send({ message: "Category Updated", Attmaster: updatecAtt });
  })
);

FeaturesRouter.put(
  "/featureEnable/:id",
  isAuth,
  // isAdmin,
  // isSeller,
  expressAsyncHandler(async (req, res) => {
    const attributeId = req.body.id;

    const Attributemaster = await Features.findById({ _id: attributeId });

    if (Attributemaster) {
      if (req.body.active === true) {
        Attributemaster.featurecheck = req.body.active;
      } else {
        Attributemaster.featurecheck = req.body.deactive;
      }
      const updatecAtt = await Attributemaster.save();
      res.send({ message: "Category Updated", Attmaster: updatecAtt });
    }

    // res.send({ message: "Category Updated", Attmaster: updatecAtt });
  })
);

FeaturesRouter.delete(
  "/deletemultiple/:id",
  expressAsyncHandler(async (req, res) => {
    let featurevalue = [];
    let deleteEmploye;
    let select1;

    for (let i = 0; i < req.body.id.length; i++) {
      deleteEmploye = await Features.findById({ _id: req.body.id[i] });
      featurevalue.push(deleteEmploye._id);
      // console.log("deleteEmploye=======>", deleteEmploye)
    }

    for (let i = 0; i < featurevalue.length; i++) {
      let deleteEmploy = await FeaturesValue.find({
        featuretype: featurevalue[i],
      });
      // console.log("deleteEmploy==========>", deleteEmploy)
      for (let j = 0; j < deleteEmploy.length; j++) {
        let deleteEmploy11 = await FeaturesValue.findById({
          _id: deleteEmploy[j]._id,
        });
        let select = await deleteEmploy11.remove();
        // console.log(" deleteEmploy11 ========>", deleteEmploy11)
      }
    }
    for (let i = 0; i < req.body.id.length; i++) {
      deleteEmploye = await Features.findById({ _id: req.body.id[i] });
      select1 = await deleteEmploye.remove();
      // console.log("deleteEmploye=========>", deleteEmploye)
    }
    res.send({ message: "MultipleFeature Deleted", generaldata: select1 });
  })
);

export default FeaturesRouter;
