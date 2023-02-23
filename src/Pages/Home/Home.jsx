import React,{useState,useEffect} from 'react'
import './home.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default function Home({products}) {
    const [currentUser,setCurrentUser] = useState(null || JSON.parse(localStorage.getItem("currentUser")))
    
    console.log(products)
    const ProductsDetail = products?.map((val,ind)=>{
        return <div key={ind} className='product'>
            <strong>Title:</strong>{val.title}
            <strong>Description:</strong>{val.description}
            <stron>Price:</stron>{val.price}
            <strong>Image:</strong><img src={val.image} style={{width:"60px",height:"60px"}} />
            <Link to={`/product/${val._id}`}>Detail</Link>
        </div>
    })
    const Logout = () => {
        localStorage.removeItem("currentUser");
        setCurrentUser(null)
    }
  return (
    <div className='home'>
        {currentUser ? <button onClick={Logout}>Logout</button>:<div><Link to='/login'>Sign In</Link><br /><Link to="/signup">SignUp</Link></div>}
        {currentUser?.name}
        <h1>Home Page</h1>
        
        <div className='products'>
            {ProductsDetail}

        </div>
    </div>
  )
}
