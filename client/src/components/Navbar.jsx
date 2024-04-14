import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiTrustedshops } from "react-icons/si";
import { useAuth } from '../context/Auth';
import toast from 'react-hot-toast';
import SearchInput from './Form/SearchInput';
import useCategory from '../hooks/useCategory';
import { useCart } from '../context/Cart';
import { Badge } from 'antd';
import { BsCart2 } from "react-icons/bs";




const Navbar = () => {
  const [cart]=useCart()
  const [auth,setAuth]=useAuth()
  const categories=useCategory()

  const handleLogout=()=>{
    setAuth({...auth,user:null,token:'',})
    toast.success('Logout Successfull')
    localStorage.removeItem('auth')
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/"><SiTrustedshops size={30} /> Ecom</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
        </li>
        <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
  <ul className="navbar-nav">
    <li className="nav-item dropdown">
      <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        CATEGORIES                                             
      </button>                
      <ul className="dropdown-menu dropdown-menu-dark">
        <li><NavLink className="dropdown-item" to={'/categories'}>All Categories</NavLink></li>
        {categories?.map((c)=>(
          <li><Link className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</Link></li>
        ))}
        
      </ul>
    </li>
  </ul>
</div>
        {
          !auth.user?(<>
          <li className="nav-item">
          <NavLink className="nav-link" to="/register">Register</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>         
          </>):(
            <>
            {/* <div>
          <li className="nav-item dropdown">
  <NavLink className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">                               
  {auth?.user?.name}
  </NavLink>                            
  <ul className="dropdown-menu">
    <li><NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role==='admin'?'admin':'user'}`}>Dashboard</NavLink></li>
    <li><NavLink className="dropdown-item" onClick={handleLogout} to="/login">Logout</NavLink></li>    
  </ul>
</li>
</div> */}


<div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
  <ul className="navbar-nav">
    <li className="nav-item dropdown">
      <button className="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        {auth?.user?.name}                                               
      </button>                
      <ul className="dropdown-menu dropdown-menu-dark">
        <li><NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role==='admin'?'admin':'user'}`}>Dashboard</NavLink></li>
        <li><NavLink className="dropdown-item" onClick={handleLogout} to="/login">Logout</NavLink></li>
      </ul>
    </li>
  </ul>
</div>

            </>
          )
        }
        
        <li className="nav-item ms-2">
          <Badge count={cart?.length} showZero>
          <NavLink className="nav-link" to="/cart"><BsCart2 size={30} />


 ({cart.length})</NavLink>
          </Badge>
          
        </li>
      </ul>
      <SearchInput />
      
      
    </div>
  </div>
</nav>
  );
};

export default Navbar;