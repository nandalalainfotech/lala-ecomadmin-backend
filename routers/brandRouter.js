import express from "express";
import expressAsyncHandler from "express-async-handler";
import Grid from "gridfs-stream";
import mongoose from "mongoose";
import upload from "../middleware/image.js";
import Brand from "../Models/brandModel.js";
import { isAuth } from "../utils.js";

const brandRouter = express.Router();

brandRouter.post("/", isAuth, upload.single("image"), async (req, res) => {
  // console.log(req.file);
  if (req.file === undefined) {
    const brand = new Brand({
      name: req.body.name,
      checked: req.body.checked,
      editor: req.body.editor,
      ckeditor: req.body.ckeditor,
    });
    const brandSaved = await brand.save();
    res.send({ message: "image Uploaded", savebrand: brandSaved });
  } else {
    const brand = new Brand({
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      path: req.file.path,
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      filename: req.file.filename,
      name: req.body.name,
      checked: req.body.checked,
      editor: req.body.editor,
      ckeditor: req.body.ckeditor,
    });
    const brandSaved = await brand.save();
    res.send({ message: "image Uploaded", savebrand: brandSaved });
  }
});

brandRouter.get(
  "/allbrand",
  expressAsyncHandler(async (req, res) => {
    const brands = await Brand.find().sort({ createdAt: -1 });
    if (brands) {
      res.send(brands);
    } else {
      res.status(404).send({ message: "Women Product Not Found" });
    }
  })
);

brandRouter.get(
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

brandRouter.get(
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

brandRouter.put("/:id", isAuth, upload.single("image"), async (req, res) => {
  // console.log(req);
  if (req.file === undefined) {
    const brandUpdateId = req.params.id;
    const brandUpdate = await Brand.findById(brandUpdateId);
    if (brandUpdate) {
      brandUpdate.name = req.body.name;
      brandUpdate.editor = req.body.editor;
      brandUpdate.ckeditor = req.body.ckeditor;
      brandUpdate.checked = req.body.checked;

      const updatedBrand = await brandUpdate.save();
      res.send({ message: " Updated", newbrand: updatedBrand });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  } else {
    const brandUpdateId = req.params.id;
    const brandUpdate = await Brand.findById(brandUpdateId);
    if (brandUpdate) {
      brandUpdate.name = req.body.name;
      brandUpdate.editor = req.body.editor;
      brandUpdate.ckeditor = req.body.ckeditor;
      brandUpdate.checked = req.body.checked;
      brandUpdate.fieldname = req.file.fieldname;
      brandUpdate.originalname = req.file.originalname;
      brandUpdate.filename = req.file.filename;
      brandUpdate.mimetype = req.file.mimetype;
      brandUpdate.path = req.file.path;
      const updatedBrand = await brandUpdate.save();
      res.send({ message: " Updated", newbrand: updatedBrand });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  }
});

brandRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const deleteBrand = await Brand.findById(req.params.id);
    if (deleteBrand) {
      const brandDeleted = await deleteBrand.remove();
      res.send({ message: "Brand Deleted", deleteBrand: brandDeleted });
    } else {
      res.status(404).send({ message: "Brand Not Found" });
    }
  })
);

brandRouter.put("/checkboxitem/:id", isAuth, async (req, res) => {
  const categorymasterId = req.body.checkboxId;
  let updatecategorymaster = [];
  for (let i = 0; i < categorymasterId.length; i++) {
    const categorymaster = await Brand.findById({
      _id: categorymasterId[i],
    });

    if (categorymaster) {
      if (req.body.checkedshow === true) {
        categorymaster.checked = req.body.checkedshow;
      } else {
        categorymaster.checked = req.body.checkedhide;
      }
      updatecategorymaster = await categorymaster.save();
    }
  }
  res.send({
    message: "Category Updated",
    categorymaster: updatecategorymaster,
  });
});

brandRouter.put("/updateEnable/:id", isAuth, async (req, res) => {
  const attributeId = req.body.id;

  const Attributemaster = await Brand.findById({ _id: attributeId });

  if (Attributemaster) {
    if (req.body.active === true) {
      Attributemaster.checked = req.body.active;
    } else {
      Attributemaster.checked = req.body.deactive;
    }
    const updatecAtt = await Attributemaster.save();
    res.send({ message: "Category Updated", Attmaster: updatecAtt });
  }

  // res.send({ message: "Category Updated", Attmaster: updatecAtt });
});

brandRouter.delete(
  "/deletemultiple/:id",
  expressAsyncHandler(async (req, res) => {
    const deletId = req.body.id;
    let deleteemploye;
    for (let i = 0; i < deletId.length; i++) {
      const deleteEmploye = await Brand.findById({ _id: deletId[i] });
      deleteemploye = await deleteEmploye.remove();
    }
    res.send({ message: "Attributed Deleted", deleteAtt: deleteemploye });
  })
);

export default brandRouter;
