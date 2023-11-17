import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routers/useRouter.js";
import productRouter from "./routers/productRouter.js";
import sareeRouter from "./routers/sareeRouter.js";
import kidRouter from "./routers/kidRouter.js";
import orderRouter from "./routers/orderRouter.js";
import path from "path";
import uploadRouter from "./routers/uploadRouter.js";
import applicationRouter from "./routers/applicationRouter.js";
import http from "http";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import UserCartRouter from "./routers/userCartRouter.js";
import otpRouter from "./routers/otpRouter.js";
import categoryRouter from "./routers/CategoryRouter.js";
import categoryMainRouter from "./routers/CategoryMainRouter.js";
import categorysubRouter from "./routers/CategorysubRouter.js";
import categorychildRouter from "./routers/CategorychildRouter.js";

import brandRouter from "./routers/brandRouter.js";
import brandAddressRouter from "./routers/brandAddressRouter.js";

import AttributeRouter from "./routers/AttributeRouter.js";
import AttributeValueRouter from "./routers/AttributeValueRouter.js";
import FeaturesRouter from "./routers/FeaturesRouter.js";
import FeaturesValueRouter from "./routers/FeaturesValueRouter.js";
import categoryMasterRouter from "./routers/categoryMasterRouter.js";
import catProductRouter from "./routers/catProductRouter.js";
import EmployeeRouter from "./routers/EmployeeRouter.js";
import customerAddressRouter from "./routers/customerRouter.js";
import productEnquiryRouter from "./routers/prodEnquiryRouter.js";
import CustomerDetailsRouter from "./routers/CustomerDetailsRouter.js";
import ProductQtyRouter from "./routers/ProductQtyRouter.js";
import ProShipRouter from "./routers/ProShipRouter.js";
import seoRouter from "./routers/seoRouter.js";
import ProdPricingRouter from "./routers/prodPricingRouter.js";
import TaxesRouter from "./routers/TaxesRouter.js";
import specificRouter from "./routers/specificRouter.js";
import ComboSaveRouter from "./routers/ComboSaveRouter.js";
import OptionRouter from "./routers/OptionRouter.js";
import GeneralRouter from "./routers/GeneralRouter.js";
import SizeGroupRouter from "./routers/SizeGroupRouter.js";
import summaryRouter from "./routers/summaryRouter.js";
import shippingRouter from "./routers/shippingRouter.js";
import CountryRouter from "./routers/CountryRouter.js";
import ZoneRouter from "./routers/ZoneRouter.js";
import StateRouter from "./routers/StateRouter.js";
import CityRouter from "./routers/CityRouter.js";
import PaymentRouter from "./routers/PaymentRouter.js";
import RegisterRouter from "./routers/RegisterRouter.js";
import OrderrRouter from "./routers/OrderrRouter.js";
import StatusRouter from "./routers/StatusRouter.js";
import GatewayRouter from "./routers/GatewayRouter.js";
dotenv.config();

const app = express();

mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://nandalala:Spartans!23@cluster0.ujwabrm.mongodb.net/laladb_dev?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connection established."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/application", applicationRouter);
app.use("/api/category", categoryRouter);
app.use("/api/categoryMain", categoryMainRouter);
app.use("/api/subCategory", categorysubRouter);
app.use("/api/childCategory", categorychildRouter);
app.use("/api/otp", otpRouter);
app.use("/api/products", productRouter);
app.use("/api/usercart", UserCartRouter);
app.use("/api/kids", kidRouter);
app.use("/api/sarees", sareeRouter);
app.use("/api/orders", orderRouter);
// **********************Admin panel*******************
app.use("/api/categorymaster", categoryMasterRouter);
app.use("/api/prodenquiry", productEnquiryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/customerAddress", customerAddressRouter);
app.use("/api/brandaddress", brandAddressRouter);
app.use("/api/catProduct", catProductRouter);
app.use("/api/Attribute", AttributeRouter);
app.use("/api/AttributeValue", AttributeValueRouter);
app.use("/api/Features", FeaturesRouter);
app.use("/api/FeaturesValue", FeaturesValueRouter);
app.use("/api/EmployeProfile", EmployeeRouter);
app.use("/api/Employedetails", EmployeeRouter);
app.use("/api/Customerdetails", CustomerDetailsRouter);
app.use("/api/catProductDetails", ProductQtyRouter);
app.use("/api/catogoryProductDetails", ProShipRouter);
app.use("/api/seoDetails", seoRouter);
app.use("/api/catpriceDetails", ProdPricingRouter);
app.use("/api/taxesDetails", TaxesRouter);
app.use("/api/specificPriceDetails", specificRouter);
app.use("/api/Combinationdetails", ComboSaveRouter);
app.use("/api/optionsDetails", OptionRouter);
app.use("/api/generaldetails", GeneralRouter);
app.use("/api/sizeweightgroupdata", SizeGroupRouter);
app.use("/api/summaryDetails", summaryRouter);
app.use("/api/shippinglocdetails", shippingRouter);
app.use("/api/zoneDetails", ZoneRouter);
app.use("/api/countrydetails", CountryRouter);
app.use("/api/stateDetails", StateRouter);
app.use("/api/CityDetails", CityRouter);
app.use("/api/paymentDetails", PaymentRouter);
app.use("/api/registerDetails", RegisterRouter);
app.use("/api/OrderDetails", OrderrRouter);
app.use("/api/StatusDetails", StatusRouter);
app.use("/api/gatewaydeta", GatewayRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.get("/api/config/google", (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || "");
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../lala-Mui-frontend/public/index.html"))
);

app.use((err, req, res) => {
  res.status && res.status(500).send({ message: err.message });
});
const port = process.env.PORT || 5000;

// app.listen(5000, () => {
const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: "*" } });
const users = [];

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    const user = users.find((x) => x.socketId === socket.id);
    if (user) {
      user.online = false;
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit("updateUser", user);
      }
    }
  });
  socket.on("onLogin", (user) => {
    const updatedUser = {
      ...user,
      online: true,
      socketId: socket.id,
      messages: [],
    };
    const existUser = users.find((x) => x._id === updatedUser._id);
    if (existUser) {
      existUser.socketId = socket.id;
      existUser.online = true;
    } else {
      users.push(updatedUser);
    }
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      io.to(admin.socketId).emit("updateUser", updatedUser);
    }
    if (updatedUser.isAdmin) {
      io.to(updatedUser.socketId).emit("listUsers", users);
    }
  });

  socket.on("onUserSelected", (user) => {
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      const existUser = users.find((x) => x._id === user._id);
      io.to(admin.socketId).emit("selectUser", existUser);
    }
  });

  socket.on("onMessage", (message) => {
    if (message.isAdmin) {
      const user = users.find((x) => x._id === message._id && x.online);
      if (user) {
        io.to(user.socketId).emit("message", message);
        user.messages.push(message);
      }
    } else {
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit("message", message);
        const user = users.find((x) => x._id === message._id && x.online);
        user.messages.push(message);
      } else {
        io.to(socket.id).emit("message", {
          name: "Admin",
          body: "Sorry. I am not online right now",
        });
      }
    }
  });
});

httpServer.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
