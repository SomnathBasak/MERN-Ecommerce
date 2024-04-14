import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import AdminMenu from './../../components/AdminMenu';
const { Option } = Select;

const UpdateProduct = () => {
  const navigate=useNavigate()
  const params=useParams()
  
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id,setId]=useState('');

    const getSingleProduct=async()=>{
        await axios({
            method:"GET",
            url:`http://localhost:8080/api/v1/product/get-product/${params.slug}`
        }).then((res)=>{
            setName(res.data.product.name)
            setId(res.data.product._id)
            setDescription(res.data.product.description)
            setPrice(res.data.product.price)
            setPhoto(res.data.product.photo)
            setQuantity(res.data.product.quantity)
            setShipping(res.data.product.shipping)
            setCategory(res.data.product.category._id)
        }).catch((err)=>{
            console.log(err);
            toast.error(err.response.data.error)
        })
    }

    useEffect(()=>{
        getSingleProduct()
    },[])


  //get all category
  const getAllCategory = async () => {
          await axios({
            method:"GET",
            url:"http://localhost:8080/api/v1/category/get-category"
          }).then((res)=>{
            setCategories(res.data.category)
          }).catch((err)=>{
            console.log(err);
          }) 
          }

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      await axios({
                method:"PUT",
                url:`http://localhost:8080/api/v1/product/update-product/${id}`,
                data:{name,description,price,quantity,photo,category,shipping},
                headers:{"Content-Type":"multipart/form-data"}
              }).then((res)=>{
                toast.success(res.data.message)
              }).catch((err)=>{
                console.log(err);
                toast.error(err.response.data.error)
              })
  };

  const handleDelete=async(e)=>{
    e.preventDefault();
      //  let answer = window.prompt("Are You Sure want to delete this product ? ");
      //  if (!answer) return;
      await axios({
        method:"DELETE",
        url:`http://localhost:8080/api/v1/product/delete-product/${id}`
      }).then((res)=>{
        toast.success(res.data.message)
        navigate('/dashboard/admin/products')
      }).catch((err)=>{
        console.log(err);
        toast.error(err.response.data.error)
      })
  }
    return (
        <>
           <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
          <div className='card w-75 p-3'>
            <h1 className="text-center">Update Product</h1>
            <label  className="form-label">Please Select Category</label>
              <Select
                variant={false}
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }} value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              
              <div className="1">
              <label  className="form-label">Enter Product Name</label>
                <input type="text" value={name} className="form-control" onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="1">
              <label  className="form-label">Enter Product Description</label>
                <textarea type="text" value={description} className="form-control" onChange={(e) => setDescription(e.target.value)}/>
              </div>

              <div className="1">
              <label  className="form-label">Enter Product Price</label>
                <input type="number" value={price} className="form-control" onChange={(e) => setPrice(e.target.value)}/>
              </div>
              <div className="1">
              <label  className="form-label">Enter Product Quantity</label>
                <input type="number" value={quantity} className="form-control" onChange={(e) => setQuantity(e.target.value)}/>
              </div>
              <div className="1">
              <label  className="form-label">Please Select Shipping</label>
                <Select variant={false} size="large" showSearch className="form-select 1" onChange={(value) => {setShipping(value)}} value={shipping?'yes':'no'}>
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="1">
              <p className="text-dark">Please Insert Product Photo Here</p>
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input type="file" name="photo" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img src={URL.createObjectURL(photo)} alt="product_photo" height={"200px"} width={"300px"}
                      className="img img-responsive"
                    />
                  </div>
                ):(<div className="text-center">
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${id}`}
                  alt="product_photo"
                  height={"200px"}
                  className="img img-responsive"
                />
              </div>)}
              </div>
              <div className="1">
                <button className="btn btn-primary ms-2" onClick={handleUpdate}>
                  Update Product
                </button>
                <button className="btn btn-danger ms-2" onClick={handleDelete}>
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> 
        </>
    );
};

export default UpdateProduct;