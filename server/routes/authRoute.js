import express from "express";
const router=express.Router()
import {forgotPassword, getAllOrderController, getOrderController, loginController, orderStatusController, registerController, testController, updateProfileController, userController} from '../controllers/authController.js'
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";




router.post('/register',registerController)
router.post('/login',loginController)
router.post('/forgot-password',forgotPassword)
router.get('/test',requireSignin,isAdmin,testController)

router.get('/user-auth',requireSignin,userController)
router.get('/admin-auth',requireSignin,isAdmin,userController)
router.put('/profile',requireSignin,updateProfileController)
router.get('/orders',requireSignin,getOrderController)
router.get('/all-orders',requireSignin,isAdmin,getAllOrderController)
router.put('/order-status/:orderId',requireSignin,isAdmin,orderStatusController)



export default router;