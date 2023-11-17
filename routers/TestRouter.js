import Razorpay from "razorpay";
import express from "express";
import expressAsyncHandler from "express-async-handler";
import TestModel from "../Models/TestModel.js";
const TestRouter = express.Router();

// const Order = mongoose.model("Ordertests", OrderSchema);

TestRouter.get(
  "/get-razorpay-key",
  expressAsyncHandler(async (req, res) => {
    res.send({ key: process.env.RAZORPAY_KEY_ID });
  })
);

TestRouter.post(
  "/create-order",
  expressAsyncHandler(async (req, res) => {
    console.log("req------------->>", req);
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

TestRouter.post(
  "/pay-order",
  expressAsyncHandler(async (req, res) => {
    try {
      const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
        req.body;
      const newOrder = TestModel({
        isPaid: true,
        amount: amount,
        razorpay: {
          orderId: razorpayOrderId,
          paymentId: razorpayPaymentId,
          signature: razorpaySignature,
        },
      });
      await newOrder.save();
      res.send({
        msg: "Payment was successfull",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  })
);

TestRouter.get(
  "/list-orders",
  expressAsyncHandler(async (req, res) => {
    const orders = await TestModel.find();
    res.send(orders);
  })
);

export default TestRouter;
