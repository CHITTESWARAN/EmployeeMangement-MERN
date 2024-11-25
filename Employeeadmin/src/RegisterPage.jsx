import React, { useContext, useState } from 'react';
import axios from "axios";
import {useNavigate} from  "react-router-dom"
import { UserContext } from './UserContent';
import { FaEyeSlash } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";

const Registerpage = () => {
    const[username,setusername]=useState("");
    const[password,setpassword]=useState("");
    const [showPassword,setShowPassword]=useState(false);
    const [redirect,setRedirect]=useState(false)
    const { login, setlogin } = useContext(UserContext);
    const navigate = useNavigate();

    async function handleRegisterpage(e)
    { e.preventDefault();
       await  axios.post("http://localhost:5000/register",{username,password})
        .then((result)=>{
          alert("Registeration Successful")
          setRedirect(true);
        
        })
        .catch((err)=>(alert("Registeration failed")))
        setusername("");
        setpassword("");
        

      
  if (redirect ) {
   navigate("/login")
  }  
      
    }
    function togglePasswordVisibility()
    {
       setShowPassword(!showPassword)
    }
  return (
    <form  className='max-w-[38%] mx-auto mt-32' onSubmit={handleRegisterpage}>
        <h1 className='w-full text-center my-12 text-3xl font-bold'>Register</h1>
      <input
        type="text"
        value={username}
        onChange={(e)=>(setusername(e.target.value))}
        placeholder="Username"
        className="block mb-5 w-full py-1.5 px-2 border-2 border-solid border-gray-300 rounded-md bg-white"
      />
      <div className='flex text-md'>
      <input
        type={showPassword?"text":"password"}
        value={password}
        onChange={(e)=>(setpassword(e.target.value))}
        placeholder="Password"
        className="block mb-5 w-full py-1.5 px-2 border-2 border-solid border-gray-300 rounded-md bg-white"
      />
      <div onClick={togglePasswordVisibility} className="cursor-pointer  flex justify-center p-0.5  border-2 border-gray-300 h-11 items-center rounded-md">
            {showPassword ? <IoEye /> : <FaEyeSlash />}
        </div>
        </div>
      <button type='submit' className='block w-full bg-gray-700 text-white rounded-md py-2'>
        Register
      </button>
    </form>
  );
};

export default Registerpage;
