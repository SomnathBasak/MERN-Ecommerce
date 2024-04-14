import express from 'express';
import { isAdmin, requireSignin } from './../middlewares/authMiddleware.js';
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from './../controllers/categoryController.js';

const router=express.Router()

router.post('/create-category',requireSignin,isAdmin,createCategoryController)
router.put('/update-category/:id',requireSignin,isAdmin,updateCategoryController)
router.get('/get-category',categoryController)
router.get('/single-category/:slug',singleCategoryController)
router.delete('/delete-category/:id',requireSignin,isAdmin,deleteCategoryController)




export default router