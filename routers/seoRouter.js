import express from "express";
import expressAsyncHandler from "express-async-handler";

import seoModel from "../Models/seoModel.js";
const seoRouter = express.Router();
seoRouter.post(
  "/seo",
  expressAsyncHandler(async (req, res) => {
    // console.log('req', req);
    const SeoDetail = new seoModel({
      mprodId: req.body.mprodId,
      metaTitle: req.body.metaTitle,
      description: req.body.description,
      friendlyURL: req.body.friendlyURL,
      redirection: req.body.redirection,
    });
    const createdSeo = await SeoDetail.save();
    res.send({ message: "SEO details Added", category: createdSeo });
  })
);

seoRouter.get(
  "/seolist",
  expressAsyncHandler(async (req, res) => {
    const Seodetails = await seoModel.find();
    if (Seodetails) {
      res.send(Seodetails);
    } else {
      res.status(404).send({ message: "SEO details Not Found" });
    }
  }),
);

seoRouter.put(
  "/updateseo/:id",
  expressAsyncHandler(async (req, res) => {
    // console.log('req', req);
    const Id = req.body._id;
    const prodSeoUpdate = await seoModel.findById(Id);
    if (prodSeoUpdate) {
      prodSeoUpdate.metaTitle = req.body.metaTitle;
      prodSeoUpdate.description = req.body.description;
      prodSeoUpdate.friendlyURL = req.body.friendlyURL;
      prodSeoUpdate.redirection = req.body.redirection;

      const updatedSeoAttribute = await prodSeoUpdate.save();
      res.send({ message: " Updated", attribute: updatedSeoAttribute });
    } else {
      res.status(404).send({ message: "SEO Not Found" });
    }
  }),
);
export default seoRouter;
