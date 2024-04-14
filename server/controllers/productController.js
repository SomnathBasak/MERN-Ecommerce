import Product from "../models/productModel.js";
import slugify from 'slugify';
import fs from 'fs';
import Category from './../models/categoryModel.js';
import braintree from 'braintree';
import Order from "../models/orderModel.js";
import dotenv from 'dotenv';
dotenv.config();


const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHENT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  // merchantId: "hfsc6hz9t84jzgq9",
  // publicKey: "tjwbgwjzmtnnt5kg",
  // privateKey: "e1071ac311419e86e8ebfcb1b3bc620d",
});

export const createProductController=async(req,res)=>{
    try {
      const { name, description, price, category, quantity, shipping } =
        req.fields;
      const { photo } = req.files;
      if(!name||!description||!price||!category||!quantity||!shipping){
        return res.status(400).json({error:'Please Fill All Fields'})
      }
      if(!photo){
        return res.status(400).json({error:'Photo of the product is required'})
      }
      const existProduct=await Product.findOne({name})
      if(existProduct){
        return res.status(400).json({error:'Product Already Created'})
      }
      const products = new Product({ ...req.fields, slug: slugify(name) });
      if (photo) {
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
      }
      await products.save();
      res.status(201).send({message: "Product Created Successfully",products});
    } catch (error) {
      console.log(error);
      res.status(400).json({message: "Error in creating product"});
  } 
    
  }

export const getProductController=async(req,res)=>{
    try {
      const products=await Product.find({}).populate('category').select('-photo').limit(12).sort({createdAt:-1})
      res.status(200).json({TotalCount:products.lengths,message:'All Products',products})
    } catch (error) {
      console.log(error);
      return res.status(400).json({error:'Error in getting products'})
    }
  }

export const getSingleProductController=async(req,res)=>{
    try {
      const product=await Product.findOne({slug:req.params.slug}).select('-photo').populate('category')
      res.status(200).json({message:'Single Product Fetched',product})

    } catch (error) {
      console.log(error);
      return res.status(400).json({error:'Error in Single data fetch'})
    }
  }

export const productPhotoController=async(req,res)=>{
  try {
    const product=await Product.findById(req.params.pid).select('photo')
    if(product.photo.data){
      res.set('Content-type',product.photo.contentType)
      return res.status(200).send(product.photo.data)
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({error:'Error in photo controller',error})
  }
}

export const deleteProductController=async(req,res)=>{
  try {
    await Product.findByIdAndDelete(req.params.pid).select('-photo')
    res.status(200).json({message:'Product Deleted Successfully'})
  } catch (error) {
    console.log(error);
    return res.status(400).json({error:'Error in delete controller'})
  }
}

export const updateProductController=async(req,res)=>{
  try {
    const { name, description, price, category, quantity, shipping } =
        req.fields;
      const { photo } = req.files;
      if(!name||!description||!price||!category||!quantity||!shipping){
        return res.status(400).json({error:'Please Fill All Fields'})
      }
      if(photo && photo.size>1024*1024*2){
        return res.status(400).json({error:'Photo of the product and less than 2mb'})
      }
      // const existProduct=await Product.findOne({name})
      // if(existProduct){
      //   return res.status(400).json({error:'Product Already Created'})
      // }
      const products = await Product.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true})
      if (photo) {
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
      }
      await products.save();
      res.status(201).send({message: "Product Updated Successfully",products});
  } catch (error) {
    console.log(error);
    return res.status(400).json({error:'Error in update controller'})
  }
}

export const productFilterController=async(req,res)=>{
  try {
    const {checked,radio}=req.body
    let args={}
    if(checked.length>0) args.category=checked
    if(radio.length) args.price={$gte:radio[0],$lte:radio[1]}
    const products=await Product.find(args)
    res.status(200).json({message:'Success',products})
  } catch (error) {
    console.log(error);
    return res.status(400).json({error:'Error in filter product'})
  }
}

export const productCountController=async(req,res)=>{
  try {
    const total=await Product.find({}).estimatedDocumentCount()
    res.status(200).json({message:'Success',total})
  } catch (error) {
    console.log(error);
    return res.status(400).json({error:'Error in count controller'})
  }
}

export const productListController=async(req,res)=>{
  try {
    const perPage=8
    const page=req.params.page?req.params.page:1
    const products=await Product.find({}).select('-photo').skip((page-1)*perPage).limit(perPage).sort({createdAt:-1})
    res.status(200).json({message:'Success',products})
  } catch (error) {
    console.log(error);
    return res.status(400).json({error:'Error in List Control'})
  }
}

export const searchProductController=async(req,res)=>{
  try {
    const { keyword } = req.params;
    const results = await Product.find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({message: "Error In Search Product API",error});
  }
}

export const relatedProductController=async(req,res)=>{
  try {
    const {pid,cid}=req.params;
    const products=await Product.find({category:cid,_id:{$ne:pid},}).select('-photo').limit(3).populate('category')
    res.status(200).json({message:'Success',products})
  } catch (error) {
    console.log(error);
    return res.status(400).json({error:'error in related product'})
  }
}

export const productCategoryController=async(req,res)=>{
  try {
    const category=await Category.findOne({slug:req.params.slug}) 
    const products= await Product.find({category}).populate('category')
    res.status(200).json({message:'Success',category,products})
  } catch (error) {
    console.log(error);
    return res.status(400).json({error:'error in product category'})
  }
}

export const braintreeTokenController=async(req,res)=>{
  try {
    gateway.clientToken.generate({},function(err,response){
      if(err){
        res.status(500).json({error:'Error'})
      }else{
        res.status(201).json(response)
      }
    })
  } catch (error) {
    console.log(error);
    return res.status(400).json({error:'error in braintree token'})
  }
}

export const braintreePaymentController=async(req,res)=>{
try {
  const {cart,nonce}=req.body
  let total=0
  cart.map((i)=>{
    total+=i.price
  })
  let newTransaction=gateway.transaction.sale({
    amount:total,
    paymentMethodNonce:nonce,
    options:{submitForSettlement:true}
  },
  function(error,result){
    if(result){
      const order= new Order({
        products:cart,
        payment:result,
        buyer:req.user._id
      }).save()
      res.status(200).json({ok:true})
    }else{
      res.status(500).json({error:'error'})
    }
  }
  )

} catch (error) {
  console.log(error);
  return res.status(400).json({error:'error in braintree payment'})
}
}

