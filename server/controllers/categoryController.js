import Category from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController=async(req,res)=>{
    try {
        const {name}=req.body
        if(!name){
            return res.status(400).json({error:'Name is Required'})
        }
        const existingCategory=await Category.findOne({name})
        if(existingCategory){
            return res.status(400).json({error:'Category Already Exists'})
        }
        const category= await new Category({name,slug:slugify(name)}).save()
        res.status(200).json({message:'New Category Created'})

    } catch (error) {
        console.log(error);
        return res.status(400).json({error:'Error in Create Category'})
    }

}

export const updateCategoryController=async(req,res)=>{
    try {
        const {name}=req.body;
        const {id}=req.params;
        const category=await Category.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).json({message:'Category Updated',category})
    } catch (error) {
        console.log(error);
        return res.status(400).json({error:'Error in Update Category'})
    }
}

export const categoryController=async(req,res)=>{
    try {
        const category=await Category.find({})
        res.status(200).json({message:'All Category List',category})
    } catch (error) {
        console.log(error);
        return res.status(400).json({error:'Error in Category Controller'})
    }
}

export const singleCategoryController=async(req,res)=>{
    try {
        const {slug}=req.params
        const category=await Category.findOne({slug})
        res.status(200).json({message:'Got Single Category Successfully'})
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({error:'Error in Single Category'})
    }
}

export const deleteCategoryController=async(req,res)=>{
    try {
        const {id}=req.params
        await Category.findByIdAndDelete(id)
        res.status(200).json({message:'Category Deleted Successfully'})
    } catch (error) {
        console.log(error);
        return res.status(400).json({error:'Error in Delete Category'})
    }
}