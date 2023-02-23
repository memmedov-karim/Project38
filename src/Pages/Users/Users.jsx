import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Leftside from '../../Components/LeftSide/Leftside';
import AdminLogin from '../AdminLogin/AdminLogin';
import './users.css';
export default function Users({currentAdmin,setCurrentAdmin}) {
  const [id,setId] = useState("");
  const [users,setUsers] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:7777/api/users').then(dt=>setUsers(dt.data)).catch(err=>console.log(err))
  },[]);
  const deleteUser = (id) => {
    axios.get(`http://localhost:7777/api/deleteUser/${id}`);
    const returned = users.filter(ob=>ob._id !== id);
    setUsers(returned)
  }
  const [updateValues,setUpdateValues] = useState({
    name:"",
    surname:"",
    email:"",
    password:"",
    isAdmin:"",
  })
  const getUpdateValues = (e) => {
    const {name,value} = e.target;
    setUpdateValues((prev)=>{
      return {
        ...prev,
        [name]:value
      }
    })

  }
  const getId = (id) => {
    setId(id)
    const {name,surname,email,password,isAdmin} = users.find(o=>o._id === id)
    setUpdateValues({
      name:name,
      surname:surname,
      email:email,
      password:password,
      isAdmin:isAdmin
    })
  }
  const updateProduct = async (id) => {
    axios.put(`http://localhost:7777/api/updateuser/${id}`,updateValues)
    const returned = users.map(val=>{
      return val._id === id ?
      updateValues:
      val
    })
    setUsers(returned)
  }
  const update = (e) => {
    e.preventDefault();
    updateProduct(id);
    setId("")
  }
  const UserData = users?.map((obj,ind)=>{
    return <tr key={ind}>
    <th scope="row">{ind + 1}</th>
    <td>{obj.name}</td>
    <td>{obj.surname}</td>
    <td>{obj.email}</td>
    <td>{obj.isAdmin ? "Admin" :"User"}</td>
    <td>
      <button onClick={()=>deleteUser(obj._id)} >Delete</button>
      <button onClick={()=>getId(obj._id)} >Update</button>
    </td>
  </tr>
  })
  return (
    <div className='users'>
        {
            JSON.parse(localStorage.getItem("currentAdmin"))?<>
            <Leftside currentAdmin={currentAdmin}
            setCurrentAdmin={setCurrentAdmin}/>
        <div className='users-right'>
        {id &&<div className="update-products">
            <form onSubmit={update} className='update-form'>
              <input onChange={getUpdateValues} name="name" value={updateValues.name} type="text" placeholder='title' />
              <input onChange={getUpdateValues} name="surname" value={updateValues.surname} type="text" placeholder='description' />
              <input onChange={getUpdateValues} name="email" value={updateValues.email} type="text" placeholder='price' />
              <input onChange={getUpdateValues} name="password" value={updateValues.password} type="text" placeholder='image' />
              <input type="submit" value="update" />
            </form>
          </div>}
        <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Surname</th>
                  <th scope="col">Email</th>
                  <th scope="col">isAdmin</th>
                  <th scope='col'>Update</th>
                </tr>
              </thead>
              <tbody>{UserData}</tbody>
            </table>
        </div>

            </>:
            <AdminLogin />
        }
        
    </div>
  )
}
