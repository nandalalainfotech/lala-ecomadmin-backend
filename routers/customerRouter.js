import express from "express";
import expressAsyncHandler from "express-async-handler";
import CustomAddress from "../Models/customerAddressModel.js";
import { isAdmin, isAuth, isSeller, isSellerOrAdmin } from "../utils.js";

const customerAddressRouter = express.Router();

customerAddressRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const customerAddress = CustomAddress({
      custEmail: req.body.custEmail,
      identificationNo: req.body.identificationNo,
      addresAlias: req.body.addresAlias,
      fname: req.body.fname,
      lname: req.body.lname,
      company: req.body.company,
      vatNo: req.body.vatNo,
      address: req.body.address,
      Addres2: req.body.Addres2,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
      phone: req.body.phone,
      mobile: req.body.mobile,
      other: req.body.other,
    });

    const customerAddressSaved = await customerAddress.save();

    res.send({
      message: "Customer Address Saved",
      customerAddress: customerAddressSaved,
    });
  })
);

customerAddressRouter.get(
  "/customerAddList",
  expressAsyncHandler(async (req, res) => {
    const custAddList = await CustomAddress.find().sort({ createdAt: -1 });
    if (custAddList) {
      res.send(custAddList);
    } else {
      res.status(404).send({ message: "CustomAddress Not Found" });
    }
  })
);

customerAddressRouter.put(
  "/:id",
  isAuth,
  isSeller,
  isAdmin,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const customAddressId = req.params.id;
    const customAddressUpdate = await CustomAddress.findById(customAddressId);
    if (customAddressUpdate) {
      customAddressUpdate.custEmail = req.body.custEmail;
      customAddressUpdate.identificationNo = req.body.identificationNo;
      customAddressUpdate.addresAlias = req.body.addresAlias;
      customAddressUpdate.fname = req.body.fname;
      customAddressUpdate.lname = req.body.lname;
      customAddressUpdate.company = req.body.company;
      customAddressUpdate.vatNo = req.body.vatNo;
      customAddressUpdate.address = req.body.address;
      customAddressUpdate.Addres2 = req.body.Addres2;
      customAddressUpdate.zip = req.body.zip;
      customAddressUpdate.city = req.body.city;
      customAddressUpdate.country = req.body.country;
      customAddressUpdate.phone = req.body.phone;
      customAddressUpdate.mobile = req.body.mobile;
      customAddressUpdate.other = req.body.other;

      const UdatedcustomerAddress = await customAddressUpdate.save();
      res.send({
        message: "customerAddress Updated",
        customerAddress: UdatedcustomerAddress,
      });
    } else {
      res.status(404).send({ message: "customer Address Not Found" });
    }
  })
);

customerAddressRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const deleteCustomAddress = await CustomAddress.findById(req.params.id);
    if (deleteCustomAddress) {
      const deleteCustomAddressDeleted = await deleteCustomAddress.remove();
      res.send({
        message: "Customer Address Deleted",
        deleteCustomAddress: deleteCustomAddressDeleted,
      });
    } else {
      res.status(404).send({ message: "Customer Address Not Found" });
    }
  })
);

customerAddressRouter.put(
  "/addresscust/:id",
  expressAsyncHandler(async (req, res) => {
    const attributeId = req.body.checkboxId;
    let updatecAtt = [];
    for (let i = 0; i < attributeId.length; i++) {
      const Attributemaster = await CustomAddress.findById({
        _id: attributeId[i],
      });
      if (Attributemaster) {
        if (req.body.checkedshow === true) {
          Attributemaster.status = req.body.checkedshow;
        } else {
          Attributemaster.status = req.body.checkedhide;
        }
      }
      updatecAtt.push(await Attributemaster.save());
    }
    res.send({ message: "Category Updated", Attmaster: updatecAtt });
  })
);

customerAddressRouter.delete(
  "/addresmasterdelete/:id",
  expressAsyncHandler(async (req, res) => {
    const deletId = req.body.id;
    let deleteemploye;
    for (let i = 0; i < deletId.length; i++) {
      const deleteEmploye = await CustomAddress.findById({ _id: deletId[i] });
      deleteemploye = await deleteEmploye.remove();
    }
    res.send({ message: "CustomerAddress Deleted", deleteAtt: deleteemploye });
  })
);

customerAddressRouter.put(
  "/customeraddressupdateEnables/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const attributeId = req.body.id;
    console.log("attributeId====>", attributeId);
    const Attributemaster = await CustomAddress.findById({ _id: attributeId });

    if (Attributemaster) {
      if (req.body.active === true) {
        Attributemaster.status = req.body.active;
      } else {
        Attributemaster.status = req.body.deactive;
      }
      const updatecAtt = await Attributemaster.save();
      res.send({ message: "Category Updated", Attmaster: updatecAtt });
    }
    console.log("updatecAtt====>", updatecAtt);
    // res.send({ message: "Category Updated", Attmaster: updatecAtt });
  })
);
export default customerAddressRouter;
