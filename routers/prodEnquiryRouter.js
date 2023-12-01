import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import ProdEnquiry from '../Models/prodEnquiryModel.js';
import NotificationProduct from '../Models/notificationModel.js';
import nodemailer from "nodemailer";

const productEnquiryRouter = express.Router();

productEnquiryRouter.post("/", expressAsyncHandler(async (req, res) => {


  const productEnquiry = ProdEnquiry({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    phone: req.body.phone,
    reqmessage: req.body.reqmessage,
    productId: req.body.productId,
  });
  const productEnquirySaved = await productEnquiry.save();
  res.send({ message: "Product Enquiry Saved", productEnquiry: productEnquirySaved });
})
);

productEnquiryRouter.get('/enquiryList', expressAsyncHandler(async (req, res) => {
  const prodEnq = await ProdEnquiry.find();
  if (prodEnq) {
    res.send(prodEnq);
  } else {
    res.status(404).send({ message: 'Women Product Not Found' });
  }
}));

productEnquiryRouter.get(
  "/notification",
  expressAsyncHandler(async (req, res) => {
    const notifications = await NotificationProduct.find();
    if (notifications) {
      res.send(notifications);
    } else {
      res.send({ message: "No Notifications" });
    }
  }),
);

productEnquiryRouter.delete(
  "/clear",
  expressAsyncHandler(async (req, res) => {
    const deletId = req.body;
    let deleteemploye;
    for (let i = 0; i < deletId.length; i++) {
      const deleteEmploye = await NotificationProduct.findById({
        _id: deletId[i],
      });
      deleteemploye = await deleteEmploye.remove();
    }
    res.send({ message: "Clearall Notifications", deleteAtt: deleteemploye });
  }),
);

productEnquiryRouter.get(
  "/notification",
  expressAsyncHandler(async (req, res) => {
    const notifications = await NotificationProduct.find();
    if (notifications) {
      res.send(notifications);
    } else {
      res.send({ message: "No Notifications" });
    }
  }),
);

productEnquiryRouter.post(
  "/enquiryresponce",
  expressAsyncHandler(async (req, res) => {
    const name = req.body.fname;
    const email = req.body.email;
    const message = req.body.reqmessage;
    if (email) {
      var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        service: "gmail",
        auth: {
          user: process.env.SENDER_EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      var mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Enquiry Details",
        html: `<div><h1>Hi ${name},</h1><h2>Thanks to using our E-commerce Application</h2><h2></br></br>${message}</h2>
      </div>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        console.log("mailOptions", mailOptions);
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
        res.send({ message: "Otp Sent Sucess" });
      });
    } else {
      res.send({ message: "Email Not Found" });
    }
  }),
);

productEnquiryRouter.delete(
  "/enquiryList/:delId",
  expressAsyncHandler(async (req, res) => {
    const deleteEnquiry = await ProdEnquiry.findById(req.params.delId);
    if (deleteEnquiry) {
      const deleteCustomer1 = await deleteEnquiry.remove();
      res.send({
        message: "Product Enquiry Deleted",
      });
    } else {
      res.status(404).send({ message: "Product Enquiry Not Found" });
    }
  }),
);

export default productEnquiryRouter;