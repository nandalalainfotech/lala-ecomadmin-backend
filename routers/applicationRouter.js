import express from 'express';
import AppSetting from '../Models/applicationModel.js';
import { isAuth } from '../utils.js';
import upload from "../middleware/image.js";
import Grid from 'gridfs-stream';
import mongoose from 'mongoose';
import expressAsyncHandler from 'express-async-handler';

const applicationRouter = express.Router();

applicationRouter.post('/', isAuth, upload.single('image'), (async(req, res) => {

    const appSetting = new AppSetting({
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        path: req.file.path,
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        filename: req.file.filename,
        name: req.body.name,
    });
    const appSettingUploaded = await appSetting.save();
    res.send({ message: 'image Uploaded', image: appSettingUploaded });
}));

applicationRouter.get('/appList', expressAsyncHandler(async(req, res) => {
    const app = await AppSetting.find().sort({createdAt: -1});

    if (app) {
        res.send(app);
    } else {
        res.status(404).send({ message: 'Women Product Not Found' });
    }
}));

applicationRouter.get('/show/:filename', expressAsyncHandler(async(req, res) => {
    const filename = req.params.filename;
    const conn = mongoose.connection;
    var gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads')
    gfs.files.find({ filename: filename }).toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: "no files exist"
            });
        }
        var bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: 'uploads',
        })
        var readstream = bucket.openDownloadStreamByName(filename);
        return readstream.pipe(res);
    });
}));

applicationRouter.delete(
    "/deleteapp/:id",
    expressAsyncHandler(async (req, res) => {
      const deleteApp = await AppSetting.findById(req.params.id);
      if (deleteApp) {
        const deletenewApp = await deleteApp.remove();
        res.send({ message: "Attributed Deleted", deleteAtt: deletenewApp });
      } else {
        res.status(404).send({ message: "Product Not Found" });
      }
    })
  );

applicationRouter.put(
    "/updateEnable/:id",
    isAuth,
    async (req, res) => {
        // console.log("req",req);
      const attributeId = req.body.id;
  
      const Attributemaster = await AppSetting.findById({ _id: attributeId });
  
      if (Attributemaster) {
        if (req.body.active === true) {
          Attributemaster.active = req.body.active;
        } else {
          Attributemaster.active = req.body.deactive;
        }
        const updatecAtt = await Attributemaster.save();
        res.send({ message: "Category Updated", Attmaster: updatecAtt });
      }
  
    //   res.send({ message: "Category Updated", Attmaster: updatecAtt });
    }
  );

export default applicationRouter;