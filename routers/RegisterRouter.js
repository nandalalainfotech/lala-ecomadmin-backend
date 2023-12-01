import express from "express";
import RegisterModel from "../Models/RegisterModel.js";
import expressAsyncHandler from "express-async-handler";
import CustomAddress from "../Models/customerAddressModel.js";

const RegisterRouter = express.Router();

RegisterRouter.post(
  "/saveddetails",
  expressAsyncHandler(async (req, res) => {
    // console.log(req);
    const registerDetails = CustomAddress({
      fname: req.body.fname,
      // lname: req.body.lname,
      //   cname: req.body.cname,
      address1: req.body.address1,
      address2: req.body.address2,
      cityName: req.body.cityName,
      countryName: req.body.countryName,
      statename: req.body.statename,
      state: req.body.state,
      city: req.body.city,
      zipcode: req.body.zipcode,
      phone: req.body.phone,
      email: req.body.email,
      label: req.body.label,
      // samdel: req.body.samdel,
      additionalinfo: req.body.additionalinfo,
      country: req.body.country,
      // productId: req.body.productId,
    });
    const regdetailsSaved = await registerDetails.save();
    res.send({
      message: "Register Details Saved",
      registerDetails: regdetailsSaved,
    });
  })
);
RegisterRouter.get(
  "/Address",
  expressAsyncHandler(async (req, res) => {
    // console.log(req);
    const details = await RegisterModel.find().sort({ createdAt: -1 });
    // console.log(details);
    if (details) {
      res.send(details);
    } else {
      res.status(404).send({ message: "Billing Address Details Not Found" });
    }
  })
);

RegisterRouter.put(
  "/updateAddress/:id",

  expressAsyncHandler(async (req, res) => {
    const Id = req.params.id;
    const customerUpdate = await RegisterModel.findById(Id);
    if (customerUpdate) {
      customerUpdate.fname = req.body.fname;
      customerUpdate.address1 = req.body.address1;
      customerUpdate.address2 = req.body.address2;
      customerUpdate.city = req.body.city;
      customerUpdate.zipcode = req.body.zipcode;
      customerUpdate.phone = req.body.phone;
      customerUpdate.email = req.body.email;
      customerUpdate.label = req.body.label;
      customerUpdate.country = req.body.country;
      customerUpdate.state = req.body.state;
      customerUpdate.additionalinfo = req.body.additionalinfo;
      const updatedAddress = await customerUpdate.save();

      res.send({ message: " Updated", attribute: updatedAddress });
    } else {
      res.status(404).send({ message: "Customer Not Found" });
    }
  })
);

RegisterRouter.delete(
  "/Addressdel/:id",
  expressAsyncHandler(async (req, res) => {
    console.log(req);
    const deleteCustomer = await RegisterModel.findById(req.params.id);
    // console.log('');
    if (deleteCustomer) {
      const deleteCustomer1 = await deleteCustomer.remove();
      res.send({ message: "Attributed Deleted", deleteAtt: deleteCustomer1 });
    } else {
      res.status(404).send({ message: "Customer Details Not Found" });
    }
  })
);

export default RegisterRouter;
