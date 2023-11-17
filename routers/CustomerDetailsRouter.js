import express from "express";
import expressAsyncHandler from "express-async-handler";
import CustomerDetailsModel from "../Models/CustomerDetailsModel.js";
import { isAuth } from "../utils.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";
import nodemailer from "nodemailer";
import UserDetailsDataModel from "../Models/UserDetailsDataModel.js";

const CustomerDetailsRouter = express.Router();

CustomerDetailsRouter.post(
  "/customer",

  expressAsyncHandler(async (req, res) => {
    const customerdetailData = new CustomerDetailsModel({
      fname: req.body.fname,
      lname: req.body.lname,
      emailorphone: req.body.emailorphone,
      phone: req.body.phone,
      password: bcrypt.hashSync(req.body.password, 8),
      cpassword: bcrypt.hashSync(req.body.cpassword, 8),
      dob: req.body.dob,
      checked: req.body.checked,
    });
    const createdProfile = await customerdetailData.save();
    //console.log('createdProfile', createdProfile);
    res.send({ message: "Customer Added", category: createdProfile });
  })
);

// CustomerDetailsRouter.post(
//   "/login",
//   expressAsyncHandler(async (req, res) => {
//     // console.log(req);
//     const user = await CustomerDetailsModel.findOne({
//       emailorphone: req.body.emailorphone,
//     });
//     console.log("user", user);
//     console.log(req.body.password, user.password);
//     if (user) {
//       if (bcrypt.compareSync(req.body.password, user.password)) {
//         console.log(req.body.password, user.password);
//         res.send({
//           _id: user._id,
//           Username: user.emailorphone,
//           Password: user.password,
//           token: generateToken(user),
//         });
//         return;
//       }
//     }

//     res.status(401).send({ message: "Invalid email or password" });
//   })
// );

CustomerDetailsRouter.post(
  "/loginn",
  expressAsyncHandler(async (req, res) => {
    console.log(req);
    const user = await CustomerDetailsModel.findOne({
      emailorphone: req.body.emailorphone,
    });
    console.log("user", user);
    // console.log(req.body.password, user.password);
    // localStorage.setItem("userInfo", JSON.stringify(user ? user : ""));
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        console.log(req.body.password, user.password);

        res.send({
          _id: user._id,
          Userfname: user.fname,
          Userlname: user.lname,
          phone: user.phone,
          User: user.emailorphone,
          Password: user.password,
          token: generateToken(user),
        });
        return;
      }
    }

    res.status(401).send({ message: "Invalid email or password" });
  })
);
CustomerDetailsRouter.get(
  "/customerDetail",
  expressAsyncHandler(async (req, res) => {
    const details = await CustomerDetailsModel.find().sort({ createdAt: -1 });
    //console.log(details);
    if (details) {
      res.send(details);
    } else {
      res.status(404).send({ message: "Customer Details Not Found" });
    }
  })
);

CustomerDetailsRouter.put(
  "/updateCustomer/:id",

  expressAsyncHandler(async (req, res) => {
    //console.log('req', req);
    const Id = req.params.id;
    const customerUpdate = await CustomerDetailsModel.findById(Id);
    if (customerUpdate) {
      customerUpdate.fname = req.body.fname;
      customerUpdate.lname = req.body.lname;
      customerUpdate.emailorphone = req.body.emailorphone;
      customerUpdate.password = req.body.password;
      customerUpdate.cpassword = req.body.cpassword;
      customerUpdate.dob = req.body.dob;
      customerUpdate.checked = req.body.checked;
      customerUpdate.cusGroup = req.body.cusGroup;

      customerUpdate.showOffers = req.body.showOffers;
      const updatedAttribute = await customerUpdate.save();
      //console.log('updatedAttribute', updatedAttribute);
      res.send({ message: " Updated", attribute: updatedAttribute });
    } else {
      res.status(404).send({ message: "Customer Not Found" });
    }
  })
);

CustomerDetailsRouter.delete(
  "/deleteCustomer/:id",
  expressAsyncHandler(async (req, res) => {
    const deleteCustomer = await CustomerDetailsModel.findById(req.params.id);
    // console.log('');
    if (deleteCustomer) {
      const deleteCustomer1 = await deleteCustomer.remove();
      res.send({ message: "Attributed Deleted", deleteAtt: deleteCustomer1 });
    } else {
      res.status(404).send({ message: "Customer Details Not Found" });
    }
  })
);

CustomerDetailsRouter.put(
  "/activeEnable/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    //console.log('req', req.body);
    const Id = req.body.id;

    const Attributemaster = await CustomerDetailsModel.findById({
      _id: Id,
    });

    //console.log('req', Attributemaster);
    if (Attributemaster) {
      if (req.body.deactive === false) {
        Attributemaster.checked = req.body.deactive;
      } else {
        Attributemaster.checked = req.body.active;
      }
      const updatecAtt = await Attributemaster.save();
      //console.log('updatecAtt', updatecAtt);
      res.send({ message: "Category Updated", Attmaster: updatecAtt });
    }

    //   res.send({ message: "Category Updated", Attmaster: updatecAtt });
  })
);

