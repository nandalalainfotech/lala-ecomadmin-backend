import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import ProdEnquiry from '../Models/prodEnquiryModel.js';

const productEnquiryRouter = express.Router();

productEnquiryRouter.post("/",expressAsyncHandler(async (req, res) => {

    
     const productEnquiry = ProdEnquiry({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        reqmessage: req.body.reqmessage,
        productId: req.body.productId,
    });
    const productEnquirySaved = await productEnquiry.save();
    res.send({ message: "Product Enquiry Saved", productEnquiry: productEnquirySaved });
  })
);

productEnquiryRouter.get('/enquiryList', expressAsyncHandler(async(req, res) => {
  const prodEnq = await ProdEnquiry.find();
  if (prodEnq) {
      res.send(prodEnq);
  } else {
      res.status(404).send({ message: 'Women Product Not Found' });
  }
}));

export default productEnquiryRouter;