const Admin = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const Role = require('../Models/Roles/roleModel');
const bcrypt = require('bcryptjs');

// Create admin
const createUser = async (req, res) => {
  try {
    const { fullName, phoneNumber, email, password, role } = req.body;

    // Password validation (optional)
    if (!password || password.length < 6) {
      return res.status(400).json({ status: false, message: 'Password must be at least 6 characters long.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
      fullName,
      phoneNumber: phoneNumber || null,
      email,
      password: hashedPassword,
      image: req.files['image']?.[0]?.path || null,
      idProof: req.files['idProof']?.[0]?.path || null,
      role: role || null,
    });

    await admin.save();
    res.status(201).json({ status: true, message: 'User created successfully', data: admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: 'Error creating user', error: err.message });
  }
};

// Get all instructors
const getInstructors = async (req, res) => {
  try {
    const instructorRole = await Role.findOne({ name: 'Instructor' });

    if (!instructorRole) {
      return res.status(404).json({ status: false, message: 'Instructor role not found.' });
    }

    const instructors = await Admin.find({ role: instructorRole._id, deleted: false });

    if (instructors.length === 0) {
      return res.status(404).json({ status: false, message: 'No instructors found.' });
    }

    res.status(200).json({ status: true, data: instructors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Error fetching instructors', error: error.message });
  }
};

// Read all admins
const getAllUsers = async (req, res) => {
  try {
    const admins = await Admin.find({ deleted: false }).populate('role');
    res.status(200).json({ status: true, data: admins });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: 'Error fetching users', error: err.message });
  }
};

// Read admin by ID
const getUserById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).populate('role');
    if (!admin || admin.deleted) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }
    res.status(200).json({ status: true, data: admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: 'Error fetching user', error: err.message });
  }
};

// Update admin by ID
const updateUserById = async (req, res) => {
  try {
    const { fullName, phoneNumber, email } = req.body;
    const admin = await Admin.findByIdAndUpdate(req.params.id, {
      fullName,
      phoneNumber,
      email,
    }, { new: true });

    if (!admin) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    res.status(200).json({ status: true, message: 'User updated successfully', data: admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: 'Error updating user', error: err.message });
  }
};

// Delete admin by ID (soft delete)
const deleteUserById = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.params.id, {
      deleted: true
    }, { new: true });

    if (!admin) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    res.status(200).json({ status: true, message: 'User soft deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: 'Error deleting user', error: err.message });
  }
};

// Update admin status by ID
const userStatus = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    // Toggle the status
    admin.status = !admin.status;
    await admin.save();
    res.status(200).json({ status: true, message: 'User status updated successfully', data: admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: 'Error updating user status', error: err.message });
  }
};

// User login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });

    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    if (await bcrypt.compare(password, user.password)) {
      const payload = { user: { id: user.id, email: user.email } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });

      res.status(200).json({ status: true, message: 'Login successful', token });
    } else {
      res.status(401).json({ status: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Unable to login user', error: error.message });
  }
};

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
  userStatus,
  getInstructors,
  loginUser
};
