import express from "express";
import PaymentModel from "../Models/PaymentModel.js";
import { isAuth, isAdmin, isSeller } from "../utils.js";
import upload from "../middleware/image.js";
import expressAsyncHandler from "express-async-handler";
import Grid from "gridfs-stream";
import mongoose from "mongoose";
const PaymentRouter = express.Router();
PaymentRouter.post(
  "/payment",
  isAuth,
  upload.single("logo"),
  async (req, res) => {
    if (req.file === undefined) {
      const generalPaymentSave = new PaymentModel({
        paymentName: req.body.paymentName,
        mode: req.body.mode,
        AppId: req.body.AppId,
        secKey: req.body.secKey,
        checked: req.body.checked,
      });
      const paymentdata = await generalPaymentSave.save();
      res.send({ message: "image Uploaded", savedetails: paymentdata });
    } else {
      const generalPaymentSave = new PaymentModel({
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        path: req.file.path,
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        filename: req.file.filename,
        paymentName: req.body.paymentName,
        mode: req.body.mode,
        AppId: req.body.AppId,
        secKey: req.body.secKey,
        checked: req.body.checked,
      });
      const paymentdata = await generalPaymentSave.save();
      res.send({ message: "image Uploaded", savedetails: paymentdata });
    }
  }
);

PaymentRouter.get(
  "/paylist",
  expressAsyncHandler(async (req, res) => {
    const details = await PaymentModel.find().sort({ createdAt: -1 });
    // console.log(details);
    if (details) {
      res.send(details);
    } else {
      res.status(404).send({ message: "General Settings details Not Found" });
    }
  })
);

PaymentRouter.get(
  "/payshow/:filename",
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

PaymentRouter.put(
  "/updatepay/:id",
  isAuth,
  upload.single("logo"),
  async (req, res) => {
    const paymentUpdateId = req.params.id;

    const payUpdate = await PaymentModel.findById(paymentUpdateId);
    if (req.file === undefined) {
      payUpdate.paymentName = req.body.paymentName;
      payUpdate.mode = req.body.mode;
      payUpdate.AppId = req.body.AppId;
      payUpdate.secKey = req.body.secKey;
      payUpdate.checked = req.body.checked;
      const updatedPayment = await payUpdate.save();
      res.send({ message: " Updated", newPay: updatedPayment });
    } else {
      payUpdate.paymentName = req.body.paymentName;
      payUpdate.mode = req.body.mode;
      payUpdate.AppId = req.body.AppId;
      payUpdate.secKey = req.body.secKey;
      payUpdate.checked = req.body.checked;
      payUpdate.fieldname = req.file.fieldname;
      payUpdate.originalname = req.file.originalname;
      payUpdate.filename = req.file.filename;
      payUpdate.mimetype = req.file.mimetype;
      payUpdate.path = req.file.path;
      // console.log(generalUpdate);
      const updatedPayment = await payUpdate.save();
      res.send({ message: " Updated", newPay: updatedPayment });
    }
  }
);
PaymentRouter.delete(
  "/deletepayment/:id",
  expressAsyncHandler(async (req, res) => {
    const deletepay = await PaymentModel.findById(req.params.id);

    if (deletepay) {
      const deletepay1 = await deletepay.remove();
      res.send({ message: "Attributed Deleted", deleteAtt: deletepay1 });
    } else {
      res.status(404).send({ message: "Payment Details Not Found" });
    }
  })
);

PaymentRouter.put(
  "/activenable/:id",
  expressAsyncHandler(async (req, res) => {
    console.log(req);
    const Id = req.body.id;

    const Attributemaster = await PaymentModel.findById({
      _id: Id,
    });
    if (Attributemaster) {
      if (req.body.deactive === false) {
        Attributemaster.checked = req.body.deactive;
      } else {
        Attributemaster.checked = req.body.active;
      }
      const updatecAtt = await Attributemaster.save();
      console.log("updatecAtt", updatecAtt);
      res.send({ message: "PayUpdated", Enablemaster: updatecAtt });
    }
  })
);

PaymentRouter.put("/checkboxitem/:id", isAuth, async (req, res) => {
  const PaymasterId = req.body.checkboxId;
  let updatepaymaster = [];
  for (let i = 0; i < PaymasterId.length; i++) {
    const paymaster = await PaymentModel.findById({
      _id: PaymasterId[i],
    });

    if (paymaster) {
      if (req.body.checkedshow === true) {
        paymaster.checked = req.body.checkedshow;
      } else {
        paymaster.checked = req.body.checkedhide;
      }
      updatepaymaster = await paymaster.save();
    }
  }
  res.send({ message: "Payment Updated", paymaster: updatepaymaster });
});

PaymentRouter.delete(
  "/deletebulk/:id",
  expressAsyncHandler(async (req, res) => {
    const deletId = req.body.id;
    let deletePayment;
    for (let i = 0; i < deletId.length; i++) {
      const deletepay = await PaymentModel.findById({ _id: deletId[i] });
      deletePayment = await deletepay.remove();
    }
    res.send({ message: "Attributed Deleted", deleteAtt: deletePayment });
  })
);
export default PaymentRouter;
