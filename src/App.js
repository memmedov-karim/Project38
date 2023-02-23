import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Admins from './Pages/Admins/Admins';
import Orders from './Pages/Orders/Orders';
import Products from './Pages/Products/Products';
import Users from './Pages/Users/Users';
import React,{useState,useEffect} from 'react';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Home from './Pages/Home/Home';
import Product from './Pages/ProductDetail/Product';
import axios from 'axios';
function App() {
  const [currentAdmin, setCurrentAdmin] = useState(
    null || JSON.parse(localStorage.getItem("currentAdmin"))
  );
  const [products,setProducts] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:7777/api/products').then(dt=>setProducts(dt.data)).catch(err=>console.log(err))
    },[])
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home products = {products} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/product/:id' element={<Product products={products}/>} />
        <Route path='/admin' element={<Admins currentAdmin={currentAdmin} setCurrentAdmin={setCurrentAdmin} />} />
        <Route path='/admin/orders' element={<Orders currentAdmin={currentAdmin} setCurrentAdmin={setCurrentAdmin} />} />
        <Route path='/admin/products' element={<Products currentAdmin={currentAdmin} setCurrentAdmin={setCurrentAdmin} />} />
        <Route path='/admin/users' element={<Users currentAdmin={currentAdmin} setCurrentAdmin={setCurrentAdmin} />} />
      </Routes>
    </Router>
    
  );
}

export default App;
