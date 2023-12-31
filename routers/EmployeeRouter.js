import express from "express";
import expressAsyncHandler from "express-async-handler";
import EmployeDetails from "../Models/EmployeeDetails.js";
import EmployeProfile from "../Models/EmployeeModel.js";
import { isAdmin, isAuth, isSeller, isSellerOrAdmin } from "../utils.js";

const EmployeeRouter = express.Router();

EmployeeRouter.get(
  "/Proifles",
  expressAsyncHandler(async (req, res) => {
    const Profile = await EmployeProfile.find();
    if (Profile) {
      res.send(Profile);
    } else {
      res.status(404).send({ message: "Profile Not Found" });
    }
  })
);

EmployeeRouter.get(
  "/employedtail",
  expressAsyncHandler(async (req, res) => {
    const details = await EmployeDetails.find();
    if (details) {
      res.send(details);
    } else {
      res.status(404).send({ message: "Employee Details Not Found" });
    }
  })
);

EmployeeRouter.post(
  "/",
  isAuth,
  isSeller,
  isAdmin,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const Profile = new EmployeProfile({
      empprofile: req.body.EmpProfile,
    });
    const createdProfile = await Profile.save();
    res.send({ message: "Product Created", category: createdProfile });
  })
);

EmployeeRouter.post(
  "/employee",
  isAuth,
  isSeller,
  isAdmin,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const employedetail = new EmployeDetails({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      mobile: req.body.mobile,
      profile: req.body.EmpProfile,
      active: req.body.active,
    });
    const createdProfile = await employedetail.save();
    res.send({ message: "Product Created", category: createdProfile });
  })
);

EmployeeRouter.put(
  "/updatemplee/:id",
  isAuth,
  isSeller,
  isAdmin,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const Id = req.params.id;
    const employeeupdate = await EmployeDetails.findById(Id);
    if (employeeupdate) {
      employeeupdate.firstname = req.body.fname;
      employeeupdate.lastname = req.body.lname;
      employeeupdate.email = req.body.editemail;
      employeeupdate.mobile = req.body.mobilenumber;
      employeeupdate.profile = req.body.roll;
      employeeupdate.active = req.body.active;
      const updatedAttribute = await employeeupdate.save();
      res.send({ message: " Updated", attribute: updatedAttribute });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

EmployeeRouter.delete(
  "/deleteEmploye/:id",
  expressAsyncHandler(async (req, res) => {
    const deleteEmploye = await EmployeDetails.findById(req.params.id);
    if (deleteEmploye) {
      const deleteemploye = await deleteEmploye.remove();
      res.send({ message: "Attributed Deleted", deleteAtt: deleteemploye });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

EmployeeRouter.put(
  "/updatprofile/:id",
  isAuth,
  isSeller,
  isAdmin,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const Id = req.params.id;
    const profileupdate = await EmployeProfile.findById(Id);
    if (profileupdate) {
      profileupdate.empprofile = req.body.profil;
      const updatedAttribute = await profileupdate.save();
      res.send({ message: " Updated", attribute: updatedAttribute });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

EmployeeRouter.delete(
  "/deleteprofile/:id",
  expressAsyncHandler(async (req, res) => {
    const deleteEmploye = await EmployeProfile.findById(req.params.id);
    if (deleteEmploye) {
      const deleteemploye = await deleteEmploye.remove();
      res.send({ message: "Attributed Deleted", deleteAtt: deleteemploye });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

EmployeeRouter.delete(
  "/deletemultiple/:id",
  expressAsyncHandler(async (req, res) => {
    const deletId = req.body.id;
    let deleteemploye;
    for (let i = 0; i < deletId.length; i++) {
      const deleteEmploye = await EmployeDetails.findById({ _id: deletId[i] });
      deleteemploye = await deleteEmploye.remove();
    }
    res.send({ message: "Attributed Deleted", deleteAtt: deleteemploye });
  })
);

EmployeeRouter.put(
  "/attactive/:id",
  isAuth,
  isAdmin,
  isSeller,
  async (req, res) => {
    const attributeId = req.body.checkboxId;
    let updatecAtt = [];
    for (let i = 0; i < attributeId.length; i++) {
      const Attributemaster = await EmployeDetails.findById({
        _id: attributeId[i],
      });

      if (Attributemaster) {
        if (req.body.checkedshow === true) {
          Attributemaster.active = req.body.checkedshow;
        } else {
          Attributemaster.active = req.body.checkedhide;
        }
        updatecAtt = await Attributemaster.save();
      }
    }
    res.send({ message: "Category Updated", Attmaster: updatecAtt });
  }
);

EmployeeRouter.put(
  "/updateEnable/:id",
  isAuth,
  isAdmin,
  isSeller,
  async (req, res) => {
    const attributeId = req.body.id;

    const Attributemaster = await EmployeDetails.findById({ _id: attributeId });

    if (Attributemaster) {
      if (req.body.active === true) {
        Attributemaster.active = req.body.active;
      } else {
        Attributemaster.active = req.body.deactive;
      }
      const updatecAtt = await Attributemaster.save();
      res.send({ message: "Category Updated", Attmaster: updatecAtt });
    }

    // res.send({ message: "Category Updated", Attmaster: updatecAtt });
  }
);

export default EmployeeRouter;
