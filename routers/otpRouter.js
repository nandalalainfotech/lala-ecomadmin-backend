import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import User from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import sgMail from "@sendgrid/mail";
import otpGenerator from "otp-generator";
import OTP from "../Models/otpModel.js";

// var SENDGRID_API_KEY =
//   "";
// sgMail.setApiKey(SENDGRID_API_KEY);

const otpRouter = express.Router();

otpRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    
    const { email } = req.body;

    // const otp = otpGenerator.generate(6, {
    //   digits: true,
    //   lowerCaseAlphabets: false,
    //   upperCaseAlphabets: false,
    //   upperCase: false,
    //   specialChars: false,
    // });
    // console.log("otp", otp);
    // const msg = {
    //   to: email, // Change to your recipient
    //   from: "p.moorthy@nandalalainfotech.com", // Change to your verified sender
    //   subject: email,
    //   text: "Welcome to Nanadalala Infotech",
    //   html: `<p>Enter <b>${otp}</b> in our app to verify your email address</p>
    //     <p>This code <b>expires in 1 hour</b></p>`,
    // };

    // sgMail
    //   .send(msg)
    //   .then(() => {
    //     console.log("msg", msg);
    //     console.log("Email sent");
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    const otpnum = OTP({
        email: req.body.email,
        otp: otp,
        from: msg.from,
    });
    const otpSender = await otpnum.save();
    res.send({ message: "Otp Created", newOtp: otpSender });
  })
);

otpRouter.get('/otpList', expressAsyncHandler(async(req, res) => {
  const otps = await OTP.find();
  if (otps) {
      res.send(otps);
  } else {
      res.status(404).send({ message: 'Women Product Not Found' });
  }
}));

export default otpRouter;
