import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth, isSeller, isSellerOrAdmin } from "../utils.js";
import upload from "../middleware/image.js";
import AttributeValue from "../Models/AttributeValueModel.js";
import mongoose from "mongoose";
import Grid from "gridfs-stream";
import Attribute from "../Models/AttributeModule.js";
import Attributeall from "../Models/AttributeallModel.js";

const AttributeValueRouter = express.Router();

AttributeValueRouter.get(
  "/Attributevalue",
  expressAsyncHandler(async (req, res) => {
    const Attributelist = await AttributeValue.find().sort({ createdAt: -1 });
    if (Attributelist) {
      res.send(Attributelist);
    } else {
      res.status(404).send({ message: "Attributelist Not Found" });
    }
  })
);

AttributeValueRouter.get(
  "/Attributevalueall",
  expressAsyncHandler(async (req, res) => {
    const Attributelist = await Attributeall.find().sort({ createdAt: -1 });
    if (Attributelist) {
      res.send(Attributelist);
    } else {
      res.status(404).send({ message: "Attributelist Not Found" });
    }
  })
);
AttributeValueRouter.post(
  "/",
  isAuth,
  upload.single("image"),
  async (req, res) => {
    if (req.file === undefined) {
      const attribute = await Attribute.findById({
        _id: req.body.attributeVlaue,
      });
      let categorys = await Attributeall.findById({ _id: attribute.nameallid });

      let Attri = await AttributeValue.find({
        attributename: categorys.nameall,
      });
      // console.log("categorys--------->", Attri)
      // console.log("Attri", Attri);
      if (Attri.length > 0) {
        const AttriValue = new AttributeValue({
          allId: Attri[0]._id,
          attributeVlaue: req.body.attributeVlaue,
          value: req.body.value,
          color: req.body.color,
          attributename: attribute.attributename,
        });
        const AttriValueUploaded = await AttriValue.save();
        res.send({ message: "image Uploaded", image: AttriValueUploaded });
      } else {
        const AttriValue1 = new AttributeValue({
          allId: categorys._id,
          attributeVlaue: req.body.attributeVlaue,
          value: "Select All",
          color: req.body.color,
          attributename: categorys.nameall,
        });
        const AttriValue = new AttributeValue({
          allId: AttriValue1._id,
          attributeVlaue: req.body.attributeVlaue,
          value: req.body.value,
          color: req.body.color,
          attributename: attribute.attributename,
        });
        const AttriValueUploaded1 = await AttriValue1.save();
        const AttriValueUploaded = await AttriValue.save();
        res.send({ message: "image Uploaded", image: AttriValueUploaded });
      }
    } else {
      const attribute = await Attribute.findById({
        _id: req.body.attributeVlaue,
      });
      const categorys = await Attributeall.findById({
        _id: attribute.nameallid,
      });
      const AttriValue = new AttributeValue({
        allId: categorys._id,
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        path: req.file.path,
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        filename: req.file.filename,
        attributeVlaue: req.body.attributeVlaue,
        value: req.body.value,
        color: req.body.color,
        attributename: attribute.attributename,
      });
      const AttriValueUploaded = await AttriValue.save();
      res.send({ message: "image Uploaded", image: AttriValueUploaded });
    }
  }
);

AttributeValueRouter.get(
  "/view/:filename",
  expressAsyncHandler(async (req, res) => {
    const filename = req.params.filename;
    const conn = mongoose.connection;
    var gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
    gfs.files.find({ filename: filename }).toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }
      var bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
      });
      var readstream = bucket.openDownloadStreamByName(filename);
      return readstream.pipe(res);
    });
  })
);

AttributeValueRouter.put(
  "/update/:id",
  isAuth,
  upload.single("image"),
  async (req, res) => {
    if (req.file === undefined) {
      const brandUpdateId = req.params.id;
      const brandUpdate = await AttributeValue.findById(brandUpdateId);

      if (brandUpdate) {
        brandUpdate.value = req.body.value;
        brandUpdate.attributeVlaue = req.body.attributeVlaue;
        const updatedBrand = await brandUpdate.save();
        res.send({ message: " Updated", newbrand: updatedBrand });
      } else {
        res.status(404).send({ message: "Product Not Found" });
      }
    } else {
      const brandUpdateId = req.params.id;
      const brandUpdate = await AttributeValue.findById(brandUpdateId);

      if (brandUpdate) {
        brandUpdate.value = req.body.value;
        brandUpdate.attributeVlaue = req.body.attributeVlaue;
        brandUpdate.fieldname = req.file.fieldname;
        brandUpdate.originalname = req.file.originalname;
        brandUpdate.filename = req.file.filename;
        brandUpdate.mimetype = req.file.mimetype;
        const updatedBrand = await brandUpdate.save();
        res.send({ message: " Updated", newbrand: updatedBrand });
      } else {
        res.status(404).send({ message: "Product Not Found" });
      }
    }
  }
);

AttributeValueRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const deleteAttribute = await AttributeValue.findById(req.params.id);
    if (deleteAttribute) {
      const deleteattributed = await deleteAttribute.remove();
      // const categorys = await AttriValue.remove();
      res.send({ message: "Attributed Deleted", deleteAtt: deleteattributed });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

AttributeValueRouter.put(
  "/attvalueactive/:id",
  isAuth,
  // isAdmin,
  // isSeller,
  async (req, res) => {
    // console.log("req", req);
    const attributeId = req.body.checkboxId;
    let updatecAtt = [];
    for (let i = 0; i < attributeId.length; i++) {
      const Attributemaster = await AttributeValue.findById({
        _id: attributeId[i],
      });

      if (Attributemaster) {
        if (req.body.checkedshow === true) {
          Attributemaster.attvaluecheck = req.body.checkedshow;
        } else {
          Attributemaster.attvaluecheck = req.body.checkedhide;
        }
        updatecAtt = await Attributemaster.save();
      }
    }
    res.send({ message: "Category Updated", Attmaster: updatecAtt });
  }
);

AttributeValueRouter.put(
  "/attvalueupdate/:id",
  isAuth,
  // isAdmin,
  // isSeller,
  async (req, res) => {
    // console.log("req", req);
    const attributeId = req.body.id;

    const Attributemaster = await AttributeValue.findById({ _id: attributeId });

    if (Attributemaster) {
      if (req.body.active === true) {
        Attributemaster.attvaluecheck = req.body.active;
      } else {
        Attributemaster.attvaluecheck = req.body.deactive;
      }
      const updatecAtt = await Attributemaster.save();
      res.send({ message: "Category Updated", Attmaster: updatecAtt });
    }

    // res.send({ message: "Category Updated", Attmaster: updatecAtt });
  }
);

AttributeValueRouter.delete(
  "/deletemultiple/:id",
  expressAsyncHandler(async (req, res) => {
    const deletId = req.body.id;
    let deleteemploye;
    for (let i = 0; i < deletId.length; i++) {
      const deleteEmploye = await AttributeValue.findById({ _id: deletId[i] });
      deleteemploye = await deleteEmploye.remove();
    }
    res.send({ message: "Attributed Deleted", deleteAtt: deleteemploye });
  })
);

export default AttributeValueRouter;
