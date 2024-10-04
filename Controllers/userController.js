const Admin = require('../Models/userModel')
const jwt = require('jsonwebtoken')
const Role = require('../Models/Roles/roleModel')
const bcrypt = require('bcryptjs');
// Create admin
//app.post('/admin', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'idProof', maxCount: 1 }]), 
const createUser = async (req, res) => {
  try {
    //console.log("sudha");
    
      const { fullName, phoneNumber, email, password, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const admin = new Admin({
          fullName,
          phoneNumber: phoneNumber || null, // Allow phoneNumber to be optional
          email,
          password: hashedPassword,
          image: req.files['image'] && req.files['image'].length > 0 ? req.files['image'][0].path : null, // Optional field
          idProof: req.files['idProof'] && req.files['idProof'].length > 0 ? req.files['idProof'][0].path : null, // Optional field
          role: role || null // Allow role to be optional
      });

      await admin.save();
      res.status(201).json(admin);
  } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
  }
};

// Get all instructors
const getInstructors = async (req, res) => {
  try {
      // Find the instructor role
      const instructorRole = await Role.findOne({ name: 'Instructor' }); // Replace 'Instructor' with the exact role name

      if (!instructorRole) {
          return res.status(404).json({ message: 'Instructor role not found.' });
      }

      // Fetch all users with the instructor role
      const instructors = await Admin.find({ role: instructorRole._id, deleted: false });

      if (instructors.length === 0) {
          return res.status(404).json({ message: 'No instructors found.' });
      }

      res.json(instructors);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
  }
};

  
  // Read all admins
const getallUsers = async (req, res) => {
    try {
        const admins = await Admin.find({ deleted: false }).populate('role');
        res.json(admins);
      } catch (err) {
        console.error(err);
        res.status(500).json({message : err.message});
      }
  };
  
  // Read admin by ID
const getUserById =  async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id).populate('role');
        if (!admin || admin.deleted) {
          return res.status(404).json('user not found');
        }
        res.status(200).json(admin);
      } catch (err) {
        console.error(err);
        res.status(500).json({message : err.message});
      }
  };
  
  // Update admin by ID
const updateUserById = async (req, res) => {
    try {
      const { fullName, phoneNumber, email} = req.body;
      console.log(req.body);
      const admin = await Admin.findByIdAndUpdate(req.params.id, {
        fullName,
        phoneNumber,
        email
      } , { new: true });
  
      if (!admin) {
        return res.status(404).json('User not found');
      }
  
      res.status(200).json(admin);
    } catch (err) {
      console.error(err);
      res.status(500).json({message : err.message});
    }
  };
  
  // Delete admin by ID
const deleteUserById =  async (req, res) => {
    try {
        const admin = await Admin.findByIdAndUpdate(req.params.id, {
          deleted: true
        }, { new: true });
    
        if (!admin) {
          return res.status(404).json('User not found');
        }
    
        res.status(200).json('User soft deleted successfully');
      } catch (err) {
        console.error(err);
        res.status(500).json({message : err.message});
      }
  };

  // Update admin status by ID
const userStatus =  async (req, res) => {
    try {
      const admin = await Admin.findById(req.params.id);
  
      if (!admin) {
        return res.status(404).json('User not found');
      }
  
      // Toggle the status (true to false or false to true)
      admin.status = !admin.status;
  
      await admin.save();
      res.status(200).json(admin);
    } catch (err) {
      console.error(err);
      res.status(500).json({message : err.message});
    }
  };


  const loginUser = async (req, res) => {
    try{
    const { email, password } = req.body
    const user = await Admin.findOne({ email })
       // Generate JWT token
       const payload = { user: {
        id: user.id,
        email: user.email
        // Add any other fields you want to include in the token
      } };
       const token = jwt.sign(payload,process.env.JWT_SECRET, { expiresIn: '12h' });
       if (user && (await bcrypt.compare(password, user.password))) {
  
      //logger.info('Admin logged in successfully', { adminId: user._id });
  
        res.status(200).json({
          message:"login successfully",
            token: token
        })
  }
  else{
  
        // Log login attempt with invalid credentials
        //logger.warn('Invalid login attempt', { email: email });
  
    res.json({
      message:"Invalid credentials"
    })
  }
  }catch(error){
    //logger.error('Error logging in admin:', { error: error.message });
    res.status(500).json({ error: 'Unable to login User',
      message : error.message
     });
  
  }
  }

module.exports = {
    createUser,
    getUserById,
    getallUsers,
    updateUserById,
    deleteUserById,
    userStatus,
    getInstructors,
    loginUser
}