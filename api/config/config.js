// config.js
const multer = require('multer');
const path = require('path');

// Define where to store the files and the file naming convention
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Directory where the uploaded files will be stored
  },
  filename: (req, file, cb) => {
    // Use the current timestamp for unique file names
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Filter file types (optional, only allow images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG are allowed'), false);
  }
};

// Create multer instance with the storage and filter options
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

module.exports = upload;
