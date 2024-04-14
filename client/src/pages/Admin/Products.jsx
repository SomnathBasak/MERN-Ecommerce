import React, { useEffect, useState } from 'react';
import AdminMenu from '../../components/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const Products = () => {
    const [products,setProducts]=useState([])


    const getAllProducts=async()=>{
        await axios({
            method:'GET',
            url:"http://localhost:8080/api/v1/product/get-product"
        }).then((res)=>{
            setProducts(res.data.products)
        }).catch((err)=>{
            console.log(err);
            toast.error(err.response.data.error)
        })
    }
    useEffect(()=>{
        getAllProducts()
    },[])
    return (
        <>
        <div className="container-fluid m-3 p-3">
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu/>
                </div>
                <div className="col-md-9 d-flex">
                <div className='card w-auto p-3'>
                    <h1 className='text-center'>Product List</h1>
                    <div className='d-flex flex-wrap'>
                    {products?.map((p)=>(
                        <NavLink key={p._id} to={`/dashboard/admin/product/${p.slug}`}>
                    <div className="card m-2" style={{width: '18rem'}} key={p._id}>
                    <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                    <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                </div>
                </div>
                        </NavLink>
                    
                 ))}
                    </div>         
                </div>
                </div>
                </div>
            </div>
        </>
    );
};

export default Products;