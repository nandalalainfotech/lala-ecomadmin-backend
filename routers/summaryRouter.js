import express from "express";
import expressAsyncHandler from "express-async-handler";
import summaryModel from "../Models/summaryModel.js";
const summaryRouter = express.Router();
summaryRouter.post(
  "/summary",
  expressAsyncHandler(async (req, res) => {
    const summaryDetail = new summaryModel({
      preId: req.body.preId,
      Checked: req.body.Checked,
      Name: req.body.Name,
    });
    const createdSummary = await summaryDetail.save();
    res.send({
      message: "summary Details Added",
      category: createdSummary,
    });
  }),
);

summaryRouter.get(
  "/summaryallist",
  expressAsyncHandler(async (req, res) => {
    const details = await summaryModel.find().sort({ createdAt: -1 });

    if (details) {
      res.send(details);
    } else {
      res.status(404).send({ message: "Summary details Not Found" });
    }
  }),
);

summaryRouter.put(
  "/updatesum/:id",

  expressAsyncHandler(async (req, res) => {
    const Id = req.params.id;
    const sumUpdate = await summaryModel.findById(Id);
    if (sumUpdate) {
      sumUpdate.preId = req.body.preId;
      sumUpdate.Name = req.body.Name;
      sumUpdate.Checked = req.body.Checked;

      const updatedSumAttribute = await sumUpdate.save();

      res.send({ message: " Updated", attribute: updatedSumAttribute });
    } else {
      res.status(404).send({ message: "Summary Details Not Found" });
    }
  }),
);

export default summaryRouter;
