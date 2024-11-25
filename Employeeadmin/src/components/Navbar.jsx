import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContent';
import { useContext } from 'react';

const Navbar = () => {
  const { login, setUpdateid } = useContext(UserContext);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-md">
  
      <div className="flex items-center space-x-2">
        <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
          <span className="text-gray-800 font-bold">D</span>
        </div>
        <h1 className="text-2xl font-bold tracking-wide">DealsDray</h1>
      </div>

   
      <nav className="hidden md:flex space-x-6">
        <Link to="/" className="text-sm uppercase font-semibold hover:text-gray-300">
          Home
        </Link>
      </nav>

      <div className="flex items-center space-x-4">
        {login ? (
          
          <span className="text-sm text-white">Hi, {login}</span>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-sm font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500 text-sm font-medium"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
