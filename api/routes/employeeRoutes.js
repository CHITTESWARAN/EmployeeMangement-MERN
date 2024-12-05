const express = require('express');
const upload = require('../config/config'); 
const Employee = require('../Models/emp_detail');
const router = express.Router();
import { useContext } from 'react';



router.post('/api/employees', upload.single('file'), async (req, res) => {
  const { name, email, phone, designation, gender, course } = req.body;
  const file = req.file;

  try {
 
    const newEmployee = new Employee({
      name,
      email,
      phone,
      designation,
      gender,
      course: course.split(','), 
      profilePic: file ? file.filename : null, 
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
 
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

  
    const updatedData = {
      name,
      email,
      phone,
      designation,
      gender,
      course: course.split(','),
    };


    if (file) {
      updatedData.profilePic = file.filename; 
    }

 
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
