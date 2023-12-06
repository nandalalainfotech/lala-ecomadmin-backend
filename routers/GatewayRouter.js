import Razorpay from "razorpay";
import express from "express";
import expressAsyncHandler from "express-async-handler";
import GatewayModel from "../Models/GatewayModel.js";
import OrderrModel from "../Models/OrderrModel.js";
import nodemailer from "nodemailer";
const GatewayRouter = express.Router();

// GatewayRouter.post(
//   "/sendmail/:id",
//   expressAsyncHandler(async (req, res) => {
//     // console.log(req);
//     var transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 465,
//       secure: true,
//       service: "gmail",
//       auth: {
//         user: process.env.SENDER_EMAIL,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });
//     var mailOptions = {
//       from: process.env.SENDER_EMAIL,
//       to: "umamaheswari@nandalalainfotech.com",
//       subject: "Payment Success",
//       text: "Your Payment was Successfull",
//     };
//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Email sent: " + info.response);
//       }
//     });
//   })
// );

GatewayRouter.get(
  "/get-razorpay-key",
  expressAsyncHandler(async (req, res) => {
    res.send({ key: process.env.RAZORPAY_KEY_ID });
  })
);

GatewayRouter.post(
  "/create-order",
  expressAsyncHandler(async (req, res) => {
    try {
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
      });
      const options = {
        amount: req.body.amount,
        currency: "INR",
      };
      const order = await instance.orders.create(options);
      if (!order) return res.status(500).send("Some error occured");
      res.send(order);
    } catch (error) {
      res.status(500).send(error);
    }
  })
);

GatewayRouter.post(
  "/pay-order",
  expressAsyncHandler(async (req, res) => {
    let usermail = req.body.email;
    console.log("req---------------->", req);
    console.log("res----------->", res);
    try {
      const {
        amount,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
        email,
      } = req.body;

      const newOrder = await GatewayModel({
        isPaid: true,
        amount: amount,
        razorpay: {
          email: email,
          orderId: razorpayOrderId,
          paymentId: razorpayPaymentId,
          signature: razorpaySignature,
        },
      });
      await newOrder.save();
      console.log("usermail", usermail);
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
        to: usermail,
        subject: "Payment Success",
        text: "Your Payment was Successfull",
        attachments : [
          {
            __filename:"sample.pdf",
            path: "./image/sample.pdf",
          }
        ]
      };

      transporter.sendMail(mailOptions, function (error, info) {
        console.log("mailOptions", mailOptions);
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.send({
        msg: "Payment was successfull",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  })
);

GatewayRouter.get(
  "/list-orders",
  expressAsyncHandler(async (req, res) => {
    const orders = await GatewayModel.find();
    res.send(orders);
  })
);

export default GatewayRouter;
