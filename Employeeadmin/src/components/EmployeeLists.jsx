import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContent';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const { setUpdateid } = useContext(UserContext);
  const navigate = useNavigate();

  // Fetch employee data
  const handleEmployeeData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Emplists');
      setEmployees(response.data || []); 
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  // Delete employee
  const handleDelete = async (id) => {
    try {
      await axios.post('http://localhost:5000/remove', { id });
      alert('Employee Deleted Successfully');
      handleEmployeeData(); 
    } catch (error) {
      console.error('Error deleting data:', error.message);
    }
  };

  // Update employee
  const handleUpdate = (employee) => {
    setUpdateid(employee); // Set the employee to update context
    navigate('/create'); // Navigate to the create page for update
  };

  // Fetch data on component mount
  useEffect(() => {
    handleEmployeeData();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold font-serif text-gray-800 text-center mb-4">
        Employees List
      </h1>
      <h3 className="mr-8 font-xl text-black font-bold">count: {employees.length}</h3>

      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-slate-500 text-white">
            <th className="px-4 py-2 border">Id</th>
            <th className="px-4 py-2 border">Image</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Mobile No</th>
            <th className="px-4 py-2 border">Designation</th>
            <th className="px-4 py-2 border">Gender</th>
            <th className="px-4 py-2 border">Course</th>
            <th className="px-4 py-2 border">Created Date</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.id || employee._id} className="hover:bg-gray-200">
              <td className="px-4 py-2 border">{index + 1}</td>
              <td className="px-4 py-2 border">
                <img
                  src={`http://localhost:5000/uploads/${employee.profilePicture}`}
                  alt="Employee"
                  className="w-16 h-16 object-cover rounded-full"
                />
              </td>
              <td className="px-4 py-2 border">{employee.name}</td>
              <td className="px-4 py-2 border">{employee.email}</td>
              <td className="px-4 py-2 border">{employee.phone}</td>
              <td className="px-4 py-2 border">{employee.designation}</td>
              <td className="px-4 py-2 border">{employee.gender}</td>
              <td className="px-4 py-2 border">{employee ? employee.courses : 'N/A'}</td>
              <td className="px-4 py-2 border">
                {employee.DateCreated?.slice(0, 10)}
              </td>
              <td className="px-4 py-2 border">
                <button
                  className="px-4 py-2 bg-teal-500 text-white rounded-md"
                  onClick={() => handleUpdate(employee)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md ml-2"
                  onClick={() => handleDelete(employee.id || employee._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