CustomerDetailsRouter.put("/checkboxitem/:id", isAuth, async (req, res) => {
  console.log(req);
  const cusmasterId = req.body.checkboxId;

  let updatecusmaster = [];
  for (let i = 0; i < cusmasterId.length; i++) {
    const customersmaster = await CustomerDetailsModel.findById({
      _id: cusmasterId[i],
    });

    if (customersmaster) {
      if (req.body.checkedshow === true) {
        customersmaster.checked = req.body.checkedshow;
      } else {
        customersmaster.checked = req.body.checkedhide;
      }
      updatecusmaster = await customersmaster.save();
    }
  }
  res.send({ message: "State Updated", Attmaster: updatecusmaster });
});

CustomerDetailsRouter.delete(
  "/deletemultiple/:id",
  expressAsyncHandler(async (req, res) => {
    console.log(req);
    const deletId = req.body.id;
    let deleteCustomer;
    for (let i = 0; i < deletId.length; i++) {
      const deleteCus = await CustomerDetailsModel.findById({
        _id: deletId[i],
      });
      deleteCustomer = await deleteCus.remove();
    }
    console.log(("deleteCustomer", deleteCustomer));
    res.send({ message: "Attributed Deleted", deleteAtt: deleteCustomer });
  })
);


// =================> Password change <==============================
CustomerDetailsRouter.put(
  "/resetpassword/:id",
  expressAsyncHandler(async (req, res) => {
    // console.log(req);
    const Id = req.params.id;
    const customerUpdate = await CustomerDetailsModel.findById(Id);
    if (customerUpdate) {
      customerUpdate.fname = req.body.name;
      customerUpdate.lname = req.body.displayname;
      customerUpdate.emailorphone = req.body.email;
      if (customerUpdate) {
        bcrypt.compare(req.body.curpass, customerUpdate.password, async function (err, isMatch) {
          if (!isMatch) throw new Error('Password not matched!')
          const salt = bcrypt.genSaltSync(10);
          const newPassword = bcrypt.hashSync(req.body.newpass, salt);
          const confirmPassword = bcrypt.hashSync(req.body.conpass, salt);
          customerUpdate.password = newPassword
          customerUpdate.cpassword = confirmPassword
          //     const updatedPassword = await passwordUpdate.save();
          //     res.send({ message: " Password Updated", attribute: updatedPassword });
          const updatedAttribute = await customerUpdate.save();
          res.send({ message: " Updated", attribute: updatedAttribute });
          // console.log("customerUpdate===========>", customerUpdate);
        })
      } else {
        res.status(404).send({ message: "Customer Not Found" });
      }
    }
  }
  ))

// ==================> Forget password <============================== 
CustomerDetailsRouter.post(
  "/forgetpassword",
  expressAsyncHandler(async (req, res) => {
    const email = req.body.email;
    // console.log("email========>", email)
    const forgetpassword = await CustomerDetailsModel.findOne({
      emailorphone: email,
    });

    if (forgetpassword) {
      bcrypt.compare(email, forgetpassword.emailorphone, async function (err, isMatch) {
        let otpCode = Math.floor((Math.random() * 10000) + 1);
        let emailorphone = email;
        // console.log("otpCode========>", otpCode)
        var transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          service: "gmail",
          auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.EMAIL_PASSWORD,
          },
        });
        var mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: email,
          subject: "Password Change OTP",
          html: `<div><h1></h1><h2>Email: ${email}</h2><h2>OTP: ${otpCode}</h2></div>`
        };
        transporter.sendMail(mailOptions, function (error, info) {
          console.log("mailOptions", mailOptions);
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        res.send({ message: "Otp Sent Sucess", sentotp: otpCode, emailorphone });
      })
    } else {
      res.send({ message: "Email Not Found" });
    }
    console.log('forgetpassword', forgetpassword)
  }
  )
)
// ==============>Update Password after otp <==============================
CustomerDetailsRouter.post(
  "/updatepassword",
  expressAsyncHandler(async (req, res) => {
    console.log("req========>", req)
    const emailorphone = req.body.emailorphone;
    console.log("email========>", emailorphone)
    const password = req.body.password;
    console.log("password========>", password)
    const confirmPassword = req.body.password;
    console.log("confirmPassword========>", confirmPassword)
    const updatepassword = await CustomerDetailsModel.findOne({
      emailorphone: emailorphone,
    });

    if (updatepassword) {
      emailorphone: req.body.emailorphone
      const salt = bcrypt.genSaltSync(10);
      const newPassword = bcrypt.hashSync(req.body.password, salt);
      const confirmPassword = bcrypt.hashSync(req.body.confirmPassword, salt);
      updatepassword.password = newPassword
      updatepassword.cpassword = confirmPassword
      const updatedAttribute = await updatepassword.save();
      res.send({ message: " Updated", attribute: updatedAttribute });
    } else {
      res.status(404).send({ message: "Customer Not Found" });
    }

  })

)

export default CustomerDetailsRouter;
