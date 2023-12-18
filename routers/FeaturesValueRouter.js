import express from "express";
import expressAsyncHandler from "express-async-handler";
import FeaturesValue from "../Models/FeaturesValueModel.js";
import { isAdmin, isAuth, isSeller, isSellerOrAdmin } from "../utils.js";

const FeaturesValueRouter = express.Router();

FeaturesValueRouter.get(
  "/Fvaluelist",
  expressAsyncHandler(async (req, res) => {
    const Featurelist = await FeaturesValue.find();
    // console.log('Featurelist',Featurelist);
    if (Featurelist) {
      res.send(Featurelist);
    } else {
      res.status(404).send({ message: "Featurelist Not Found" });
    }
  })
);

FeaturesValueRouter.get(
  "/featureid/:id",
  expressAsyncHandler(async (req, res) => {
    const Featurelist = await FeaturesValue.find({
      featuretype: req.params.id,
    });
    if (Featurelist) {
      res.send(Featurelist);
    } else {
      res.status(404).send({ message: "Featurelist Not Found" });
    }
  })
);

FeaturesValueRouter.put(
  "/:id",
  isAuth,
  // isSeller,
  // isAdmin,
  // isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const FeaturesId = req.params.id;
    const Featuresupdate = await FeaturesValue.findById(FeaturesId);
    if (Featuresupdate) {
      Featuresupdate.featurevalue = req.body.featurevalue;
      Featuresupdate.featuretype = req.body.featuretype;
      const updatedFeatures = await Featuresupdate.save();
      res.send({ message: " Updated", Features: updatedFeatures });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);
FeaturesValueRouter.post(
  "/",
  isAuth,
  // isSeller,
  // isAdmin,
  // isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const feature = new FeaturesValue({
      featurevalue: req.body.Featurevalue,
      featuretype: req.body.Featuretype,
    });
    const featureCategory = await feature.save();
    res.send({ message: "Product Created", feature: featureCategory });
  })
);

FeaturesValueRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const deleteAttribute = await FeaturesValue.findById(req.params.id);
    if (deleteAttribute) {
      const deleteattributed = await deleteAttribute.remove();
      res.send({ message: "Attributed Deleted", deleteAtt: deleteattributed });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

FeaturesValueRouter.put(
  "/fvaluective/:id",
  isAuth,
  // isAdmin,
  // isSeller,
  async (req, res) => {
    const attributeId = req.body.checkboxId;
    let updatecAtt = [];
    for (let i = 0; i < attributeId.length; i++) {
      const Attributemaster = await FeaturesValue.findById({
        _id: attributeId[i],
      });

      if (Attributemaster) {
        if (req.body.checkedshow == true) {
          Attributemaster.featurevaluecheck = req.body.checkedshow;
        } else {
          Attributemaster.featurevaluecheck = req.body.checkedhide;
        }
        updatecAtt = await Attributemaster.save();
      }
    }
    res.send({ message: "Category Updated", Attmaster: updatecAtt });
  }
);

FeaturesValueRouter.put(
  "/fvalueEnable/:id",
  isAuth,
  // isAdmin,
  // isSeller,
  async (req, res) => {
    const attributeId = req.body.id;

    const Attributemaster = await FeaturesValue.findById({ _id: attributeId });

    if (Attributemaster) {
      if (req.body.active === true) {
        Attributemaster.featurevaluecheck = req.body.active;
      } else {
        Attributemaster.featurevaluecheck = req.body.deactive;
      }
      const updatecAtt = await Attributemaster.save();
      res.send({ message: "Category Updated", updatecAtt });
    }

    // res.send({ message: "Category Updated", Attmaster: updatecAtt });
  }
);

FeaturesValueRouter.delete(
  "/deletemultiple/:id",
  expressAsyncHandler(async (req, res) => {
    const deletId = req.body.id;
    let deleteemploye;
    for (let i = 0; i < deletId.length; i++) {
      const deleteEmploye = await FeaturesValue.findById({ _id: deletId[i] });
      deleteemploye = await deleteEmploye.remove();
    }
    res.send({ message: "Attributed Deleted", deleteAtt: deleteemploye });
  })
);

export default FeaturesValueRouter;
