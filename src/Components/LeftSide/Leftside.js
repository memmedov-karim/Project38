import React from 'react';
import './leftside.css';
import { Link } from 'react-router-dom';
export default function Leftside({currentAdmin,setCurrentAdmin}) {
    const location = window.location.pathname;
    console.log(window.location.href);
    const Logout = () => {
        // localStorage.removeItem("currentAdmin");
        // setCurrentAdmin(null);
        // window.location.href='/admin';
        window.location.href = '/admin';
        localStorage.removeItem("currentAdmin");
        setCurrentAdmin(null);
        // console.log(window.location.href)

    }
  return (
    <div className='leftside'>
        <h2>Admin Panel,{currentAdmin?.name}</h2>
        <div className='admin-container'>
            <Link className='link' style = {{color:location==='/admin'?"red":"black"}} to='/admin'>Admins</Link>
            <Link className='link' style = {{color:location==='/admin/products'?"red":"black"}} to='/admin/products'>Products</Link>
            <Link className='link' style = {{color:location==='/admin/orders'?"red":"black"}} to='/admin/orders'>Orders</Link>
            <Link className='link' style = {{color:location==='/admin/users'?"red":"black"}} to='/admin/users'>Users</Link>
            <div className='link' onClick={Logout}>Logout</div>
        </div>
    </div>
  )
}
