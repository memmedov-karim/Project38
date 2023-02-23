import React from 'react'
import './login.css';
import axios from 'axios';
export default function Login() {
    const [show,setShow] = React.useState("");
    const [loginuser,setloginuser] = React.useState({
        email:"",
        password:""
    })
    const getLoginValue = (e) => {
        const {name,value} = e.target;
        setloginuser((prev)=>{
            return {
                ...prev,
                [name]:value
            }
        })
    }
    const Login = async () => {
        axios.post('http://localhost:7777/api/loginuser',loginuser).then(dt=>{
            if(dt.data.user){
                setShow(dt.data.message)
                localStorage.setItem("currentUser",JSON.stringify(dt.data.user));
                window.location.href = '/'
            }
            else{
                setShow(dt.data)
            }
        })
    }
    const onSub = (e) => {
        e.preventDefault();
        Login();
        console.log(loginuser)
    }
  return (
    <div className='login'>
        <h1>Login Page</h1>
        {show}
        <form onSubmit={onSub}>
            <input type="email" name="email" placeholder='email..' value={loginuser.email} onChange={getLoginValue} />
            <input type="password" name="password" placeholder='password..' value={loginuser.password} onChange={getLoginValue} />
            <input type="submit" value="login" />
        </form>


    </div>
  )
}
