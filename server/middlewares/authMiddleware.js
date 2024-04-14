import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
export const requireSignin=async(req,res,next)=>{
    try {
        const decode= jwt.verify(req.headers.authorization,process.env.JWT_SECRET_KEY)
        req.user=decode
        next();
    } catch (error) {
        console.log(error);
    }
}

export const isAdmin=async(req,res,next)=>{
    try {
        const user=await User.findById(req.user._id)
        if(user.role!=='admin'){
            console.log('Un Ac');
            return res.status(400).json({message:'Unauthorize Access'})
        }else{
            next();
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:'Unauthorize Access'})
    }
}
