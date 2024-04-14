import axios from "axios";
import { useState,useEffect } from "react";


export default function useCategory(){
    const [categories,setCategories]=useState([])

    const getCategories=async()=>{
        await axios({
            method:'GET',
            url:'http://localhost:8080/api/v1/category/get-category'
        }).then((res)=>{
            setCategories(res.data?.category)
        }).catch((err)=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        getCategories();
    },[])
    return categories
}