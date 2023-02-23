import React from 'react';
import './adminlogin.css';
import axios from 'axios';
export default function AdminLogin({setCurrentAdmin}) {
    const [Loginadmin,setLoginAdmin] = React.useState({
        email:"",
        password:""
    })
    const getAdminLoginInfo = (e) => {
        const {name,value} = e.target;
        setLoginAdmin((prev)=>{
            return {
                ...prev,
                [name]:value
            }
        })
    }
    const AxiosLogin = async () => {
        try {
            const Admin = await axios.post('http://localhost:7777/api/loginadmin',Loginadmin);
            
            if(Admin.data.admin){
                setCurrentAdmin(Admin.data.admin);
                localStorage.setItem("currentAdmin",JSON.stringify(Admin.data.admin))


            }
            console.log(Admin.data)
            // if(Admin.value){
            //     setCurrentAdmin(Admin.value.data.admin);
            //     localStorage.setItem("currentAdmin",JSON.stringify(Admin.value.data.admin))
            //     window.location = '/admin'
            // }
            // else{
            //     console.log("Incorrect")

            // }
            
            
        } catch (error) {
            console.log("error:",error)
        }
        
    }
    const Login = (e) => {
        e.preventDefault();
        AxiosLogin();
        // console.log(Loginadmin)
    }
  return (
    <div className='adminlogin'>
        <h2>Admin Login</h2>
        <form onSubmit={Login} className='admin-login'>
            <div className='input-box'>
                <p>Email:</p>
                <input onChange={getAdminLoginInfo} name='email' type="email" placeholder='email..' value={Loginadmin.email} />
            </div>

            <div className='input-box'>
                <p>Password:</p>
                <input onChange={getAdminLoginInfo} name='password' type="password" placeholder='password..' value={Loginadmin.password} />
            </div>
            <input className='btn-admin-login' type="submit" value="Login" />

        </form>
    </div>
  )
}
