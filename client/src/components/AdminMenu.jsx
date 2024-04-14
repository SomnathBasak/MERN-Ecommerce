import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
    return (
        <>
            <div className="list-group text-center">
                <h1>Admin Panel</h1>
          <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Create Category</NavLink>
          <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create Product</NavLink>
          <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">Manage Products</NavLink>
          <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action">Manage Orders</NavLink>
          <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Manage Users</NavLink>
          </div>

        </>
    );
};

export default AdminMenu;