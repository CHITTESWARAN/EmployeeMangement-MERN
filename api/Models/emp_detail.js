const mongoose = require("mongoose");

// Employee Schema
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  courses: {
    type: [String], // Array of strings for courses like ["MCA", "BCA"]
    required: true,
  },
  profilePicture: {
    type: String, // Path to the uploaded image
    required: true,
  },
  DateCreated: { type: Date, default: Date.now },
});

// Employee Model
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
