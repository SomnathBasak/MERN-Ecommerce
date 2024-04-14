import React, { useEffect, useState } from 'react';
import AdminMenu from '../../components/AdminMenu';
import { toast } from 'react-hot-toast';
import  axios  from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd'

const CreateCategory = () => {
    const [categories,setCategories]=useState([])
    const[name,setName]=useState('')
    const [visible,setVisible]=useState(false)
    const[selected,setSelected]=useState(null)
    const[updatedName,setUpdatedName]=useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
          await axios({
            method:"POST",
            url:"http://localhost:8080/api/v1/category/create-category",
            data:{name}
          }).then((res)=>{
            toast.success(res.data.message)
            console.log(res);
            setName('')
            getAllCategory()
          }).catch((err)=>{
            toast.error(err.response.data.error)
          })
        }

        const getAllCategory = async () => {    
          await axios({
            method:"GET",
            url:"http://localhost:8080/api/v1/category/get-category",
          }).then((res)=>{
            setCategories(res.data.category);
          }).catch((err)=>{
            console.log(err);
            toast.error(err.response.data.error)
          })
      };
    
      useEffect(() => {
        getAllCategory();
      }, []);


        const handleUpdate=async(e)=>{
          e.preventDefault()
          await axios({
            method:"PUT",
            url:`http://localhost:8080/api/v1/category/update-category/${selected._id}`,
            data:{name:updatedName}
          }).then((res)=>{
            toast.success(res.data.message)
            setSelected(null)
            setUpdatedName('')
            setVisible(false)
            getAllCategory()
          }).catch((err)=>{
            console.log(err);
            toast.error(err.response.data.error)
          })
        }

        const handleDelete=async(pId)=>{
          await axios({
            method:"DELETE",
            url:`http://localhost:8080/api/v1/category/delete-category/${pId}`
          }).then((res)=>{
            toast.success(res.data.message)
            setSelected(null)
            setUpdatedName('')
            setVisible(false)
            getAllCategory()
          }).catch((err)=>{
            console.log(err);
            toast.error(err.response.data.error)
          })
        }
    
      
    
    return (        
            <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu/>
                </div>
                <div className='col-md-9'>
                    <div className='card w-75 p-3'>
                    <h1 className='text-center'>Manage Category</h1>
                    <div className='p-3'>
                        <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
                    </div>
                    <div>
                    <table className="table">
  <thead className='table-dark'>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Category Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {categories?.map((c)=>(
        <>
        <tr>
        <th scope="row">1</th>
            <td key={c._id}>{c.name}</td>
            <td>
                <button className='btn btn-primary' onClick={()=>{setVisible(true);setUpdatedName(c.name);setSelected(c)}}>Edit</button>
                <button className='btn btn-danger ms-3' onClick={()=>{handleDelete(c._id)}}>Delete</button>
            </td>
        </tr>        
        </>
    ))}
  </tbody>
</table>

                    </div>
                    </div>
                    <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}>
                      <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
                    </Modal>
                </div>
            </div>
        </div>
        
    );
};
export default CreateCategory;