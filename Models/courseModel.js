// models/Course.js
const mongoose = require('mongoose');

const curriculumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  videos: [{
    title: {
      type: String,
      required: true,
    },
    videoLink: {
      type: String,
      required: true,
    },
  }],
});

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

const courseSchema = new mongoose.Schema({
  
  thumbnailImage: { // New field for thumbnail image
    type: String,
    required: false,
  },baseVideo: {
    type: String,
    required: false,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Reference to the Category model
    required: true,
  },
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory', // Reference to the Subcategory model
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  priceType:{
    type : String,
    enum: ['Free', 'Paid']
    
  },
  instructorId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (for multiple instructors)
    required: true,
  }],
  date: {
    type: Date,
    required: true,
  },
  students: {
    type: Number,
    default: 0,
  },
  overview: {
    type: String,
    required: false,
  },
  curriculum: [curriculumSchema], // Store curriculum as an array of curriculumSchema
  reviews: [reviewSchema], // Store reviews as an array of reviewSchema
  languageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Language', // Reference to the Language model
    required: true,
  },
  skillLevelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SkillLevel', // Reference to the SkillLevel model
    required: true,
  },
  rating: {
    type: Number,
    default: 5,
},
duration: {
  type : String,
  require : true
},
lessons : {
  type : Number,
  required : true
},
quizzes : {
  type : Number,
  required : true
},certifications : {
  type : String,
  enum: ['Yes', 'No'],
  required : true
},
  deleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
