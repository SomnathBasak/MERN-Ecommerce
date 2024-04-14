import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,required:true,trim:true
    },
    email:{
        type:String,required:true,trim:true,unique:true
    },
    password:{
        type:String,required:true,trim:true
    },
    phone:{
        type:Number,required:true,trim:true
    },
    address:{
        type:String,required:true,trim:true
    },
    answer:{
        type:String,required:true
    },
    role:{
        type:String,default:'consumer'
    }
},{timestamps:true})


const User=mongoose.model('User',userSchema)

export default User;