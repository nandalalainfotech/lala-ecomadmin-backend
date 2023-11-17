import express from "express";
import expressAsyncHandler from "express-async-handler";
import shippingModel from "../Models/shippingModel.js";

const shippingRouter = express.Router();

shippingRouter.post(
  "/shipcost",
  expressAsyncHandler(async (req, res) => {
    // console.log("req", req.body)

    let item = []
    let testitem = []
    for (let i = 0; i < req.body.test.length; i++) {
      for (let j = 0; j < req.body.test[i].amount.length; j++) {
        if (req.body.test[i].amount) {
          item.push({
            ["range1"]: req.body.test[i].range1,
            ["range2"]: req.body.test[i].range2,
            ["amount"]: req.body.test[i].amount[j],
            ["preId"]: req.body.preId,
            ["id"]: req.body.ZoneId[j].id
          })
        }
      }
    }

    for (let i = 0; i < item.length; i++) {
      if (item[i].amount !== "") {
        testitem.push(item[i])
      }
    }
    const ShippingDetail = new shippingModel({
      preId: req.body.preId,
      checked: req.body.checked,
      tax: req.body.tax,
      title: req.body.title,
      test: item,
      editId: req.body.test,
    });
    const createdShipping = await ShippingDetail.save();
    res.send({ message: "Shipping details Added", category: createdShipping });
  }),
);

shippingRouter.get(
  "/shipviewlist",
  expressAsyncHandler(async (req, res) => {
    const Shippingdetails = await shippingModel
      .find()
      .sort({ createdAt: -1 })
      .limit(1);
    if (Shippingdetails) {
      res.send(Shippingdetails);
    } else {
      res.status(404).send({ message: "Shippingdetails Not Found" });
    }
  }),
);

shippingRouter.get(
  "/shipalllist",
  expressAsyncHandler(async (req, res) => {
    const Shippingalldetails = await shippingModel
      .find()
      .sort({ createdAt: -1 });
    if (Shippingalldetails) {
      res.send(Shippingalldetails);
    } else {
      res.status(404).send({ message: "Shippingdetails Not Found" });
    }
  }),
);

shippingRouter.put(
  "/updateFreeShip/:id",

  expressAsyncHandler(async (req, res) => {
    // console.log("req--------->>", req.body);

    let item = []
    let testitem = []
    for (let i = 0; i < req.body.test.length; i++) {
      for (let j = 0; j < req.body.test[i].amount.length; j++) {
        if (req.body.test[i].amount) {
          item.push({
            ["range1"]: req.body.test[i].range1,
            ["range2"]: req.body.test[i].range2,
            ["amount"]: req.body.test[i].amount[j],
            ["preId"]: req.body.preId,
            ["id"]: req.body.ZoneId[j].id
          })
        }
      }
    }

    for (let i = 0; i < item.length; i++) {
      if (item[i].amount !== "") {
        testitem.push(item[i])
      }
    }
    // console.log("req", item)
    const Id = req.params.id;
    const freeShipUpdate = await shippingModel.findById(Id);
    if (freeShipUpdate) {
      freeShipUpdate.preId = req.body.preId;
      freeShipUpdate.checked = req.body.checked;
      freeShipUpdate.tax = req.body.tax;
      freeShipUpdate.title = req.body.title;
      freeShipUpdate.test = item;
      freeShipUpdate.editId = req.body.editId;
      const updatedShipAttribute = await freeShipUpdate.save();
      res.send({ message: " Updated", attribute: updatedShipAttribute });
    } else {
      res.status(404).send({ message: "Shipping Details Not Found" });
    }
  }),
);


export default shippingRouter;
