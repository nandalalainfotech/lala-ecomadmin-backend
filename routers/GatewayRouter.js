import Razorpay from "razorpay";
import express from "express";
import expressAsyncHandler from "express-async-handler";
import GatewayModel from "../Models/GatewayModel.js";
import OrderrModel from "../Models/OrderrModel.js";
import fss, { createReadStream } from "fs";
import pdf from "dynamic-html-pdf";
import nodemailer from "nodemailer";
import path from "path";
import RegisterModel from "../Models/RegisterModel.js";
// import { dirname } from 'path';
const GatewayRouter = express.Router();
// const path = require('path');
// GatewayRouter.post(
//   "/sendmail/:id",
//   expressAsyncHandler(async (req, res) => {
//     // console.log(req);
//     var transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 465,
//       secure: true,
//       service: "gmail",
//       auth: {
//         user: process.env.SENDER_EMAIL,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });
//     var mailOptions = {
//       from: process.env.SENDER_EMAIL,
//       to: "umamaheswari@nandalalainfotech.com",
//       subject: "Payment Success",
//       text: "Your Payment was Successfull",
//     };
//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Email sent: " + info.response);
//       }
//     });
//   })
// );

GatewayRouter.get(
	"/get-razorpay-key",
	expressAsyncHandler(async (req, res) => {
		res.send({ key: process.env.RAZORPAY_KEY_ID });
	})
);

GatewayRouter.post(
	"/create-order",
	expressAsyncHandler(async (req, res) => {
		try {
			const instance = new Razorpay({
				key_id: process.env.RAZORPAY_KEY_ID,
				key_secret: process.env.RAZORPAY_SECRET,
			});
			const options = {
				amount: req.body.amount,
				currency: "INR",
			};
			const order = await instance.orders.create(options);
			if (!order) return res.status(500).send("Some error occured");
			res.send(order);
		} catch (error) {
			res.status(500).send(error);
		}
	})
);

