import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const IndexPage = () => {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 10000);

   
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='flex-col justify-center items-center min-h-[100vh] w-auto text-center'>
      {showMessage && (
        <div style={{ color: 'red', fontSize: '20px' }} className='animate-bounce'>
          Welcome to admin panel
        </div>
      )}

      <div className='flex mr-4 gap-4 ml-8'>
        <Link
          to="/create"
          className="inline-block mt-4 px-4 py-2 rounded-md bg-teal-500 hover:bg-teal-600 text-sm font-medium text-white"
        >
          Create Employee
        </Link>
        <Link
          to="/EmployeeList"
          className="inline-block mt-4 px-4 py-2 rounded-md bg-teal-500 hover:bg-teal-600 text-sm font-medium text-white"
        >
          Employee List
        </Link>
      </div>
    </div>
  );
};

export default IndexPage;
