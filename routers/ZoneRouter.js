import express from "express";
import expressAsyncHandler from "express-async-handler";
import zoneModel from "../Models/ZoneModel.js";
import { isAdmin, isAuth, isSeller } from "../utils.js";
const ZoneRouter = express.Router();
ZoneRouter.post(
  "/zone",
  expressAsyncHandler(async (req, res) => {
    const zoneDetails = new zoneModel({
      zoneName: req.body.zoneName,
      checked: req.body.checked,
    });
    const zoneData = await zoneDetails.save();
    res.send({
      message: "zone Added",
      category: zoneData,
    });
  }),
);

ZoneRouter.get(
  "/zonelist",
  expressAsyncHandler(async (req, res) => {
    const Zonedetails = await zoneModel.find().sort({ createdAt: -1 });

    if (Zonedetails) {
      res.send(Zonedetails);
    } else {
      res.status(404).send({ message: "Zone details Not Found" });
    }
  }),
);

ZoneRouter.put(
  "/updatezone/:id",

  expressAsyncHandler(async (req, res) => {
    const Id = req.params.id;
    const zoneUpdate = await zoneModel.findById(Id);
    if (zoneUpdate) {
      zoneUpdate.zoneName = req.body.zoneName;
      zoneUpdate.checked = req.body.checked;
      const updatedZone = await zoneUpdate.save();

      res.send({ message: " Updated", zonedetail: updatedZone });
    } else {
      res.status(404).send({ message: "zone Not Found" });
    }
  }),
);

ZoneRouter.delete(
  "/deletezone/:id",
  expressAsyncHandler(async (req, res) => {
    const deleteZone = await zoneModel.findById(req.params.id);

    if (deleteZone) {
      const deleteZone1 = await deleteZone.remove();
      res.send({ message: "Attributed Deleted", deleteAtt: deleteZone1 });
    } else {
      res.status(404).send({ message: "Zone Details Not Found" });
    }
  }),
);

ZoneRouter.put(
  "/activeenable/:id",

  expressAsyncHandler(async (req, res) => {
    const Id = req.body.id;

    const Attributemaster = await zoneModel.findById({
      _id: Id,
    });

    if (Attributemaster) {
      if (req.body.deactive === false) {
        Attributemaster.checked = req.body.deactive;
      } else {
        Attributemaster.checked = req.body.active;
      }
      const updatecAtt = await Attributemaster.save();

      res.send({ message: "Category Updated", Enablemaster: updatecAtt });
    }

    //   res.send({ message: "Category Updated", Attmaster: updatecAtt });
  }),
);

ZoneRouter.put("/checkboxitem/:id", isAuth, async (req, res) => {
  const ZonemasterId = req.body.checkboxId;

  let updatezonemaster = [];
  for (let i = 0; i < ZonemasterId.length; i++) {
    const zonemaster = await zoneModel.findById({
      _id: ZonemasterId[i],
    });

    if (zonemaster) {
      if (req.body.checkedshow === true) {
        zonemaster.checked = req.body.checkedshow;
      } else {
        zonemaster.checked = req.body.checkedhide;
      }
      updatezonemaster = await zonemaster.save();
    }
  }
  res.send({ message: "Zone Updated", zonemaster: updatezonemaster });
});

ZoneRouter.delete(
  "/deletebulk/:id",
  expressAsyncHandler(async (req, res) => {
    const deletId = req.body.id;
    let deleteZone;
    for (let i = 0; i < deletId.length; i++) {
      const deletezone = await zoneModel.findById({ _id: deletId[i] });
      deleteZone = await deletezone.remove();
    }
    res.send({ message: "Attributed Deleted", deleteAtt: deleteZone });
  }),
);
export default ZoneRouter;