GatewayRouter.post(
	"/pay-order",
	expressAsyncHandler(async (req, res) => {
		let usermail = req.body.email;
		let username = req.body.CustomerName;
		let order = req.body.order_id;
		let date = req.body.Dateandtime.slice(10, 20);
		let time = req.body.Dateandtime.slice(22, 32);
		let cartItems = req.body.cartItems;
		let Shopping = "Lala E-Commerce";
		let total = req.body.Amount;
		let carrier = req.body.carrier;
		


		const customerAddress = await RegisterModel.findById(req.body.delivery);
		let fnamed = customerAddress.fname;
		let address1 = customerAddress.address1;
		let address2 = customerAddress.address2;
		let cityName = customerAddress.cityName;
		let statename = customerAddress.statename;
		let countryName = customerAddress.countryName;
		let zipcode = customerAddress.zipcode

		// console.log("cartItems", cartItems)
		
		
		const cusAddbill = await RegisterModel.findById(req.body.billing);
		let fnameb = cusAddbill.fname;
		let address1b = cusAddbill.address1;
		let address2b = cusAddbill.address2;
		let cityNameb = cusAddbill.cityName;
		let statenameb = cusAddbill.statename;
		let countryNameb = cusAddbill.countryName;
		let zipcodeb = cusAddbill.zipcode
		let cartdetails = req.body.orders.cartItems;
		let pdfData = [];
		let dataUserMail = usermail;
		let dataUserName = username;
		let dataOrder = order;
		let dataTime = time;
		let dataCartItems = cartItems;
		let dataShopping = Shopping;
		let dataTotal = total;
		let DataCarrier = carrier;
		let dataCusFname = fnamed;
		let dataCusAddress1 = address1;
		let dataCusAddress2 = address2;
		let dataCusCityName = cityName;
		let dataCusStatename = statename;
		let dataCusCountryName = countryName;
		let dataCusZipcode = zipcode;
		let dataBillFname = fnameb;
		let dataBillAddress1 = address1b;
		let dataBillAddress2 = address2b;
		let dataBillCityName = cityNameb;
		let dataBillStatename = statenameb;
		let dataBillCountryName = countryNameb;
		let dataBillZipcode = zipcodeb;
		pdfData.push({
			dataUserMail, dataUserName, dataOrder, dataTime, dataCartItems, dataShopping, dataTotal, DataCarrier,
			dataCusFname, dataCusAddress1, dataCusAddress2, dataCusCityName, dataCusStatename, dataCusCountryName, dataCusZipcode,
			dataBillFname, dataBillAddress1, dataBillAddress2, dataBillCityName, dataBillStatename, dataBillCountryName, dataBillZipcode,
		})
		console.log("pdfData===>", pdfData);

		var html = fss.readFileSync(`./image/sample.html`, "utf8");
		var options = {
			format: "A3",
			orientation: "portrait",
			border: "10mm",
		};
		var document = {
			type: "file", // 'file' or 'buffer'
			target: "blank",
			template: html,
			context: {
				invoice: pdfData,
			},
			path: "./output.pdf", // it is not required if type is buffer
		};
		if (pdfData?.length === 0) {
			return null;
		}
		else {
			await pdf
				.create(document, options)
				.then((pathRes) => {
					const filestream = createReadStream(pathRes.filename);
					response.writeHead(200, {
						"Content-Disposition": "attachment;filename=" + "purchasSlips.pdf",
						"Content-Type": "application/pdf",
					});
					filestream.pipe(response);
				})
				.catch((error) => {
					console.error(error);
				});
		}

		
		try {
			const {
				amount,
				razorpayPaymentId,
				razorpayOrderId,
				razorpaySignature,
				email,
			} = req.body;

			const newOrder = await GatewayModel({
				isPaid: true,
				amount: amount,
				razorpay: {
					email: email,
					orderId: razorpayOrderId,
					paymentId: razorpayPaymentId,
					signature: razorpaySignature,
				},
			});
			await newOrder.save();
			//   console.log("usermail", usermail);
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
			

			
			const __filename = path.resolve();
			const htmlFile = path.join(__filename, 'test.html');
			console.log("htmlFile", htmlFile);
			var mailOptions = {
				from: process.env.SENDER_EMAIL,
				to: usermail,
				subject: "Payment Success",
				text: "Your Payment was Successfull",
				html: `<div style="margin: 20%">
				<table bgcolor="#ffffff" style="width: 100%">
				  <tbody>
					<tr>
					  <td
						align="center"
						style="border-bottom: 4px solid #333333; padding: 7px 0"
					  >
						<a
						  title="${Shopping}"
						  href="ecom.nandalalainfotech.in"
						  style="color: #337ff1"
						  rel="noreferrer noreferrer"
						  target="_blank"
						  data-saferedirecturl="ecom.nandalalainfotech.in"
						>
						  <img alt="${Shopping}" />
						</a>
					  </td>
					</tr>
					<tr>
					  <td align="center" style="padding: 7px 0">
						<font size="2" face="Open-sans, sans-serif" color="#110DF5">
						  <span
							style="
							  font-weight: 500;
							  font-size: 28px;
							  text-transform: uppercase;
							  line-height: 33px;
							"
							>Hi ${username},</span
						  ><br />
						  <span
							style="
							  font-weight: 500;
							  font-size: 16px;
							  text-transform: uppercase;
							  line-height: 25px;
							"
							>Thank you for shopping with ${Shopping}!</span
						  >
						</font>
					  </td>
					</tr>
					<tr>
					  <td style="padding: 0 !important">&nbsp;</td>
					</tr>
					<tr>
					  <td
						style="
						  border: 1px solid #d6d4d4;
						  background-color: #f8f8f8;
						  padding: 7px 0;
						"
					  >
						<table style="width: 100%">
						  <tbody>
							<tr>
							  <td width="10" style="padding: 7px 0">&nbsp;</td>
							  <td style="padding: 7px 0">
								<font
								  size="2"
								  face="Open-sans, sans-serif"
								  color="#555454"
								>
								  <p
									style="
									  border-bottom: 1px solid #d6d4d4;
									  margin: 3px 0 7px;
									  text-transform: uppercase;
									  font-weight: 500;
									  font-size: 18px;
									  padding-bottom: 10px;
									"
								  >
									Order details
								  </p>
								  <span style="color: #777">
									<span style="color: #333"
									  ><strong>Order:</strong></span
									>
									${order} Placed on ${date}, ${time}<br /><br />
									<span style="color: #333"
									  ><strong>Payment:</strong></span
									>
									razorpay
								  </span>
								</font>
							  </td>
							  <td width="10" style="padding: 7px 0">&nbsp;</td>
							</tr>
						  </tbody>
						</table>
					  </td>
					</tr>
					<tr>
					  <td style="padding: 7px 0">
						<font size="2" face="Open-sans, sans-serif" color="#555454">
						  <table
							bgcolor="#ffffff"
							style="width: 100%; border-collapse: collapse"
						  >
							<tbody>
							 
							 
		  
							 
		  
							 
							  <tr>
								<td
								  bgcolor="#f8f8f8"
								  colspan="4"
								  style="
									border: 1px solid #d6d4d4;
									color: #333;
									padding: 7px 0;
								  "
								>
								  <table style="width: 100%; border-collapse: collapse">
									<tbody>
									  <tr>
										<td width="10" style="color: #333; padding: 0">
										  &nbsp;
										</td>
										<td align="right" style="color: #333; padding: 0">
										  <font
											size="2"
											face="Open-sans, sans-serif"
											color="#555454"
										  >
											<strong>Products</strong>
										  </font>
										</td>
										<td width="10" style="color: #333; padding: 0">
										  &nbsp;
										</td>
									  </tr>
									</tbody>
								  </table>
								</td>
								<td
								  bgcolor="#f8f8f8"
								  align="right"
								  colspan="4"
								  style="
									border: 1px solid #d6d4d4;
									color: #333;
									padding: 7px 0;
								  "
								>
								  <table style="width: 100%; border-collapse: collapse">
									<tbody>
									  <tr>
										<td width="10" style="color: #333; padding: 0">
										  &nbsp;
										</td>
										<td align="right" style="color: #333; padding: 0">
										  <font
											size="2"
											face="Open-sans, sans-serif"
											color="#555454"
										  >
											${total}
										  </font>
										</td>
										<td width="10" style="color: #333; padding: 0">
										  &nbsp;
										</td>
									  </tr>
									</tbody>
								  </table>
								</td>
							  </tr>
							  <tr>
								<td
								  bgcolor="#f8f8f8"
								  colspan="4"
								  style="
									border: 1px solid #d6d4d4;
									color: #333;
									padding: 7px 0;
								  "
								>
								  <table style="width: 100%; border-collapse: collapse">
									<tbody>
									  <tr>
										<td width="10" style="color: #333; padding: 0">
										  &nbsp;
										</td>
										<td align="right" style="color: #333; padding: 0">
										  <font
											size="2"
											face="Open-sans, sans-serif"
											color="#555454"
										  >
											<strong>Discounts</strong>
										  </font>
										</td>
										<td width="10" style="color: #333; padding: 0">
										  &nbsp;
										</td>
									  </tr>
									</tbody>
								  </table>
								</td>
								<td
								  bgcolor="#f8f8f8"
								  colspan="4"
								  style="
									border: 1px solid #d6d4d4;
									color: #333;
									padding: 7px 0;
								  "
								>
								  <table style="width: 100%; border-collapse: collapse">
									<tbody>
									  <tr>
										<td width="10" style="color: #333; padding: 0">
										  &nbsp;
										</td>
										<td align="right" style="color: #333; padding: 0">
										  <font
											size="2"
											face="Open-sans, sans-serif"
											color="#555454"
										  >
											₹0.00
										  </font>
										</td>
										<td width="10" style="color: #333; padding: 0">
										  &nbsp;
										</td>
									  </tr>
									</tbody>
								  </table>
								</td>
							  </tr>
							  <tr>
								<td
								  bgcolor="#f8f8f8"
								  colspan="4"
								  style="
									border: 1px solid #d6d4d4;
									color: #333;
									padding: 7px 0;
								  "
								>
								  <table style="width: 100%; border-collapse: collapse">
									<tbody>
									  <tr>
										<td width="10" style="color: #333; padding: 0">
										  &nbsp;
										</td>
										<td align="right" style="color: #333; padding: 0">
										  <font
											size="2"
											face="Open-sans, sans-serif"
											color="#555454"
										  >
											<strong>Gift-wrapping</strong>
										  </font>
										</td>
										<td width="10" style="color: #333; padding: 0">
										  &nbsp;
										</td>
									  </tr>
									</tbody>
								  </table>
								</td>
								<td
								  bgcolor="#f8f8f8"
								  colspan="4"
								  style="
									border: 1px solid #d6d4d4;
									color: #333;
									padding: 7px 0;
								  "
								>
								  <table style="width: 100%; border-collapse: collapse">
									<tbody>
									  <tr>
										<td width="10" style="color: #333; padding: 0">
										  &nbsp;
										</td>
										<td align="right" style="color: #333; padding: 0">
										  <font
											size="2"
											face="Open-sans, sans-serif"
											color="#555454"
										  >
											₹0.00
										  </font>
										</td>
										<td width="10" style="color: #333; padding: 0">
										  &nbsp;
										</td>
									  </tr>
									</tbody>
								  </table>
								</td>
							  </tr>
							  <tr>
								<td
								  bgcolor="#f8f8f8"
								  colspan="4"
								  style="
									border: 1px solid #d6d4d4;
									color: #333;
									padding: 7px 0;
								  "
								>
								  <table style="width: 100%; border-collapse: collapse">
									<tbody>
									  <tr>
										<td width="10" style="color: #333; padding: 0">
										  &nbsp;
										</td>
										<td align="right" style="color: #333; padding: 0">
										  <font
											size="2"
											face="Open-sans, sans-serif"
											color="#555454"
										  >
											<strong>Shipping</strong>
										  </font>
										</td>
										<td width="10" style="color: #333; padding: 0">
										  &nbsp;
										</td>
									  </tr>
									</tbody>
								  </table>
								</td>
								<td
								  bgcolor="#f8f8f8"
								  colspan="4"
								  style="
									border: 1px solid #d6d4d4;
									color: #333;
									padding: 7px 0;
								  "
								>
								  <table style="width: 100%; border-collapse: collapse">
									<tbody>
									  <tr>
										<td width="10" style="color: #333; padding: 0">
										  &nbsp;
										</td>
										<td align="right" style="color: #333; padding: 0">
										  <font
											size="2"
											face="Open-sans, sans-serif"
											color="#555454"
										  >
											₹0.00
										  </font>
										</td>
										<td width="10" style="color: #333; padding: 0">
										  &nbsp;
										</td>
									  </tr>
									</tbody>
								  </table>
								</td>
							  </tr>
							  <tr>
								<td
								  bgcolor="#f8f8f8"
								  colspan="4"
								  style="
									border: 1px solid #d6d4d4;
									color: #333;
									padding: 7px 0;
								  "
								>
								  <table style="width: 100%; border-collapse: collapse">
									<tbody>
									  <tr>
										<td width="10" style="color: #333; padding: 0">
										  &nbsp;
										</td>
										<td align="right" style="color: #333; padding: 0">
										  <font
											size="2"
											face="Open-sans, sans-serif"
											color="#555454"
										  >
											<strong>Total Tax paid</strong>
										  </font>
										</td>
										<td width="10" style="color: #333; padding: 0">
										  &nbsp;
										</td>
									  </tr>
									</tbody>
								  </table>
								</td>
								<td
								  bgcolor="#f8f8f8"
								  colspan="4"
								  style="
									border: 1px solid #d6d4d4;
									color: #333;
									padding: 7px 0;
								  "
								>
								  <table style="width: 100%; border-collapse: collapse">
									<tbody>
									  <tr>
										<td width="10" style="color: #333; padding: 0">
										  &nbsp;
										</td>
										<td align="right" style="color: #333; padding: 0">
										  <font
											size="2"
											face="Open-sans, sans-serif"
											color="#555454"
										  >
											₹4,622.00
										  </font>
										</td>
										<td width="10" style="color: #333; padding: 0">
										  &nbsp;
										</td>
									  </tr>
									</tbody>
								  </table>
								</td>
							  </tr>
							  <tr>
								<td
								  bgcolor="#f8f8f8"
								  colspan="4"
								  style="
									border: 1px solid #d6d4d4;
									color: #333;
									padding: 7px 0;
								  "
								>
								  <table style="width: 100%; border-collapse: collapse">
									<tbody>
									  <tr>
										<td width="10" style="color: #333; padding: 0">
										  &nbsp;
										</td>
										<td align="right" style="color: #333; padding: 0">
										  <font
											size="2"
											face="Open-sans, sans-serif"
											color="#555454"
										  >
											<strong>Total paid</strong>
										  </font>
										</td>
										<td width="10" style="color: #333; padding: 0">
										  &nbsp;
										</td>
									  </tr>
									</tbody>
								  </table>
								</td>
								<td
								  bgcolor="#f8f8f8"
								  colspan="4"
								  style="
									border: 1px solid #d6d4d4;
									color: #333;
									padding: 7px 0;
								  "
								>
								  <table style="width: 100%; border-collapse: collapse">
									<tbody>
									  <tr>
										<td width="10" style="color: #333; padding: 0">
										  &nbsp;
										</td>
										<td align="right" style="color: #333; padding: 0">
										  <font
											size="4"
											face="Open-sans, sans-serif"
											color="#555454"
										  >
											₹158,678.00
										  </font>
										</td>
										<td width="10" style="color: #333; padding: 0">
										  &nbsp;
										</td>
									  </tr>
									</tbody>
								  </table>
								</td>
							  </tr>
							</tbody>
						  </table>
						</font>
					  </td>
					</tr>
					<tr>
					  <td
						style="
						  border: 1px solid #d6d4d4;
						  background-color: #f8f8f8;
						  padding: 7px 0;
						"
					  >
						<table style="width: 100%">
						  <tbody>
							<tr>
							  <td width="10" style="padding: 7px 0">&nbsp;</td>
							  <td style="padding: 7px 0">
								<font
								  size="2"
								  face="Open-sans, sans-serif"
								  color="#555454"
								>
								  <p
									style="
									  border-bottom: 1px solid #d6d4d4;
									  margin: 3px 0 7px;
									  text-transform: uppercase;
									  font-weight: 500;
									  font-size: 18px;
									  padding-bottom: 10px;
									"
								  >
									Shipping
								  </p>
								  <span style="color: #777">
									<span style="color: #333"
									  ><strong>Carrier:</strong></span
									>
									${carrier}<br /><br />
									<span style="color: #333"
									  ><strong>Payment:</strong></span
									>
									razorpay
								  </span>
								</font>
							  </td>
							  <td width="10" style="padding: 7px 0">&nbsp;</td>
							</tr>
						  </tbody>
						</table>
					  </td>
					</tr>
					<tr>
					  <td style="padding: 0 !important">&nbsp;</td>
					</tr>
					<tr>
					  <td style="padding: 7px 0">
						<table style="width: 100%">
						  <tbody>
							<tr>
							  <td
								width="310"
								style="
								  border: 1px solid #d6d4d4;
								  background-color: #f8f8f8;
								  padding: 7px 0;
								"
							  >
								<table style="width: 100%">
								  <tbody>
									<tr>
									  <td width="10" style="padding: 7px 0">&nbsp;</td>
									  <td style="padding: 7px 0">
										<font
										  size="2"
										  face="Open-sans, sans-serif"
										  color="#555454"
										>
										  <p
											style="
											  border-bottom: 1px solid #d6d4d4;
											  margin: 3px 0 7px;
											  text-transform: uppercase;
											  font-weight: 500;
											  font-size: 18px;
											  padding-bottom: 10px;
											"
										  >
											Delivery address
										  </p>
										  <span style="color: #777">
											<span style="font-weight: bold"
											  >${fnamed}</span
											>
											<span style="font-weight: bold"></span
											><br />${address1}<br />${address2}<br />${cityName}<br />${statename}<br />
											${countryName}<br />${zipcode}
										  </span>
										</font>
									  </td>
									  <td width="10" style="padding: 7px 0">&nbsp;</td>
									</tr>
								  </tbody>
								</table>
							  </td>
							  <td width="20" style="padding: 7px 0">&nbsp;</td>
							  <td
								width="310"
								style="
								  border: 1px solid #d6d4d4;
								  background-color: #f8f8f8;
								  padding: 7px 0;
								"
							  >
								<table style="width: 100%">
								  <tbody>
									<tr>
									  <td width="10" style="padding: 7px 0">&nbsp;</td>
									  <td style="padding: 7px 0">
										<font
										  size="2"
										  face="Open-sans, sans-serif"
										  color="#555454"
										>
										  <p
											style="
											  border-bottom: 1px solid #d6d4d4;
											  margin: 3px 0 7px;
											  text-transform: uppercase;
											  font-weight: 500;
											  font-size: 18px;
											  padding-bottom: 10px;
											"
										  >
											Billing address
										  </p>
										  <span style="color: #777">
											<span style="font-weight: bold"
											  >${fnameb}</span
											>
											<span style="font-weight: bold"></span
											><br />${address1b}<br />${address2b}<br />${cityNameb}<br />${statenameb}<br />
											${countryNameb}<br />${zipcodeb}
										  </span>
										</font>
									  </td>
									  <td width="10" style="padding: 7px 0">&nbsp;</td>
									</tr>
								  </tbody>
								</table>
							  </td>
							</tr>
						  </tbody>
						</table>
					  </td>
					</tr>
					<tr>
					  <td style="padding: 0 !important">&nbsp;</td>
					</tr>
					<tr>
					  <td style="padding: 7px 0">
						<font size="2" face="Open-sans, sans-serif" color="#555454">
						</font>
					  </td>
					</tr>
					<tr>
					  <td style="padding: 7px 0"></td>
					</tr>
		  
					<tr>
					  <td style="padding: 0 !important">&nbsp;</td>
					</tr>
					<tr>
					  <td style="border-top: 4px solid #333333; padding: 7px 0">
						<span
						  ><a
							href="ecom.nandalalainfotech.in"
							style="color: #337ff1"
							rel="noreferrer noreferrer"
							target="_blank"
							data-saferedirecturl="ecom.nandalalainfotech.in"
							>${Shopping}</a
						  >
						  powered by
						  <a
							href="https://nandalalainfotech.com/"
							style="color: #337ff1"
							rel="noreferrer noreferrer"
							target="_blank"
							data-saferedirecturl="ecom.nandalalainfotech.in"
							>Nandalala Infotech</a
						  ></span
						>
					  </td>
					</tr>
				  </tbody>
				</table>
			  </div>`,
			
				attachments: [
					{
						__filename: "sample.pdf",
						path: "./image/sample.pdf",
					}
				]
			};

			transporter.sendMail(mailOptions, function (error, info) {
				// console.log("mailOptions", mailOptions);
				if (error) {
					console.log(error);
				} else {
					console.log("Email sent: " + info.response);
				}
			});

			res.send({
				msg: "Payment was successfull",
			});
		} catch (error) {
			console.log(error);
			res.status(500).send(error);
		}
	})
);

GatewayRouter.get(
	"/list-orders",
	expressAsyncHandler(async (req, res) => {
		const orders = await GatewayModel.find();
		res.send(orders);
	})
);

export default GatewayRouter;
