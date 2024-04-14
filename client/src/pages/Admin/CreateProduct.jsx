
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import AdminMenu from './../../components/AdminMenu';
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

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
  const handleCreate = async (e) => {
    e.preventDefault();
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      await axios({
                method:"POST",
                url:"http://localhost:8080/api/v1/product/create-product",
                data:{name,description,price,quantity,photo,category,shipping},
                headers:{"Content-Type":"multipart/form-data"}
              }).then((res)=>{
                toast.success(res.data.message)
              }).catch((err)=>{
                toast.error(err.response.data.error)
              })
  };

  return (
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
          <div className='card w-75 p-3'>
            <h1 className="text-center">Create Product</h1>
            <label  className="form-label">Please Select Category</label>
              <Select
                variant={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
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
                <Select variant={false} size="large" showSearch className="form-select 1" onChange={(value) => {setShipping(value)}}>
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="1">
              <p className="text-dark">Please Insert Product Photo Here</p>
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"} width={"300px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="1">
                <button className="btn btn-primary" onClick={handleCreate}>
                  Create Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CreateProduct;

