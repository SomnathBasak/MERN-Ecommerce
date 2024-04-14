import React, { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast'
import { NavLink } from 'react-router-dom';

const Register = () => {
  const [user,setUser]=useState({
    name:'',
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


  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(user);
      const {name,email,password,phone,address,answer}=user
      await axios({
        method:"POST",
        url:"http://localhost:8080/api/v1/auth/register",
        data:{name,email,password,phone,address,answer}
      }).then((res)=>{
        console.log(res);
        toast.success(res.data.message)
      }).catch((err)=>{
        console.log(err);
        toast.error(err.response.data.error)
      })
     }
    
    return (
        <div className='col-md-6 offset-md-3'>
            <h1 className='text-center' >Register Here</h1>
        <form onSubmit={handleSubmit}>
        <div className="mb-1">
    <label className="form-label">Name</label>
    <input type="text" name='name' value={user.name} onChange={handleInput} className="form-control"  />
  </div>
  <div className="1">
    <label className="form-label">Email address</label>
    <input type="email" name='email' value={user.email} onChange={handleInput} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
  </div>
  <div className="1">
    <label className="form-label">Phone</label>
    <input type="number" name='phone' value={user.phone} onChange={handleInput} className="form-control"  />
  </div>
  <div className="1">
    <label  className="form-label">Password</label>
    <input type="password" name='password' value={user.password} onChange={handleInput} className="form-control"  />
  </div>
  <div className="1">
    <label  className="form-label">Address</label>
    <input type="text" name='address' value={user.address} onChange={handleInput} className="form-control"  />
  </div>
  <div className="1">
    <label  className="form-label">Your Favorite Sports <span className='text-danger'>(*It is required as security question for any security action like reset password/change email or phone)</span> </label>
    <input type="text" name='answer' value={user.answer} onChange={handleInput} className="form-control"  />
    </div>
    <NavLink className='mb-1' to={'/login'}>Already Registered?</NavLink>
  <div>
  <button type="submit" className="btn btn-primary mt-1 ">Submit</button>
  </div>
</form>
</div>
    );
};

export default Register;