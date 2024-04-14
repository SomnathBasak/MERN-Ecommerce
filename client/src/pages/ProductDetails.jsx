import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/Cart';

const ProductDetails = () => {
    const navigate=useNavigate()
    const params=useParams();
    const [product,setProduct]=useState({})
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [cart,setCart]=useCart()


    useEffect(()=>{
        if(params?.slug){
            getproduct()
        }
    },[params?.slug])
    const getproduct=async()=>{
        await axios({
            method:"GET",
            url:`http://localhost:8080/api/v1/product/get-product/${params.slug}`
        }).then((res)=>{
            setProduct(res.data?.product)
            getSimilarProduct(res.data?.product._id,res.data?.product.category._id)
        }).catch((err)=>{
            console.log(err);
        })
    }

    const getSimilarProduct = async (pid, cid) => {
        await axios({
          method:'GET',
          url:`http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
        }).then((res)=>{
          setRelatedProducts(res.data?.products);
        }).catch((err)=>{
          console.log(err);
        })   
    };

    return (
        <>
            <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height={"500"}
            width={"300"}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price :
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h6>
          <h6>Category : {product?.category?.name}</h6>
          <button onClick={()=>{setCart([...cart,product]);localStorage.setItem("cart",JSON.stringify([...cart,product]));toast.success("Item Added to Cart ")} } className="btn btn-warning ms-1" >Add To Cart</button>
        </div>
      </div>
      <hr />
       <div className="row container similar-products">
        <h4>Similar Products</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products Found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
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
                  <button
                  className="btn btn-warning ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  Add To Cart
                </button>
               </div>
              </div>
            </div>
          ))}
        </div>
      </div>
        </>
    );
};

export default ProductDetails;