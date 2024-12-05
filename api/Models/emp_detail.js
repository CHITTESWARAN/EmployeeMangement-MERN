const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  courses: { type: [String], required: true },
  profilePicture: { type: String, required: true },
  DateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Employee', employeeSchema);
