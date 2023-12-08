import express from "express";
import expressAsyncHandler from "express-async-handler";
import Attribute from "../Models/AttributeModule.js";
import { isAdmin, isAuth, isSeller, isSellerOrAdmin } from "../utils.js";
import Attributeall from "../Models/AttributeallModel.js";
import AttributeValue from "../Models/AttributeValueModel.js";

const AttributeRouter = express.Router();

AttributeRouter.get(
  "/Attributemaster",
  expressAsyncHandler(async (req, res) => {
    const Attributelist = await Attribute.find().sort({ createdAt: -1 });
    if (Attributelist) {
      res.send(Attributelist);
    } else {
      res.status(404).send({ message: "Attributelist Not Found" });
    }
  })
);

AttributeRouter.put(
  "/:id",
  isAuth,
  // isSeller,
  // isAdmin,
  // isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const attributeId = req.params.id;
    const attributeupdate = await Attribute.findById(attributeId);
    if (attributeupdate) {
      attributeupdate.attributename = req.body.attributename;
      attributeupdate.attributetype = req.body.attributetype;
      const updatedAttribute = await attributeupdate.save();
      res.send({ message: " Updated", attribute: updatedAttribute });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

AttributeRouter.post(
  "/",
  isAuth,
  // isSeller,
  // isAdmin,
  // isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const categorys = new Attributeall({
      nameall: req.body.name + "" + "All",
      attributename: req.body.name,
    });
    const createdCategorys = await categorys.save();
    const category = new Attribute({
      nameallid: categorys._id,
      attributename: req.body.name,
      attributetype: req.body.attributestype,
    });
    const createdCategory = await category.save();
    res.send({ message: "Product Created", category: createdCategory });
  })
);

AttributeRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const deleteAttribute = await Attribute.findById(req.params.id);
    if (deleteAttribute) {
      const deleteattributed = await deleteAttribute.remove();
      res.send({ message: "Attributed Deleted", deleteAtt: deleteattributed });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

AttributeRouter.put(
  "/attactive/:id",
  isAuth,
  // isAdmin,
  // isSeller,
  expressAsyncHandler(
  async (req, res) => {
    const attributeId = req.body.checkboxId;
    let updatecAtt = [];
    for (let i = 0; i < attributeId.length; i++) {
      const Attributemaster = await Attribute.findById({ _id: attributeId[i] });

      if (Attributemaster) {
        if (req.body.checkedshow === true) {
          Attributemaster.attributecheck = req.body.checkedshow;
        } else {
          Attributemaster.attributecheck = req.body.checkedhide;
        }
        updatecAtt = await Attributemaster.save();
      }
    }
    res.send({ message: "Category Updated", Attmaster: updatecAtt });
  })
);

AttributeRouter.put(
  "/attEnable/:id",
  isAuth,
  // isAdmin,
  // isSeller,
  expressAsyncHandler(
  async (req, res) => {
    const attributeId = req.body.id;

    const Attributemaster = await Attribute.findById({ _id: attributeId });

    if (Attributemaster) {
      if (req.body.active === true) {
        Attributemaster.attributecheck = req.body.active;
      } else {
        Attributemaster.attributecheck = req.body.deactive;
      }
      const updatecAtt = await Attributemaster.save();
      res.send({ message: "Category Updated", Attmaster: updatecAtt });
    }

    // res.send({ message: "Category Updated", Attmaster: updatecAtt });
  })
);

AttributeRouter.delete(
  "/deletemultiple/:id",
  expressAsyncHandler(async (req, res) => {
    let attrivalue = [];
    let deleteEmploye;
    let select1;
    for (let i = 0; i < req.body.id.length; i++) {
      deleteEmploye = await Attribute.findById({ _id: req.body.id[i] });
      attrivalue.push(deleteEmploye._id);
      // console.log(deleteEmploye)
    }

    for (let i = 0; i < attrivalue.length; i++) {
      let deleteEmploy = await AttributeValue.find({
        attributeVlaue: attrivalue[i],
      });
      // console.log("attrivalue", deleteEmploy)
      for (let j = 0; j < deleteEmploy.length; j++) {
        let deleteEmploy11 = await AttributeValue.findById({
          _id: deleteEmploy[j]._id,
        });
        let select = await deleteEmploy11.remove();
      }
    }
    for (let i = 0; i < req.body.id.length; i++) {
      const deleteEmploye = await Attribute.findById({ _id: req.body.id[i] });
      select1 = await deleteEmploye.remove();
      // console.log(deleteEmploye)
    }
    res.send({ message: "MultipleAttribute Deleted", generaldata: select1 });
  })
);

export default AttributeRouter;
