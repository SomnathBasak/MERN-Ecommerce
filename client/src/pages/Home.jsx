import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Checkbox, Radio } from 'antd';
import { AiOutlineReload } from "react-icons/ai";
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart';

const Home = () => {
    const navigate=useNavigate()
    const [products,setProducts]=useState([]);
    const [categories,setCategories]=useState([])
    const [checked,setChecked]=useState([])
    const [radio,setRadio]=useState([])
    const [total,setTotal]=useState(0)
    const [page,setPage]=useState(1)
    const [loading,setLoading]=useState(false)
    const [cart,setCart]=useCart()


    const getAllCategory = async () => {    
        await axios({
          method:"GET",
          url:"http://localhost:8080/api/v1/category/get-category",
        }).then((res)=>{
          setCategories(res.data?.category);
        }).catch((err)=>{
          console.log(err);
        })
    };
  
    useEffect(() => {
      getAllCategory();
      getTotal()
    }, []);

    const getAllProducts=async()=>{
        await axios({
            method:"GET",
            url:"http://localhost:8080/api/v1/product/get-product"
        }).then((res)=>{
            setProducts(res.data.products)
        }).catch((err)=>{
            console.log(err);
            toast.error(err.response.data.error)
        })
    }

    const getTotal=async()=>{
        await axios({
            method:"GET",
            url:'http://localhost:8080/api/v1/product/product-count'
        }).then((res)=>{
            setTotal(res.data?.total)
        }).catch((err)=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        if(page===1){
            return 
        }else{
            loadMore();
        }
    },[page])

    const loadMore=async()=>{
        setLoading(true)
        await axios({
            method:'GET',
            url:`http://localhost:8080/api/v1/product/product-list/${page}`
        }).then((res)=>{
            setLoading(false)
            setProducts([...products,...data?.products])
        }).catch((err)=>{
            console.log(err);
            setLoading(false)
        })
    }
  
    const handleFilter=(value,id)=>{
        let all=[...checked]
        if(value){
            all.push(id)
        }else{
            all=all.filter((c)=>c!==id)
        }
        setChecked(all)
    }

    useEffect(()=>{
      if(!checked.length||!radio.length)  getAllProducts()
    },[checked.length,radio.length])

    useEffect(()=>{
      if(checked.length||radio.length)  filterProduct()
    },[checked,radio])

    const filterProduct=async()=>{
        await axios({
            method:'POST',
            url:'http://localhost:8080/api/v1/product/product-filters',
            data:{checked,radio}
        }).then((res)=>{
            setProducts(res.data?.products)
        }).catch((err)=>{
            console.log(err);
            toast.error(err.response.data.error)
        })
    }

    return (
        <>
        <div className='row mt-3'>
            <div className='col-md-3'>
                <h4 className='text-center'>Filter By Category</h4>
                <div className='d-flex flex-column ms-3'>
                {categories?.map((c)=>(
                    <Checkbox key={c._id} onChange={(e)=>handleFilter(e.target.checked,c._id)}>
                        {c.name}
                    </Checkbox>
                ))}
                </div>  
                <h4 className='text-center mt-4'>Filter By Price</h4>
                <div className='d-flex flex-column ms-3'>
                <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
                    {Prices?.map(p=>(
                        <div key={p._id}>
                        <Radio value={p.array}>{p.name}</Radio>
                        </div>
                    ))}
                </Radio.Group>
                <div className="d-flex flex-column mt-5">
            <button
              className="btn btn-danger btn-sm"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
                </div>            
            </div>
            <div className='col-md-9'>
                <h1 className='text-center'>All Products</h1>
                <div className='d-flex flex-wrap'>
                    {products?.map((p)=>(
                        
                    <div className="card m-2" style={{width: '18rem'}} key={p._id}>
                    <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                    <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0,30)}</p>
                    <p className="card-text">${p.price}</p>
                    <button onClick={()=>navigate(`/product/${p.slug}`)} className="btn btn-info ms-1">See Details</button>
                    <button onClick={()=>{setCart([...cart,p]);localStorage.setItem("cart",JSON.stringify([...cart,p]));toast.success("Item Added to Cart ")} } className="btn btn-warning ms-1" >Add To Cart</button>
                </div>
                </div>
                        
                    
                 ))}
                    </div>
                    <div className='m-2 p-3'>
                        {products && products.length<total && (
                            <button className='btn loadmore' onClick={(e)=>{
                                e.preventDefault()
                                setPage(page+1)

                            }}>
                                {loading?("Loading..."):(<>
                                {" "} Load More <AiOutlineReload />
                                </>
                                )}
                            </button>    
                        )}
                    </div>
            </div>
        </div>
        </>
    );
};

export default Home;