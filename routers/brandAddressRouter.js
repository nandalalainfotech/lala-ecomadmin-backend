import express from "express";
import expressAsyncHandler from "express-async-handler";
import BrandAddress from "../Models/brandAddressModel.js";
import { isAdmin, isAuth, isSeller, isSellerOrAdmin } from "../utils.js";

const brandAddressRouter = express.Router();

brandAddressRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const brandAddress = BrandAddress({
      brand: req.body.brand,
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      address: req.body.address,
      address2: req.body.address2,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
      dni: req.body.dni,
      phone: req.body.phone,
      mobile: req.body.mobile,
      other: req.body.other,
    });
    const brandAddressSaved = await brandAddress.save();
    res.send({ message: "Otp Created", brandAddress: brandAddressSaved });
  })
);

brandAddressRouter.get(
  "/brandaddresslist",
  expressAsyncHandler(async (req, res) => {
    const brandsAddress = await BrandAddress.find();
    if (brandsAddress) {
      res.send(brandsAddress);
    } else {
      res.status(404).send({ message: "BrandAddress Not Found" });
    }
  })
);

brandAddressRouter.put(
  "/:id",
  isAuth,
  // isSeller,
  // isAdmin,
  // isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const brandAddressId = req.params.id;
    const brandAddressUpdate = await BrandAddress.findById(brandAddressId);
    if (brandAddressUpdate) {
      brandAddressUpdate.brand = req.body.brand;
      brandAddressUpdate.firstname = req.body.firstname;
      brandAddressUpdate.lastname = req.body.lastname;
      brandAddressUpdate.address = req.body.address;
      brandAddressUpdate.address2 = req.body.address2;
      brandAddressUpdate.zip = req.body.zip;
      brandAddressUpdate.city = req.body.city;
      brandAddressUpdate.country = req.body.country;
      brandAddressUpdate.dni = req.body.dni;
      brandAddressUpdate.phone = req.body.phone;
      brandAddressUpdate.mobile = req.body.mobile;
      brandAddressUpdate.other = req.body.other;

      const UdatedbrandAddress = await brandAddressUpdate.save();
      res.send({ message: " Updated", brandAddress: UdatedbrandAddress });
    } else {
      res.status(404).send({ message: "Brand Address Not Found" });
    }
  })
);

brandAddressRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const deleteBrandAddress = await BrandAddress.findById(req.params.id);
    if (deleteBrandAddress) {
      const brandAddressDeleted = await deleteBrandAddress.remove();
      res.send({
        message: "Brand Deleted",
        deleteBrandAddress: brandAddressDeleted,
      });
    } else {
      res.status(404).send({ message: "Brand Not Found" });
    }
  })
);

export default brandAddressRouter;
