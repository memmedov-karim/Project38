import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Leftside from '../../Components/LeftSide/Leftside';
import './orders.css';
import AdminLogin from '../AdminLogin/AdminLogin';
export default function Orders({currentAdmin,setCurrentAdmin}) {
  const [orders,setorders]= useState([]);
  useEffect(()=>{
    axios.get('http://localhost:7777/api/orders').then(dt=>{
      setorders(dt.data)
    })
  },[])
  console.log(orders)
  const deleteOrder = (id) => {
    axios.get(`http://localhost:7777/api/deleteorder/${id}`);
    const returned = orders.filter(o=>o._id !== id);
    setorders(returned)
  }
  const sendOrder = async (id) => {
    axios.put(`http://localhost:7777/api/sendorder/${id}`).then(dt=>console.log(dt.data));
    const returned = orders?.map((obj)=>{
      return obj._id === id?{
        ...obj,
        isSend:true
      }:
      obj
    })
    setorders(returned)

  }
  const OrderData = orders?.map((obj,ind)=>{
    return <tr key={ind}>
    <th scope="row">{ind + 1}</th>
    <td>{obj.name}</td>
    <td>{obj.email}</td>
    <td>{obj.product}</td>
    <td>{obj.count}</td>
    <td>{obj.price}</td>
    <td>{Number(obj.count)*Number(obj.price)} Azn</td>
    <td>{obj.isSend ? "sended" :"not send"}</td>
    <td>
      <button onClick={()=>deleteOrder(obj._id)}  >Delete</button>
      <button onClick={()=>sendOrder(obj._id)} >Send</button>
    </td>
  </tr>
  })

  return (
    <div className='orders'>
        {
            JSON.parse(localStorage.getItem("currentAdmin")) ? <>
            <Leftside currentAdmin={currentAdmin}
            setCurrentAdmin={setCurrentAdmin} />
        <div className='orders-right'>
        <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Product</th>
                  <th scope="col">Count</th>
                  <th scope='col'>Price</th>
                  <th scope='col'>Order-price</th>
                  <th scope='col'>isSend</th>

                </tr>
              </thead>
              <tbody>{OrderData}</tbody>
            </table>
        </div>
            </>:
            <AdminLogin />

        }
        
    </div>
  )
}
