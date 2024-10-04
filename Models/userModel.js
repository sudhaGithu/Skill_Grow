const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: false // Now optional
  },
  image: {
    type: String // This will store the path to the uploaded image
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  idProof: {
    type: String // Assuming ID proof can be stored as a string (e.g., file path or URL)
  },
  status: {
    type: Boolean,
    default: true
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: false // Now optional
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('User', userSchema);
