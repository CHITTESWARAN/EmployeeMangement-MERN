import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './UserContent';

const CreateForm = () => {
  const { updateid, setUpdateid } = useContext(UserContext);
  const [id, setid] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [dateCreated, setDateCreated] = useState('');
  const [file, setFile] = useState(null);
  const [course, setCourse] = useState([]);
  const navigate = useNavigate();

  // Populate the form if updateid exists (for updating an employee)
  useEffect(() => {
    if (updateid) {
      setid(updateid._id);
      setName(updateid.name);
      setEmail(updateid.email);
      setPhone(updateid.phone);
      setDesignation(updateid.designation);
      setGender(updateid.gender);
      setCourse(Array.isArray(updateid.courses) ? updateid.courses : updateid.courses.split(',') || []);
      setFile(updateid?.profilePicture || null);
      setDateCreated(updateid.DateCreated);
    }
  }, [updateid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !designation || !gender) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('id', id);
    formData.append('phone', phone);
    formData.append('designation', designation);
    formData.append('gender', gender);
    formData.append('courses', Array.isArray(course) ? course.join(',') : course);
    formData.append('DateCreated', dateCreated || Date.now());
    console.log(formData.course,course,file);
   
    

    if (file) {
      formData.append('profilePicture', file);
    }

    try {
      const url = updateid ? 'http://localhost:5000/api/update' : 'http://localhost:5000/api/employees';

      const response = await axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Success:', response.data);
      alert(updateid ? 'Employee updated successfully!' : 'Employee created successfully!');
      // Clear form after submission
      setName('');
      setEmail('');
      setPhone('');
      setDesignation('');
      setGender('');
      setCourse([]);
      setFile(null);
      setUpdateid(null);
      navigate('/');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      alert('Error saving data');
    }
  };

  // Handle checkbox change for courses
  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setCourse((prevCourses) =>
      prevCourses.includes(value) ? prevCourses.filter((course) => course !== value) : [...prevCourses, value]
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md border border-gray-300"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {updateid ? 'Update Profile' : 'Create Profile'}
        </h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designation</label>
          <select
            id="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>Select your designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <div className="mt-2 flex space-x-4">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === 'Male'}
              />
              <span className="ml-2">Male</span>
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === 'Female'}
              />
              <span className="ml-2">Female</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Courses</label>
          <div className="flex space-x-4">
            {['MCA', 'BCA', 'BSC'].map((c) => (
              <label key={c}>
                <input
                  type="checkbox"
                  value={c}
                  onChange={handleCheckboxChange}
                  checked={course.includes(c)}
                />
                <span className="ml-2">{c}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">Upload Profile Picture</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/png, image/jpeg"
            className="w-full mt-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-500 text-white py-3 rounded-md hover:bg-teal-600"
        >
          {updateid ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
