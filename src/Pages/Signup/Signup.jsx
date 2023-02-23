import React from 'react'
import './signup.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function Signup() {
    const [registeruser,setRegisterUser] = React.useState({
        name:"",
        surname:"",
        email:"",
        password:""
    })
    const [show,setShow] = React.useState("");
    const getregisterValue = (e) => {
        const {name,value} = e.target;
        setRegisterUser((prev)=>{
            return {
                ...prev,
                [name]:value
            }
        })
    }
    const regUser = async () => {
        await axios.post('http://localhost:7777/api/registeruser',registeruser).then(dt=>{
            if(dt.data.data){
                setShow(dt.data.message)
            }
            else{
                setShow(dt.data)
            }
        })

    }
    const registerUser = (e) => {
        e.preventDefault();
        regUser();
        console.log(registeruser)
    }
  return (
    <div className='signup'>
        <h1>Signup Page</h1>
        {show}
        <form onSubmit={registerUser}>
            <input type="text" placeholder='name..' value={registeruser.name} name="name" onChange={getregisterValue} />
            <input type="text" placeholder='surname..' value={registeruser.surname} name="surname" onChange={getregisterValue} />
            <input type="text" placeholder='email..' value={registeruser.email} name="email" onChange={getregisterValue} />
            <input type="text" placeholder='password..' value={registeruser.password} name="password" onChange={getregisterValue} />
            <input type="submit" value="register" />
        </form>
        <Link to='/login'>Login</Link>
    </div>
  )
}
