// routes/course.js
const express = require('express');
const Course = require('../Models/courseModel');
const router = express.Router();

// Create a new course
const createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all courses
// const getCourses = async (req, res) => {
//     try {
//         const courses = await Course.find({ deleted: false })
//             .populate('categoryId')          // Populate the category
//             .populate('subcategoryId')       // Populate the subcategory
//             .populate('price')       
//             .populate('instructorId')        // Populate instructors
//             .populate('languageId')          // Populate the language
//             .populate('skillLevelId');       // Populate the skill level

//             console.log(courses);
            
//         res.status(200).json(courses);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({ deleted: false })
            .populate('categoryId')          // Populate the category
            .populate('subcategoryId')       // Populate the subcategory
            .populate('price')               // Populate the price
            .populate('instructorId')        // Populate instructors
            .populate('languageId')          // Populate the language
            .populate('skillLevelId');       // Populate the skill level

        // Transform the data to include only the required fields
        const transformedCourses = courses.map(course => ({
            courseId: course._id,
            baseVideo: course.baseVideo,
            categoryName: course.categoryId?.name,
            subcategoryName: course.subcategoryId?.name,
            instructorName: course.instructorId[0]?.fullName, // Get the first instructor's name
            priceAmount: course.price?.amount
        }));

        res.status(200).json(transformedCourses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Read a course by ID
const getCourse = async (req, res) => {
    try {
        const course = await Course.findOne({ _id: req.params.id, deleted: false })
            .populate('categoryId')          // Populate the category
            .populate('subcategoryId')       // Populate the subcategory
            .populate('price')
            .populate('instructorId')        // Populate instructors
            .populate('languageId')          // Populate the language
            .populate('skillLevelId');       // Populate the skill level

        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get courses based on multiple optional filters
// const getCoursesfilter = async (req, res) => {
//     const { categoryId, subcategoryId, skillLevelId, languageId } = req.query; // Use query parameters

//     // Build the query object
//     const query = { deleted: false };

//     if (categoryId) {
//         query.categoryId = categoryId;
//     }
//     if (subcategoryId) {
//         query.subcategoryId = subcategoryId;
//     }
//     if (skillLevelId) {
//         query.skillLevelId = skillLevelId;
//     }
//     if (languageId) {
//         query.languageId = languageId;
//     }

//     try {
//         const courses = await Course.find(query)
//             .populate('categoryId')
//             .populate('subcategoryId')
//             .populate('instructorId')
//             .populate('languageId')
//             .populate('skillLevelId');

//         res.json(courses);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// Make sure to update your routes to use this new API endpoint

const getCoursesfilter = async (req, res) => {
    const { categoryId, subcategoryId, skillLevelId, languageId } = req.query; // Use query parameters

    // Build the query object
    const query = { deleted: false };

    if (categoryId) {
        query.categoryId = categoryId;
    }
    if (subcategoryId) {
        query.subcategoryId = subcategoryId;
    }
    if (skillLevelId) {
        query.skillLevelId = skillLevelId;
    }
    if (languageId) {
        query.languageId = languageId;
    }

    try {
        const courses = await Course.find(query)
            .populate('categoryId')
            .populate('subcategoryId')
            .populate('price')
            .populate('instructorId')
            .populate('languageId')
            .populate('skillLevelId');

        // Transform the data to include only the required fields
        const transformedCourses = courses.map(course => ({
            courseId: course._id,
            baseVideo: course.baseVideo,
            categoryName: course.categoryId?.name,
            subcategoryName: course.subcategoryId?.name,
            instructorName: course.instructorId[0]?.fullName, // Get the first instructor's name
            priceAmount: course.price?.amount
        }));

        res.status(200).json(transformedCourses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Update a course
const updateCourse = async (req, res) => {
    try {
        const course = await Course.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            req.body,
            { new: true } // This option returns the updated document
        );

        if (!course) return res.status(404).json({ message: 'Course not found' });

        res.status(200).json({message : "updated successfully",
            UpdatedData : course}); // This will now return the updated document
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Soft delete a course
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        course.deleted = true;
        await course.save();
        res.status(200).send({message : "deleted successfully"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createCourse,
    getCourses,
    getCourse,
    getCoursesfilter,
    updateCourse,
    deleteCourse
};
