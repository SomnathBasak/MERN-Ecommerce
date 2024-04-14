import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/Auth';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate=useNavigate();
  const location=useLocation()
  const [auth,setAuth]=useAuth()
  const [user,setUser]=useState({
    email:'',
    password:''

  })
  const handleInput=(e)=>{
    let name=e.target.name
    let value=e.target.value
    setUser({...user,[name]:value})
  }

  const {email,password}=user
  const handleSubmit=async(e)=>{
    e.preventDefault();   
    console.log(user);
      await axios({
        method:"POST",
        url:"http://localhost:8080/api/v1/auth/login",
        data:{email,password}
      }).then((res) => {
        console.log(res);
       toast.success(res.data.message)
       setAuth({...auth,user:res.data.user,token:res.data.token})
       localStorage.setItem('auth',JSON.stringify(res.data))
       navigate(location.state||'/')
      }).catch((err) => {
        console.log(err);
        toast.error(err.response.data.error)
      });
  }
    return (
        <div className='col-md-6 offset-md-3'>
            <h1 className='text-center' >Login Here</h1>
        <form onSubmit={handleSubmit}>        
  <div className="1">
    <label className="form-label">Email address</label>
    <input type="email" name='email' value={user.email} onChange={handleInput} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
  </div>
  <div className="1">
    <label  className="form-label">Password</label>
    <input type="password" name='password' value={user.password} onChange={handleInput} className="form-control"  />
  </div>
  <NavLink to="/forgot-password" className="link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Forgot Password</NavLink>
  <br/>
  <NavLink to="/register">Not Registered?</NavLink>
  <div>
  <button type="submit" className="btn btn-primary mt-1">Submit</button>
  </div>

</form>
</div>
    );
};

export default Login;