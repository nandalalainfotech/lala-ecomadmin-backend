import express from "express";
import expressAsyncHandler from "express-async-handler";
import OrderrModel from "../Models/OrderrModel.js";
import { isAuth } from "../utils.js";
const OrderrRouter = express.Router();
OrderrRouter.post(
  "/Order",
  expressAsyncHandler(async (req, res) => {
    const OrderDetails = new OrderrModel({
      Amount: req.body.Amount,
      CustomerName: req.body.CustomerName,
      Dateandtime: req.body.Dateandtime,
      cartItems: req.body.cartItems,
      billing: req.body.billing,
      delivery: req.body.delivery,
      email: req.body.email,
      Status: req.body.Status,
      PaymentMode: req.body.PaymentMode,
      ShippingCharges: req.body.ShippingCharges,
      phone: req.body.phone,
      carrier: req.body.carrier,
    });
    const OrderData = await OrderDetails.save();
    res.send({
      message: "OrderAdded",
      category: OrderData,
    });
  })
);
OrderrRouter.get(
  "/mine",
  expressAsyncHandler(async (req, res) => {
    const details = await OrderrModel.find().sort({ createdAt: -1 });

    if (details) {
      res.send(details);
    } else {
      res.status(404).send({ message: "Order details Not Found" });
    }
  })
);

OrderrRouter.put("/assignstatus/:id", isAuth, async (req, res) => {
  const statusmasterId = req.body.checkboxId;
  let updatecitymaster = [];
  for (let i = 0; i < statusmasterId.length; i++) {
    const citymaster = await OrderrModel.findById({
      _id: statusmasterId[i],
    });
    if (citymaster) {
      citymaster.Status = req.body.checkedshow;
      // citymaster.zoneId = req.body.zoneId;
      updatecitymaster = await citymaster.save();
    }
  }
  res.send({ message: "State Updated", citymaster: updatecitymaster });
});
OrderrRouter.get(
  "/mine1",
  expressAsyncHandler(async (req, res) => {
    const details = await OrderrModel.find().sort({ createdAt: -1 }).limit(1);

    if (details) {
      res.send(details);
    } else {
      res.status(404).send({ message: "Order details Not Found" });
    }
  })
);

OrderrRouter.delete(
  "/deleteOrder/:id",
  expressAsyncHandler(async (req, res) => {
    const deleteStatus = await OrderrModel.findById(req.params.id);
    if (deleteStatus) {
      const delStatus = await deleteStatus.remove();
      res.send({ message: "Status Deleted", deleteStatus: delStatus });
    } else {
      res.status(404).send({ message: "Status Deleted successfully" });
    }
  })
);

OrderrRouter.delete(
  "/deletemultipleorder/:id",
  expressAsyncHandler(async (req, res) => {
    const deletId = req.body.id;
    let deleteorder;
    for (let i = 0; i < deletId.length; i++) {
      const deleteOrder = await OrderrModel.findById({ _id: deletId[i] });
      deleteorder = await deleteOrder.remove();
    }
    res.send({ message: "Order Deleted", deleteAtt: deleteorder });
  })
);

export default OrderrRouter;
