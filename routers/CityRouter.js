import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utils.js";
import cityModel from "../Models/CityModel.js";
const CityRouter = express.Router();
CityRouter.post(
  "/City",
  expressAsyncHandler(async (req, res) => {
    const cityDetails = new cityModel({
      iso: req.body.iso,
      state: req.body.state,
      zone: req.body.zone,
      country: req.body.country,
      checked: req.body.checked,
      city: req.body.city,
      // pincodeFrom: req.body.pincodeFrom,
      // pincodeTo: req.body.pincodeTo,
      pincodes: req.body.pincode,
      stateId: req.body.stateId,
      zoneId: req.body.zoneId,
      countryId: req.body.countryId,
    });
    const CityData = await cityDetails.save();
    res.send({
      message: "City Added",
      category: CityData,
    });
  })
);
CityRouter.get(
  "/citylist",
  expressAsyncHandler(async (req, res) => {
    const Citydetails = await cityModel.find().sort({ createdAt: -1 });
    if (Citydetails) {
      res.send(Citydetails);
    } else {
      res.status(404).send({ message: "City details Not Found" });
    }
  })
);
CityRouter.put(
  "/updatecity/:id",
  expressAsyncHandler(async (req, res) => {
    const Id = req.params.id;
    const cityUpdate = await cityModel.findById(Id);
    if (cityUpdate) {
      cityUpdate.iso = req.body.iso;
      cityUpdate.state = req.body.state;
      cityUpdate.zone = req.body.zone;
      cityUpdate.country = req.body.country;
      cityUpdate.checked = req.body.checked;
      cityUpdate.city = req.body.city;
      cityUpdate.pincodes = req.body.pincode;
      // cityUpdate.pincodeTo = req.body.pincodeTo;
      const updatedCity = await cityUpdate.save();
      res.send({ message: " Updated", Citydetail: updatedCity });
    } else {
      res.status(404).send({ message: "City Not Found" });
    }
  })
);
CityRouter.delete(
  "/deleteCity/:id",
  expressAsyncHandler(async (req, res) => {
    const deletecity = await cityModel.findById(req.params.id);
    if (deletecity) {
      const deleteCity1 = await deletecity.remove();
      res.send({ message: "Attributed Deleted", deleteAtt: deleteCity1 });
    } else {
      res.status(404).send({ message: "City Details Not Found" });
    }
  })
);
CityRouter.put(
  "/activenable/:id",
  expressAsyncHandler(async (req, res) => {
    const Id = req.body.id;
    const Attributemaster = await cityModel.findById({
      _id: Id,
    });
    if (Attributemaster) {
      if (req.body.deactive === false) {
        Attributemaster.checked = req.body.deactive;
      } else {
        Attributemaster.checked = req.body.active;
      }
      const updatecAtt = await Attributemaster.save();
      res.send({ message: "CityUpdated", Enablemaster: updatecAtt });
    }
    //   res.send({ message: "Category Updated", Attmaster: updatecAtt });
  })
);
CityRouter.put("/checkboxitem/:id", isAuth, async (req, res) => {
  const CitymasterId = req.body.checkboxId;
  let updatecitymaster = [];
  for (let i = 0; i < CitymasterId.length; i++) {
    const citymaster = await cityModel.findById({
      _id: CitymasterId[i],
    });
    if (citymaster) {
      if (req.body.checkedshow === true) {
        citymaster.checked = req.body.checkedshow;
      } else {
        citymaster.checked = req.body.checkedhide;
      }
      updatecitymaster = await citymaster.save();
    }
  }
  res.send({ message: "City Updated", citymaster: updatecitymaster });
});
CityRouter.delete(
  "/deletebulk/:id",
  expressAsyncHandler(async (req, res) => {
    const deletId = req.body.id;
    let deleteCity;
    for (let i = 0; i < deletId.length; i++) {
      const deletecity = await cityModel.findById({ _id: deletId[i] });
      deleteCity = await deletecity.remove();
    }
    res.send({ message: "Attributed Deleted", deleteAtt: deleteCity });
  })
);
CityRouter.put("/checkzone/:id", isAuth, async (req, res) => {
  const citymasterId = req.body.checkboxId;
  let updatecitymaster = [];
  for (let i = 0; i < citymasterId.length; i++) {
    const citymaster = await cityModel.findById({
      _id: citymasterId[i],
    });
    if (citymaster) {
      citymaster.zone = req.body.checkedshow;
      citymaster.zoneId = req.body.zoneId;
      updatecitymaster = await citymaster.save();
    }
  }
  res.send({ message: "State Updated", citymaster: updatecitymaster });
});
export default CityRouter;
