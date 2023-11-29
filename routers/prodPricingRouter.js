import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import prodPricingModel from '../Models/prodPricingModel.js';
import TaxesModel from '../Models/TaxesModel.js';
import CatlogProduct from '../Models/catProductModule.js';

const ProdPricingRouter = express.Router();
ProdPricingRouter.post(
  '/Pricing',
  expressAsyncHandler(async (req, res) => {
    console.log("req.body",req.body);
    const id = req.body.priceGroup;
    const TaxesDetailsSave = await TaxesModel.findById({
      _id: id,
    });
    if (TaxesDetailsSave) {
      const PricingDetailsSave = new prodPricingModel({
        mprodId: req.body.mprodId,
        RetailExcl: req.body.RetailExcl,
        RetailIncl: req.body.RetailIncl,
        RetailCost: req.body.RetailCost,
        Rate: TaxesDetailsSave.Rate,
        productId: req.body.proId,
        priceGroup: req.body.priceGroup,
      });
      const createdPricing = await PricingDetailsSave.save();
      res.send({ message: 'Pricing Added', category: createdPricing });
      // console.log('req', PricingDetailsSave);
    }
  })
);
ProdPricingRouter.get(
  '/getPricing',
  expressAsyncHandler(async (req, res) => {
    // console.log('reqpricing', req);

    const pricingDetails = await prodPricingModel.find();

    if (pricingDetails) {
      res.send(pricingDetails);
    } else {
      res.status(404).send({ message: 'Pricing Details Not Found' });
    }
  })
);

ProdPricingRouter.get(
  '/pricinglist',
  expressAsyncHandler(async (req, res) => {
    const pricingDetails = await prodPricingModel.find().sort({ createdAt: -1 });
    if (pricingDetails) {
      res.send(pricingDetails);
    } else {
      res.status(404).send({ message: 'Pricing Details Not Found' });
    }
  })
);

ProdPricingRouter.get(
  '/pricinglastlist',
  expressAsyncHandler(async (req, res) => {
    const pricingDetails = await prodPricingModel.find().sort({ _id: -1 }).limit(1);
    if (pricingDetails) {
      res.send(pricingDetails);
    } else {
      res.status(404).send({ message: 'Pricing Details Not Found' });
    }
  })
);

ProdPricingRouter.get(
  "/pricingOnelist/:id",
  expressAsyncHandler(async (req, res) => {
    const pricingDetails = await prodPricingModel.findOne({ mprodId: req.params.id });
    if (pricingDetails) {
      res.send(pricingDetails);
    } else {
      res.status(404).send({ message: "Pricing details Not Found" });
    }
  }),
);

ProdPricingRouter.put(
  "/updatepricing/:id",
  expressAsyncHandler(async (req, res) => {

    let object1 = req.body.productId;
    let select;
    const proddata = await CatlogProduct.findById({ _id: object1[0] });

    proddata.taxexcluded = req.body.RetailExcl;
    proddata.taxincluded = req.body.RetailIncl;
    proddata.taxrule = req.body.priceGroup;
    select = await proddata.save();

    // console.log('select--------->>>', select);

    const Id = req.body._id;
    // console.log('Id', Id);
    const prodPriceUpdate = await prodPricingModel.findById(Id);
    if (prodPriceUpdate) {
      prodPriceUpdate.RetailExcl = req.body.RetailExcl;
      prodPriceUpdate.RetailIncl = req.body.RetailIncl;
      prodPriceUpdate.RetailCost = req.body.RetailCost;
      prodPriceUpdate.priceGroup = req.body.priceGroup;
      const updatedPriceAttribute = await prodPriceUpdate.save();

      res.send({ message: " Updated", attribute: updatedPriceAttribute });
    } else {
      res.status(404).send({ message: "Quantity Not Found" });
    }
  }),
);
export default ProdPricingRouter;
