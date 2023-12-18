import express from "express";
import expressAsyncHandler from "express-async-handler";
import CountryModel from "../Models/CountryModel.js";
import { isAdmin, isAuth, isSeller } from "../utils.js";
const CountryRouter = express.Router();

CountryRouter.post(
  "/savedetails",
  expressAsyncHandler(async (req, res) => {
    const CountryDetails = new CountryModel({
      Country: req.body.Country,
      Code: req.body.Code,
      checked: req.body.checked,
      zone: req.body.zone,
    });
    const createdCountryDetail = await CountryDetails.save();
    res.send({
      message: "Country  Deatails ",
      category: createdCountryDetail,
    });
  })
);

CountryRouter.get(
  "/savelist",
  expressAsyncHandler(async (req, res) => {
    const countrylistDetails = await CountryModel.find();

    if (countrylistDetails) {
      res.send(countrylistDetails);
    } else {
      res.status(404).send({ message: "Country  Details Not Found" });
    }
  })
);

CountryRouter.put(
  "/updateCountry/:id",
  expressAsyncHandler(async (req, res) => {
    const Id = req.params.id;
    const freeCountryUpdate = await CountryModel.findById(Id);

    if (freeCountryUpdate) {
      freeCountryUpdate.Country = req.body.Country;
      freeCountryUpdate.checked = req.body.checked;
      freeCountryUpdate.Code = req.body.Code;
      freeCountryUpdate.zone = req.body.zone;

      const updatedCountryAttribute = await freeCountryUpdate.save();

      res.send({ message: " Updated", attribute: updatedCountryAttribute });
    } else {
      res.status(404).send({ message: "Country Details Not Found" });
    }
  })
);

CountryRouter.delete(
  "/countrymasterdel/:id",
  isAuth,
  // isAdmin,
  // isSeller,
  expressAsyncHandler(async (req, res) => {
    const country = await CountryModel.findById(req.params.id);
    if (country) {
      const deleteProduct = await country.remove();
      res.send({ message: "Country Details Deleted", taxes: deleteProduct });
    } else {
      res.status(404).send({ message: "Country Not Found" });
    }
  })
);

CountryRouter.put(
  "/enable/:id",
  isAuth,
  // isAdmin,
  // isSeller,
  async (req, res) => {
    const enableId = req.body.id;
    const countryEnable = await CountryModel.findById(enableId);

    if (countryEnable) {
      if (req.body.active === true) {
        countryEnable.checked = req.body.active;
      } else {
        countryEnable.checked = req.body.deactive;
      }
      const updatecCountryEnable = await countryEnable.save();
      res.send({
        message: "Country Enable Updated",
        CountryEnable: updatecCountryEnable,
      });
    }
  }
);

CountryRouter.put("/checkboxitem/:id", isAuth, async (req, res) => {
  const countrymasterId = req.body.checkboxId;
  let updatecountrymaster = [];
  for (let i = 0; i < countrymasterId.length; i++) {
    const countrymaster = await CountryModel.findById({
      _id: countrymasterId[i],
    });

    if (countrymaster) {
      if (req.body.checkedshow === true) {
        countrymaster.checked = req.body.checkedshow;
      } else {
        countrymaster.checked = req.body.checkedhide;
      }
      updatecountrymaster = await countrymaster.save();
    }
  }
  res.send({ message: "Country Updated", countrymaster: updatecountrymaster });
});


CountryRouter.delete(
  "/deletebulk/:id",
  expressAsyncHandler(async (req, res) => {
    const deletId = req.body.id;
    let deleteCountrylist;
    for (let i = 0; i < deletId?.length; i++) {
      const deleteCountry = await CountryModel.findById({ _id: deletId[i] });
      deleteCountrylist = await deleteCountry.remove();
    }
    res.send({
      message: "Attributed Deleted",
      deleteCountry: deleteCountrylist,
    });
  })
);

export default CountryRouter;
