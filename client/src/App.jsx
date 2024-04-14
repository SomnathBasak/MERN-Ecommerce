import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Register from './pages/Register';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import { Toaster } from "react-hot-toast";
import Home from './pages/Home';
import PrivateRoute from './components/routes/Private';
import Error from './pages/Error';
import ForgotPassword from './pages/ForgotPassword';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Dashboard from './pages/user/Dashboard';
import AdminRoute from './components/routes/Admin';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/Admin/AdminOrders';

const App = () => {
    return (
        <div>
            <BrowserRouter>
            <Navbar/>
            <main style={{ minHeight: "81vh" }}>
                <Toaster/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/cart' element={<CartPage/>}/>
                <Route path='/categories' element={<Categories/>}/>
                <Route path='/category/:slug' element={<CategoryProduct/>}/>
                <Route path='/product/:slug' element={<ProductDetails/>}/>
                <Route path='/search' element={<Search/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/forgot-password' element={<ForgotPassword/>}/>


                <Route path='/dashboard' element={<PrivateRoute/>}>
                    <Route path='user' element={<Dashboard/>}/>
                    <Route path='user/profile' element={<Profile/>}/>
                    <Route path='user/orders' element={<Orders/>}/>
                </Route> 
                <Route path='/dashboard' element={<AdminRoute/>}>
                    <Route path='admin' element={<AdminDashboard/>}/>
                    <Route path='admin/create-category' element={<CreateCategory/>}/>
                    <Route path='admin/create-product' element={<CreateProduct/>}/>
                    <Route path='admin/product/:slug' element={<UpdateProduct/>}/>
                    <Route path='admin/products' element={<Products/>}/>
                    <Route path='admin/users' element={<Users/>}/>
                    <Route path='admin/orders' element={<AdminOrders/>}/>
                </Route>  


                <Route path='/about' element={<About/>}/>
                <Route path='/contact' element={<Contact/>}/>
                <Route path='/policy' element={<Policy/>}/>
                <Route path='*' element={<Error/>}/>
            </Routes>
            </main>
            <Footer/>
            </BrowserRouter>
        </div>
    );
};

export default App;