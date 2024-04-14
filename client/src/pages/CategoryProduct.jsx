import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const CategoryProduct = () => {
    const navigate=useNavigate();
    const params=useParams()
    const [products,setProducts]=useState([])
    const [category,setCategory]=useState([])

    useEffect(()=>{
        if(params?.slug){
            getProductByCat()
        }
    },[params?.slug])

    const getProductByCat=async()=>{
        await axios({
            method:"GET",
            url:`http://localhost:8080/api/v1/product/product-category/${params.slug}`
        }).then((res)=>{
            setProducts(res.data?.products)
            setCategory(res.data?.category)
        }).catch((err)=>{
            console.log(err);
        })
            
    }
    
    return (
        <>
            <div className="container mt-3 category">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result(s) found </h6>
        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div className="card m-2" key={p._id}>
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title">{p.name}</h5>
                      <h5 className="card-title card-price">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </h5>
                    </div>
                    <p className="card-text ">
                      {p.description.substring(0, 60)}...
                    </p>
                    <div className="card-name-price">
                      <button
                        className="btn btn-info ms-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        See Details
                      </button>
                      </div>
                  </div>
                </div>
              ))}
            </div>
            </div>
        </div>
      </div>
        </>
    );
};

export default CategoryProduct;