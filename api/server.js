const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Models
const User = require('./Models/user'); 
const Employee = require('./Models/emp_detail'); 
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname); 
    const fileName = Date.now() + fileExt;
    cb(null, fileName);
  }
});


const upload = multer({ storage: storage });

// MongoDB Connection
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error in the connection:', error.message);
  }
};

// Call the database connection
connectDb();

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; 
  
  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid" });
    }
    req.user = user;
    next();
  });
};


// User registration and login routes
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userDoc = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully', user: { id: userDoc._id, username: userDoc.username } });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).send('Error registering user');
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
      return res.status(400).json('Wrong credentials');
    }

    const passOk = await bcrypt.compare(password, userDoc.password);
    if (passOk) {
      jwt.sign({ username, id: userDoc._id }, process.env.JWT_SECRET, {}, (err, token) => {
        if (err) {
          console.error('Error signing JWT:', err.message);
          return res.status(500).json('Error signing JWT');
        }
        res.cookie('token', token, { httpOnly: true, secure: false }).json({ id: userDoc._id, username });
      });
    } else {
      res.status(400).json('Wrong credentials');
    }
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json('Server error');
  }
});
 
app.post('/api/employees', upload.single('profilePicture'), async (req, res) => {
  const { name, email, phone, designation, gender, course } = req.body;
  const profilePicture = req.file;

  if (!profilePicture) {
    return res.status(400).json('Profile picture is required');
  }

  try {
    // Create the employee document
    const newEmployee = new Employee({
      name,
      email,
      phone,
      designation,
      gender,
      courses: course ? course.split(',') : [], 
      profilePicture: profilePicture.filename, 
    });

    // Save the employee in the database
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

// GET route for fetching all employee profiles
app.get('/Emplists',async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json("Error on fetching the data");
  }
});

// POST route for deleting an employee
app.post('/remove',async (req, res) => {
  const { id } = req.body;

  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully", employee });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: "Error deleting the employee" });
  }
});

// POST route for updating an employee's details
app.post('/api/update',async (req, res) => {
  const { id, ...updates } = req.body;  
  console.log('Received update for employee with ID:', id);  

  try {
    const employee = await Employee.findByIdAndUpdate(
      id,
      updates,  
      { new: true }
    );
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee updated successfully", employee });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: "Error updating the employee" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
