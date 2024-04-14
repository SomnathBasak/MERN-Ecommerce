import jwt from 'jsonwebtoken'
import User from './../models/userModel.js';
import { comparePassword, hashPassword } from './../helpers/authHelper.js';
import Order from '../models/orderModel.js';


export const registerController=async(req,res)=>{

    try {
        const {name,email,password,phone,address,answer}=req.body;
        if(!name||!email||!password||!phone||!address||!answer){
            return res.status(400).json({error:'Please Fill Properly'})
        }
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                error:'User Already Registered Please Login'
            })
        }
        const hashedPassword= await hashPassword(password)
        const user=await new User({name,email,password:hashedPassword,phone,address,answer}).save();
        res.status(200).json({message:'Registered Successfully',user})

    } catch (error) {
        console.log(error);
        res.status(400).json({error:'Error in registration'})
    }

}

export const loginController=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({error:'Please Fill Properly'})
        }
        const user=await User.findOne({email})        
        if (!user) {
            return res.status(400).json({error:'Invalid User'})
        }
        const match=await comparePassword(password,user.password)
        if(!match){
            return res.status(400).json({error:'Invalid User'})
        }
        const token=await jwt.sign({_id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'7d'})
        res.status(200).json({message:'Logged in Successfully',token,user:{_id:user._id,name:user.name,email:user.email,phone:user.phone,address:user.address,role:user.role}})
    } catch (error) {
        console.log('Error in login controller',error);
    }
}

export const forgotPassword=async(req,res)=>{
    try {
        const {email,answer,newPassword}=req.body
        if(!email||!answer||!newPassword){
           return res.status(400).json({error:'Fill All Fields'})
        }
        const user=await User.findOne({email,answer})
        if(!user){
            return res.status(400).json({error:'Wrong Email or Answer'})
        }
        const newHashed=await hashPassword(newPassword)
        await User.findByIdAndUpdate(user._id,{password:newHashed})
        return res.status(200).json({message:'Password Reset Successfull'})
    } catch (error) {
        console.log(error);
    }
}

export const testController=async(req,res)=>{
    res.json({msg:'Protected Route'})
}

export const userController=(req,res)=>{
    res.status(200).json({ok:true})
}

export const updateProfileController=async(req,res)=>{
    try {
        const {name,address,phone}=req.body
        const user=await User.findById(req.user._id)
        const updatedUser=await User.findByIdAndUpdate(req.user._id,{
            name:name||user.name,
            address:address||user.address,
            phone:phone||user.phone
        },{new:true})
        res.status(200).json({message:'Profile Successfully Updated',updatedUser})
    } catch (error) {
        console.log(error);
        return res.status(400).json({error:'Profile Update Failed'})
    }
    
}

export const getOrderController=async(req,res)=>{
    try {
        const orders=await Order.find({buyer:req.user._id})
        .populate("products","-photo")
        .populate("buyer","name")
        res.status(200).json(orders)
    } catch (error) {
        console.log(error);
        return res.status(400).json({error:'Getting Order Failed'})
    }
}

export const getAllOrderController=async(req,res)=>{
    try {
        const orders=await Order.find({})
        .populate("products","-photo")
        .populate("buyer","name")
        .sort({createdAt: -1});
        res.json(orders)
    } catch (error) {
        console.log(error);
        return res.status(400).json({error:'Getting Order Failed'})
    }
}

export const orderStatusController=async(req,res)=>{
    try {
        const {orderId}=req.params
        const {status}=req.body
        const orders=await Order.findByIdAndUpdate(orderId,{status},{new:true})
        res.json(orders)
    } catch (error) {
        console.log(error);
        return res.status(400).json({error:'Error in updating orders'})
    }
}
