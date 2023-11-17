import express from "express";
import expressAsyncHandler from "express-async-handler";
import StatusModel from "../Models/StatusModel.js";
const StatusRouter = express.Router();
StatusRouter.post(
  "/status",
  expressAsyncHandler(async (req, res) => {
    console.log(req);
    const StatusDetails = new StatusModel({
      Status: req.body.Status,
    });
    const OrderData = await StatusDetails.save();
    res.send({
      message: "OrderAdded",
      category: OrderData,
    });
  })
);
StatusRouter.get(
  "/statuslist",
  expressAsyncHandler(async (req, res) => {
    const details = await StatusModel.find().sort({ createdAt: -1 });

    if (details) {
      res.send(details);
    } else {
      res.status(404).send({ message: "Order details Not Found" });
    }
  })
);

StatusRouter.delete(
  "/deleteStatus/:id",
  expressAsyncHandler(async (req, res) => {
    const deleteStatus = await StatusModel.findById(req.params.id);
    if (deleteStatus) {
      const delStatus = await deleteStatus.remove();
      res.send({ message: "Status Deleted", deleteStatus: delStatus });
    } else {
      res.status(404).send({ message: "Status Deleted successfully" });
    }
  })
);
export default StatusRouter;
