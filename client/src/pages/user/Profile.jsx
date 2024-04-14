import React, { useEffect, useState } from 'react';
import UserMenu from '../../components/UserMenu';
import {useAuth} from '../../context/Auth'
import toast from 'react-hot-toast';
import axios from 'axios';


const Profile = () => {
    const [auth,setAuth]=useAuth()
    const [user,setUser]=useState({
        name:' ',
        email:'',
        password:'',
        phone:'',
        address:'',
        answer:''
      });

    const handleInput=(e)=>{
        let name=e.target.name
        let value=e.target.value
          setUser({...user,[name]:value})
      }
       
      useEffect(()=>{
        const {email,name,phone,address}=auth?.user
        setUser(auth?.user)
      },[auth?.user])
    
    
      const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(user);
          const {name,email,phone,address}=user
          await axios({
            method:"PUT",
            url:"http://localhost:8080/api/v1/auth/profile",
            data:{name,email,phone,address}
          }).then((res)=>{
            setAuth({...auth,user:res.data?.updatedUser});
            let ls=localStorage.getItem("auth");
            ls=JSON.parse(ls);
            ls.user=res.data.updatedUser;
            localStorage.setItem("auth",JSON.stringify(ls))
            console.log(res);
            toast.success(res.data.message)
          }).catch((err)=>{
            console.log(err);
            toast.error(err.response.data.error)
          })
         }
    return (
        <>
            <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu/>
                </div>
                <div className='col-md-9'>
                    <div className='card w-75 p-3'>
                        <h1 className='text-center'>Your Profile</h1>
                    <form onSubmit={handleSubmit}>
        <div className="mb-1">
    <label className="form-label">Name</label>
    <input type="text" name='name' value={user.name} onChange={handleInput} className="form-control"  />
  </div>
  <div className="1">
    <label className="form-label">Email address</label>
    <input type="email" name='email' value={user.email} onChange={handleInput} className="form-control" disabled id="exampleInputEmail1" aria-describedby="emailHelp" />
  </div>
  <div className="1">
    <label className="form-label">Phone</label>
    <input type="number" name='phone' value={user.phone} onChange={handleInput} className="form-control"  />
  </div>
  <div className="1">
    <label  className="form-label">Address</label>
    <input type="text" name='address' value={user.address} onChange={handleInput} className="form-control"  />
  </div>
  <div>
  <button type="submit" className="btn btn-primary mt-2">Update</button>
  </div>
</form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Profile;
