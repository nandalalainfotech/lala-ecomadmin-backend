import express from "express";
import GeneralModel from "../Models/GeneralModel.js";
import { isAuth, isAdmin, isSeller } from "../utils.js";
import upload from "../middleware/image.js";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Grid from "gridfs-stream";
import shippingModel from "../Models/shippingModel.js";
import SizeGroupModel from "../Models/SizeGroupModel.js";
import summaryModel from "../Models/summaryModel.js";

const GeneralRouter = express.Router();

GeneralRouter.get(
  "/generallist",
  expressAsyncHandler(async (req, res) => {
    // console.log("req", req);
    const Generaldetails = await GeneralModel.find()
      .sort({ createdAt: -1 })

      .limit(1);
    if (Generaldetails) {
      res.send(Generaldetails);
    } else {
      res.status(404).send({ message: "Generaldetails Not Found" });
    }
  })
);
GeneralRouter.get(
  "/generallallist",
  expressAsyncHandler(async (req, res) => {
    const details = await GeneralModel.find().sort({ createdAt: -1 });
    // console.log(details);
    if (details) {
      res.send(details);
    } else {
      res.status(404).send({ message: "General Settings details Not Found" });
    }
  })
);
GeneralRouter.get(
  "/Shipshow/:filename",
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
GeneralRouter.get(
  "/show/:filename",
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

GeneralRouter.post("/", isAuth, upload.single("image"), async (req, res) => {
  if (req.file === undefined) {
    const generalDetailsSave = new GeneralModel({
      name: req.body.name,
      track: req.body.track,
    });
    const brandgeneral = await generalDetailsSave.save();
    res.send({ message: "image Uploaded", savedetails: brandgeneral });
  } else {
    const generalDetailsSave = new GeneralModel({
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      path: req.file.path,
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      filename: req.file.filename,
      name: req.body.name,
      track: req.body.track,
    });
    const brandgeneral = await generalDetailsSave.save();
    res.send({ message: "image Uploaded", savedetails: brandgeneral });
  }
});

GeneralRouter.put(
  "/updategen/:id",
  isAuth,
  upload.single("image"),
  async (req, res) => {
    const generalUpdateId = req.params.id;

    const generalUpdate = await GeneralModel.findById(generalUpdateId);
    if (req.file === undefined) {
      generalUpdate.name = req.body.name;
      generalUpdate.track = req.body.track;
      const updatedGeneral = await generalUpdate.save();
      res.send({ message: " Updated", newgeneral: updatedGeneral });
    } else {
      generalUpdate.name = req.body.name;
      generalUpdate.track = req.body.track;
      generalUpdate.fieldname = req.file.fieldname;
      generalUpdate.originalname = req.file.originalname;
      generalUpdate.filename = req.file.filename;
      generalUpdate.mimetype = req.file.mimetype;
      generalUpdate.path = req.file.path;
      // console.log(generalUpdate);
      const updatedGeneral = await generalUpdate.save();
      res.send({ message: " Updated", newgeneral: updatedGeneral });
    }
  }
);

GeneralRouter.delete(
  "/generalmasterdel/:id",
  isAuth,
  // isAdmin,
  // isSeller,
  expressAsyncHandler(async (req, res) => {
    const generaldatum = await GeneralModel.findById(req.params.id);
    const shipping = await shippingModel.find();
    let objects = [];
    let objects1 = [];
    let objects2 = [];
    for (let i = 0; i < shipping.length; i++) {
      if (generaldatum._id == shipping[i].preId) {
        objects.push(shipping[i]._id);
      }
    }
    const sizeandweight = await SizeGroupModel.find();
    for (let i = 0; i < sizeandweight.length; i++) {
      if (generaldatum._id == sizeandweight[i].preId) {
        objects1.push(sizeandweight[i]._id);
      }
    }

    const summary = await summaryModel.find();
    for (let i = 0; i < summary.length; i++) {
      if (generaldatum._id == summary[i].preId) {
        objects2.push(summary[i]._id);
      }
    }

    if (generaldatum) {
      const shipping1 = await shippingModel.deleteMany({
        _id: { $in: objects },
      });
      const sizeandweight1 = await SizeGroupModel.deleteMany({
        _id: { $in: objects1 },
      });
      const summary1 = await summaryModel.deleteMany({
        _id: { $in: objects2 },
      });
      const deleteProduct = await generaldatum.remove();
      res.send({
        message: "Carrier details Deleted",
        generaldatum: deleteProduct,
      });
    } else {
      res.status(404).send({ message: "Carrier Not Found" });
    }
  })
);

GeneralRouter.put("/checkboxitem/:id", isAuth, async (req, res) => {
  // console.log('req', req);
  const generalmasterId = req.body.checkboxId;
  let updategeneralmaster = [];
  for (let j = 0; j < generalmasterId.length; j++) {
    // console.log('hii');

    const summarymaster = await summaryModel.findById({
      _id: generalmasterId[j],
    });
    // console.log(generalmaster);

    if (summarymaster) {
      if (req.body.checkedshow === true) {
        summarymaster.Checked = req.body.checkedshow;
      } else {
        summarymaster.Checked = req.body.checkedhide;
      }
      updategeneralmaster = await summarymaster.save();
    }
  }

  // console.log(updategeneralmaster);
  res.send({ message: "General Updated", generalmaster: updategeneralmaster });
});

GeneralRouter.put("/updateEnables/:id", isAuth, async (req, res) => {
  // console.log('req', req.body);
  const generalId = req.body.id;
  const generalEnable = await shippingModel.find({ preId: generalId });
  let updatecGeneralEnable;
  for (let i = 0; i < generalEnable.length; i++) {
    const genenable = await shippingModel.findById({
      _id: generalEnable[i]._id,
    });
    if (genenable) {
      if (req.body.active === true) {
        genenable.checked = req.body.active;
      } else if (req.body.active === false) {
        genenable.checked = req.body.active;
      } else {
        genenable.checked = req.body.deactive;
      }
      updatecGeneralEnable = await genenable.save();
    }
  }
  res.send({
    message: "General Enable Updated",
    GeneralEnable: updatecGeneralEnable,
  });
});

GeneralRouter.put("/updateStatusEnables/:id", isAuth, async (req, res) => {
  // console.log('req', req.body);
  const generalId = req.body.id;
  const generalEnabled = await summaryModel.find({ preId: generalId });
  let updatecGeneralStatusEnable;
  for (let i = 0; i < generalEnabled.length; i++) {
    const genenabled = await summaryModel.findById({
      _id: generalEnabled[i]._id,
    });
    if (genenabled) {
      if (req.body.active === true) {
        genenabled.Checked = req.body.active;
      } else if (req.body.active === false) {
        genenabled.Checked = req.body.active;
      } else {
        genenabled.Checked = req.body.deactive;
      }
      updatecGeneralStatusEnable = await genenabled.save();
    }
  }
  res.send({
    message: "General Status Enable Updated",
    GeneralStatusEnable: updatecGeneralStatusEnable,
  });
});

GeneralRouter.delete(
  "/deletemultiple",
  expressAsyncHandler(async (req, res) => {
    // console.log('req', req.body);
    let objects1 = req.body.generalid;
    let objects2 = req.body.shippingid;
    let objects3 = req.body.sizeid;
    let objects4 = req.body.summaryid;
    let select;
    for (let i = 0; i < objects1.length; i++) {
      const generaldata = await GeneralModel.findById({ _id: objects1[i] });
      select = await generaldata.remove();
    }

    for (let i = 0; i < objects4.length; i++) {
      const summarydata = await summaryModel.findById({ _id: objects4[i] });
      select = await summarydata.remove();
    }
    for (let i = 0; i < objects3.length; i++) {
      const sizeandweightdata = await SizeGroupModel.findById({
        _id: objects3[i],
      });
      select = await sizeandweightdata.remove();
    }
    for (let i = 0; i < objects2.length; i++) {
      const shippingdata = await shippingModel.findById({ _id: objects2[i] });
      select = await shippingdata.remove();
    }

    // console.log("select", select);
    res.send({ message: "GeneralMultiple data Deleted", generaldata: select });
  })
);

export default GeneralRouter;
