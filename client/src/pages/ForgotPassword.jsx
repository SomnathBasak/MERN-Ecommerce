import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [user,setUser]=useState({
        email:'',
        newPassword:'',
        answer:''
    })
    const handleInput=(e)=>{
        let name=e.target.name
        let value=e.target.value
        setUser({...user,[name]:value})

    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const {email,newPassword,answer}=user
        await axios({
            method:"POST",
            url:'http://localhost:8080/api/v1/auth/forgot-password',
            data:{email,newPassword,answer}
        }).then((res)=>{
            console.log('Sucess',res);
            toast.success(res.data.message)
        })
        .catch((err)=>{
            console.log(err);
            toast.error(err.response.data.error)
        })

    }
    return (
            <div className='col-md-6 offset-md-3'>
            <h1 className='text-center' >Reset Password</h1>
        <form onSubmit={handleSubmit}>        
  <div className="1">
    <label className="form-label">Email address</label>
    <input type="email" name='email' value={user.email} onChange={handleInput} className="form-control" aria-describedby="emailHelp" />
  </div>
  <div className="1">
    <label  className="form-label">New Password</label>
    <input type="password" name='newPassword' value={user.newPassword} onChange={handleInput} className="form-control"  />
  </div>
  <div className="1">
    <label  className="form-label">Your Favorite Sport</label>
    <input type="text" name='answer' value={user.answer} onChange={handleInput} className="form-control"  />
  </div>
  <p className='text-danger'>*Please type the security question's answer to reset your password(Case Sensitive)  </p>
  <div>
  <button type="submit" className="btn btn-primary">Reset</button>
  </div>

</form>
</div>
        
    );
};

export default ForgotPassword;