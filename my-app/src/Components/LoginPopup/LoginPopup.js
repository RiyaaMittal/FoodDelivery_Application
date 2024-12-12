import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { Storecontext } from '../../context/Storecontext.js';
import axios from 'axios'

const LoginPopup = ({setshowlogin}) => {
    const {url,settoken}=useContext(Storecontext);
    const [currstate,setcurrstate]=useState("Sign-up");
    const[data,setdata]=useState({
        name:"",
        email:"",
        password:""
    });

    const onchangehandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setdata((data)=>({...data,[name]:value}));

    }

    const onlogin= async (event)=>{
        event.preventDefault();
        let newurl=url;
        if(currstate=="Login"){
            newurl+="/api/user/login";
        }
        else{
            newurl+="/api/user/register";
        }

        const response=await axios.post(newurl,data);
        if(response.data.success){
            settoken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setshowlogin(false);
            console.log(response.data);

        }
        else{
            alert(response.data.message);
        }


    }


  return (
    <div className='login-popup'>
        <form className='login-popup-container' onSubmit={onlogin}>
            <div className='login-popup-title'>
                <h1>{currstate}</h1>
                <img onClick={()=>{setshowlogin(false)}} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-E6qvYN5FX1gdoAg_4Wt18CbKVpPojtloOQ&s'/>
            </div>
            <div className='login-popup-inputs'>
                {currstate==="Login"?<></>:<input name='name' onChange={onchangehandler} value={data.name} type='text' placeholder='your name'  required/>}
                {/*<input type='text' placeholder='your name'  required/>*/}
                <input name='email' value={data.email} onChange={onchangehandler} type='email' placeholder='your email'  required/>
                <input name='password' value={data.password} onChange={onchangehandler} type='password' placeholder='password'  required/>
            </div>
            <button type='submit'>{currstate==="Sign-up"?"Create account":"Login"}</button>
            <div className='login-popup-condition'>
                <input type='checkbox'  required/>
                <p>by Continuing,I agree to the terms of use & privacy policy</p>

            </div>
            <div>
                {
                currstate==="Login"?
                <p>Create a new account?<span onClick={()=>{setcurrstate("Sign-up")}}>Click here</span></p>
                :<p>Already have an account?<span onClick={()=>{setcurrstate("Login")}}>Login here</span></p>
            }
            </div>


        </form>
    </div>
  )
}

export default LoginPopup