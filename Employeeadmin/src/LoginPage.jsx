import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { FaEyeSlash } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import { UserContext } from "../src/UserContent"; // Go up one level and into the components folder


const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Get context functions to update login state
  const { setlogin } = useContext(UserContext);

  // Handle login form submission
  function handleLogin(e) {
    e.preventDefault();

    axios.post("http://localhost:5000/login", { username, password }, { withCredentials: true })
      .then((respond) => {
        console.log(respond.data); // Log the response for now

        setlogin(username);  // Set login state to true
        
        setRedirect(true);  // Redirect to home after login
      })
      .catch((err) => {
        console.log(err.message); // Handle error
      });
  }

  // Redirect to home page if logged in
  if (redirect) {
    return <Navigate to="/" />;
  }

  // Toggle password visibility
  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  return (
    <div>
      <form className="max-w-[38%] mx-auto mt-32" onSubmit={handleLogin}>
        <h1 className="w-full text-center my-12 text-3xl font-bold">Login</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="block mb-5 w-full py-1.5 px-2 border-2 border-solid border-gray-300 rounded-md bg-white"
        />
        <div className="flex h-14">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="block mb-5 w-full py-1.5 px-2 border-2 border-solid border-gray-300 rounded-md bg-white"
          />
          <div
            onClick={togglePasswordVisibility}
            className="cursor-pointer flex justify-center p-0.5 border-2 border-gray-300 h-9 items-center rounded-md"
          >
            {showPassword ? <IoEye /> : <FaEyeSlash />}
          </div>
        </div>
        <button className="block w-full bg-gray-700 text-white rounded-md py-2" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
