// routes/employeeRoutes.js
const express = require('express');
const upload = require('../config/config'); // Import multer config from config.js
const Employee = require('../Models/emp_detail'); // Assuming Employee model exists
const router = express.Router();
import { useContext } from 'react';


// POST route for creating employee profiles
router.post('/api/employees', upload.single('file'), async (req, res) => {
  const { name, email, phone, designation, gender, course } = req.body;
  const file = req.file;

  try {
    // Create the employee document
    const newEmployee = new Employee({
      name,
      email,
      phone,
      designation,
      gender,
      course: course.split(','), // Assuming `course` is a comma-separated string
      profilePic: file ? file.filename : null, // Save the filename
    });

    await newEmployee.save();

    res.json({
      message: 'Employee profile created successfully',
      data: newEmployee,
    });
  } catch (error) {
    console.error('Error creating employee:', error.message);
    res.status(500).json('Error creating employee');
  }
});

router.put('/api/update', upload.single('file'), async (req, res) => {
  const { id, name, email, phone, designation, gender, course } = req.body;
  const file = req.file;

  try {
    // Find the employee by ID
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Update the fields
    const updatedData = {
      name,
      email,
      phone,
      designation,
      gender,
      course: course.split(','),
    };

    // If a new profile picture is uploaded, update it
    if (file) {
      updatedData.profilePic = file.filename; // Store the new profile picture filename
    }

    // Perform the update
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedData, { new: true });

    res.json({
      message: 'Employee updated successfully',
      data: updatedEmployee,
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Error updating employee' });
  }
});

module.exports = router;
