import express from "express";
import expressAsyncHandler from "express-async-handler";
import CatlogProduct from "../Models/catProductModule.js";
import Combination from "../Models/CombinationModel.js";
import { isAdmin, isAuth, isSeller, isSellerOrAdmin } from "../utils.js";
import Combinationchild from "../Models/CombinationchildModel.js";
import ProductQtyModel from "../Models/ProductQtyModel.js";
import prodPricingModel from "../Models/prodPricingModel.js";

const catProductRouter = express.Router();

catProductRouter.get("/combinationitem", async (req, res) => {
  const product = await Combination.find();
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

catProductRouter.get("/combinationchild", async (req, res) => {
  const product = await Combinationchild.find();
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

catProductRouter.post("/", isAuth, async (req, res) => {
  // console.log("req-------------->>>", req);
  // let featureId = [];
  // let featurestypevalue = [];

  // console.log("req.body.featureId=========>",req.body.featureId  )
  // for (let i = 0; i < req.body.featureId.length;  i++) {
  //   featureId.push(req.body.featureId[i].id);
  // }
  // console.log('req.body.featurestypevalue======>',req.body.featurestypevalue)
  // for (let i = 0; i < req.body.featurestypevalue.length; i++) {
  //   featurestypevalue.push(req.body.featurestypevalue[i].id);
  // }

  // let objects1 = req.body.qtyId;
  // let select;
  // const qtydata = await ProductQtyModel.findById({ _id: objects1[0] });
  // qtydata.Qty = req.body.quantity
  // select = await qtydata.save();

  // console.log("select-------------->>>", select);

  // let object2 = req.body.priceId;
  // let select1;
  // const pricedata = await prodPricingModel.findById({ _id: object2[0] });
  // pricedata.RetailExcl = req.body.taxexcluded;
  // pricedata.RetailIncl = req.body.taxincluded;
  // pricedata.priceGroup = req.body.taxrule;
  // select1 = await pricedata.save();
  console.log("select1-------------->>>", req.body);
  const brand = new CatlogProduct({
    prodname: req.body.prodname,
    user: req.user._id,
    imageId: req.body.fileId,
    summary: req.body.summary.data,
    description: req.body.description.data,
    featureId: req.body.featureId,
    featurestypevalue: req.body.featurestypevalue,
    combination: req.body.combination,
    brand: req.body.brand,
    search: req.body.search,
    reference: req.body.reference,
    quantity: req.body.quantity,
    taxexcluded: req.body.taxexcluded,
    taxincluded: req.body.taxincluded,
    taxrule: req.body.taxrule,
    catId: req.body.catId,
    catChildId: req.body.catChildId,
    grandchildId: req.body.grandchildId,
    qty: req.body.qty,
    mqty: req.body.mqty,
    SLocation: req.body.SLocation,
    stockin: req.body.stockin,
    stockout: req.body.stockout,
    date: req.body.date,
    height: req.body.height,
    width: req.body.width,
    depth: req.body.depth,
    weight: req.body.weight,
  });
  console.log("featurestypevalue========>", brand);

  const brandSaved = await brand.save();
  res.send({ message: "Product Created", product: brandSaved });
});

catProductRouter.get(
  "/allcatProduct",
  expressAsyncHandler(async (req, res) => {
    const catProd = await CatlogProduct.find().sort({ createdAt: -1 });
    if (catProd) {
      res.send(catProd);
    } else {
      res.status(404).send({ message: "Catalog Product Not Found" });
    }
  })
);

catProductRouter.get(
  "/lastcatProduct",
  expressAsyncHandler(async (req, res) => {
    const proddetails = await CatlogProduct.find().sort({ _id: -1 }).limit(1);
    if (proddetails) {
      res.send(proddetails);
    } else {
      res.status(404).send({ message: "Quantity details Not Found" });
    }
  })
);

catProductRouter.get(
  "/viewcatProduct",
  expressAsyncHandler(async (req, res) => {
    const catProd = await CatlogProduct.find();
    if (catProd) {
      res.send(catProd);
    } else {
      res.status(404).send({ message: "Catalog Product Not Found" });
    }
  })
);

catProductRouter.put(
  "/:id",
  isAuth,
  // isSeller,
  // isAdmin,
  // isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    // console.log('req------------->>>>', req);
    let object1 = req.body.quanId;
    let select;
    const qtydata = await ProductQtyModel.findById({ _id: object1[0] });
    qtydata.Qty = req.body.quantity;
    select = await qtydata.save();

    // console.log('select------------->>>>', select);

    let object2 = req.body.priceId;
    let select1;
    const pricedata = await prodPricingModel.findById({ _id: object2[0] });
    pricedata.RetailExcl = req.body.taxexcluded;
    pricedata.RetailIncl = req.body.taxincluded;
    pricedata.priceGroup = req.body.taxrule;
    select1 = await pricedata.save();

    const catProdId = req.params.id;

    let featureId = [];
    let featurestypevalue = [];

    for (let i = 0; i < req.body.featureId.length; i++) {
      featureId.push(req.body.featureId[i]);
    }
    for (let i = 0; i < req.body.featurestypevalue.length; i++) {
      featurestypevalue.push(req.body.featurestypevalue[i]);
    }
    const catProdUpdate = await CatlogProduct.findById(catProdId);

    if (catProdUpdate) {
      catProdUpdate.prodname = req.body.prodname;
      catProdUpdate.summary = req.body.summary;
      catProdUpdate.description = req.body.description;
      (catProdUpdate.catId = req.body.catId),
        (catProdUpdate.catChildId = req.body.catChildId),
        (catProdUpdate.grandchildId = req.body.grandchildId),
        (catProdUpdate.featureId = featureId);
      catProdUpdate.featurestypevalue = req.body.featurestypevalue;
      catProdUpdate.brand = req.body.brand;
      catProdUpdate.combination = req.body.combination;
      catProdUpdate.reference = req.body.reference;
      catProdUpdate.quantity = req.body.quantity;
      catProdUpdate.taxexcluded = req.body.taxexcluded;
      catProdUpdate.taxincluded = req.body.taxincluded;
      const updatedCatProd = await catProdUpdate.save();
      // console.log('updatedCatProd-------->>>', updatedCatProd);

      res.send({
        message: "Catalog Product Updated",
        catProdUpdate: updatedCatProd,
      });
    } else {
      res.status(404).send({ message: "Catalog Product Not Found" });
    }
  })
);

catProductRouter.get(
  "/sideallProd",
  expressAsyncHandler(async (req, res) => {
    const catProd = await CatlogProduct.find().limit(4);
    if (catProd) {
      res.send(catProd);
    } else {
      res.status(404).send({ message: "Catalog Product Not Found" });
    }
  })
);

catProductRouter.put(
  "/wishlist/:id",
  isAuth,
  // isSeller,
  // isAdmin,
  // isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const catProdId = req.params.id;
    const catProdUpdate = await CatlogProduct.findById(catProdId);

    if (catProdUpdate) {
      catProdUpdate.status = req.body.status;
      const updatedCatProd = await catProdUpdate.save();

      res.send({
        message: "Catalog Product Updated",
        catProdUpdate: updatedCatProd,
      });
    } else {
      res.status(404).send({ message: "Catalog Product Not Found" });
    }
  })
);

catProductRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const deleteCatProd = await CatlogProduct.findById(req.params.id);
    if (deleteCatProd) {
      const catProductDeleted = await deleteCatProd.remove();
      res.send({
        message: "Catalog Product Deleted",
        deleteCatProd: catProductDeleted,
      });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

catProductRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await CatlogProduct.findById(req.params.id).populate();
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

catProductRouter.post("/combination", isAuth, async (req, res) => {
  let porductId = req.body.proId;
  //  let combinationItem =[]
  //   for(let i=0;i<req.body.catlogCombination.length;i++){
  //     combinationItem.push(req.body.catlogCombination[i])
  //   }
  //   const combinId = new Combination({
  //     combinationId:combinationItem
  //   })

  //   const brandSaved = await combinId.save();
  //  res.send({ message: "Product Created", product: brandSaved });

  // const attribute = await Attribute.findById({porductId});

  if (porductId) {
    let newcomItem;
    for (let i = 0; i < req.body.catlogCombination.length; i++) {
      const combinchildId = new Combinationchild({
        comid: req.body.catlogCombination[i].id,
        comname: req.body.catlogCombination[i].atributename,
        comvalue: req.body.catlogCombination[i].atributevalue,
        color: req.body.catlogCombination[i].color,
        CombinationId: porductId,
        Cost: null,
        check: null,
        taxexclude: null,
        taxinclude: null,
        finalPrice: null,
        // color:null,
      });

      newcomItem = await combinchildId.save();
    }
    res.send({ message: "Product Created", comItem: newcomItem });
  } else {
    let combinationItem;
    const brand = await CatlogProduct.find({ combination: true });
    for (let i = 0; i < brand.length; i++) {
      combinationItem = brand[i];
    }
    let newcomItem;
    for (let i = 0; i < req.body.catlogCombination.length; i++) {
      const combinchildId = new Combinationchild({
        comid: req.body.catlogCombination[i].id,
        comname: req.body.catlogCombination[i].atributename,
        comvalue: req.body.catlogCombination[i].atributevalue,
        color: req.body.catlogCombination[i].color,
        CombinationId: combinationItem._id,
        Cost: null,
        check: null,
        taxexclude: null,
        taxinclude: null,
        finalPrice: null,
        // color:null,
      });
      newcomItem = await combinchildId.save();
    }
    res.send({ message: "Product Created", comItem: newcomItem });
  }

  //   const brandSaved = await combinId.save();
});

catProductRouter.put(
  "/stockcombination/:stockdata",
  expressAsyncHandler(async (req, res) => {
    const catStockId = req.body;
    
   

    let updatedCatStock;
    for (let i = 0; i < catStockId?.length; i++) {
      const catStockUpdate = await Combinationchild.findById({
        _id: catStockId[i].id,
      });

      if (catStockUpdate) {
        console.log("updatedCatStock---------->11111",catStockUpdate);
        catStockUpdate.comstock = catStockId[i].val;
        updatedCatStock = await catStockUpdate.save();
        
      }
    }
    res.send({
      message: "Catalog Product Updated",
      catProdUpdate: updatedCatStock,
    });
  })
);

catProductRouter.put(
  "/stockDetails/:id",
  expressAsyncHandler(async (req, res) => {
    const comboId = req.params.id;
    const updatecombo = await Combinationchild.findById(comboId);

    if (updatecombo) {
      (updatecombo.Cost = req.body.Cost),
        (updatecombo.taxexclude = req.body.taxexclude),
        (updatecombo.taxinclude = req.body.taxinclude),
        (updatecombo.finalPrice = req.body.finalPrice),
        (updatecombo.comstock = req.body.qty),
        (updatecombo.filename = req.body.item);
      updatecombo.comcheck = true;
      const comboupdate = await updatecombo.save();
    }
  })
);

catProductRouter.delete(
  "/stockDetails/:combinationId",
  expressAsyncHandler(async (req, res) => {
    const combo = await Combinationchild.findById(req.params.combinationId);

    if (combo) {
      const deleteCombo = await combo.remove();
      res.send({ message: "Combination Deleted", combo: deleteCombo });
    } else {
      res.status(404).send({ message: "Combination Not Found" });
    }
  })
);

catProductRouter.put(
  "/attactive/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const attributeId = req.body.checkboxId;
    let updatecAtt = [];
    for (let i = 0; i < attributeId.length; i++) {
      const Attributemaster = await CatlogProduct.findById({
        _id: attributeId[i],
      });

      if (Attributemaster) {
        if (req.body.checkedshow === true) {
          Attributemaster.status = req.body.checkedshow;
        } else {
          Attributemaster.status = req.body.checkedhide;
        }
        updatecAtt = await Attributemaster.save();
      }
    }
    res.send({ message: "Category Updated", Attmaster: updatecAtt });
  })
);

catProductRouter.put(
  "/updateEnables/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const attributeId = req.body.id;
    const Attributemaster = await CatlogProduct.findById({ _id: attributeId });

    if (Attributemaster) {
      if (req.body.active === true) {
        Attributemaster.status = req.body.active;
      } else {
        Attributemaster.status = req.body.deactive;
      }
      const updatecAtt = await Attributemaster.save();
      res.send({ message: "Category Updated", Attmaster: updatecAtt });
    }

    // res.send({ message: "Category Updated", Attmaster: updatecAtt });
  })
);

catProductRouter.delete(
  "/deletemultiple/:id",
  expressAsyncHandler(async (req, res) => {
    const deletId = req.body.id;
    let deleteemploye;
    for (let i = 0; i < deletId.length; i++) {
      const deleteEmploye = await CatlogProduct.findById({ _id: deletId[i] });
      deleteemploye = await deleteEmploye.remove();
    }
    res.send({ message: "Attributed Deleted", deleteAtt: deleteemploye });
  })
);

export default catProductRouter;
