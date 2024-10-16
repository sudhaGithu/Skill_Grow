// routes/course.js
const express = require('express');
const Course = require('../Models/courseModel');
const router = express.Router();

const Category = require('../Models/Category');
const SubCategory = require('../Models/SubCategoryModel');
const SkillLevel = require('../Models/SkillLevel');
const Language = require('../Models/Language');
const Price = require('../Models/Price');

// Create a new course
const createCourse = async (req, res) => {
    try {
        const { price, ...courseData } = req.body;
        const priceType = price > 0 ? 'Paid' : 'Free';

        const course = await Course.create({
            ...courseData,
            price,
            priceType,
        });

        res.status(201).json({ status: true, message: 'Course created successfully', data: course });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};

// Get all courses
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({ deleted: false })
            .populate('categoryId')
            .populate('subcategoryId')
            .populate('price')
            .populate('instructorId')
            .populate('languageId')
            .populate('skillLevelId');

        const transformedCourses = courses.map(course => ({
            courseId: course._id,
            thumbnailImage: course.thumbnailImage,
            courseName: course.courseName,
            categoryName: course.categoryId?.name,
            subcategoryName: course.subcategoryId?.name,
            instructorName: course.instructorId[0]?.fullName,
            priceAmount: course.price,
            rating: course.rating
        }));

        res.status(200).json({ status: true, data: transformedCourses });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};


const getCourse = async (req, res) => {
    try {
        const course = await Course.findOne({ _id: req.params.id, deleted: false })
            .populate('categoryId')
            .populate('subcategoryId')
            .populate('languageId')
            .populate('skillLevelId')
            .populate({
                path: 'instructorId', // Populate instructors
                populate: {
                    path: 'role', // Populate role within instructors
                    select: 'name' // Select only the name field from the role
                }
            })
            .populate({
                path: 'reviews.user', // Populate user in reviews
                select: 'fullName email image' // Select fields to return from the user model
            });;

        if (!course) return res.status(404).json({ status: false, message: 'Course not found' });


        res.status(200).json({ status: true, data: course });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};


// Get courses based on multiple optional filters
const getCoursesfilter = async (req, res) => {
    const { categoryId, subcategoryId, skillLevelId, languageId, priceType } = req.query;
    const query = { deleted: false };

    if (categoryId) query.categoryId = categoryId;
    if (subcategoryId) query.subcategoryId = subcategoryId;
    if (skillLevelId) query.skillLevelId = skillLevelId;
    if (languageId) query.languageId = languageId;

    // Filter by price type
    if (priceType) {
        if (priceType === 'Free') {
            query.price = { $eq: 0 }; // Assuming Free courses have a price of 0
        } else if (priceType === 'Paid') {
            query.price = { $gt: 0 }; // Assuming Paid courses have a price greater than 0
        } else {
            return res.status(400).json({ status: false, message: 'Invalid priceType. Use "Free" or "Paid".' });
        }
    }

    try {
        const courses = await Course.find(query)
            .populate('categoryId')
            .populate('subcategoryId')
            .populate('price')
            .populate('instructorId')
            .populate('languageId')
            .populate('skillLevelId');

        const transformedCourses = courses.map(course => ({
            courseId: course._id,
            courseName: course.courseName,
            thumbnailImage: course.thumbnailImage,
            categoryName: course.categoryId?.name,
            subcategoryName: course.subcategoryId?.name,
            instructorName: course.instructorId[0]?.fullName,
            priceAmount: course.price,
            rating: course.rating
        }));

        if(transformedCourses.length===0)
        {
            return res.status(200).json({ status: false, message: "No data found"});
        }

        res.status(200).json({ status: true, data: transformedCourses });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};


// Update a course
const updateCourse = async (req, res) => {
    try {
        const course = await Course.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            req.body,
            { new: true }
        );

        if (!course) return res.status(404).json({ status: false, message: 'Course not found' });

        res.status(200).json({ status: true, message: 'Course updated successfully', data: course });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};

// Soft delete a course
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ status: false, message: 'Course not found' });

        course.deleted = true;
        await course.save();
        res.status(200).json({ status: true, message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// Get filter data for courses
const getFilterData = async (req, res) => {
    try {
        const categories = await Category.find();
        const subCategories = await SubCategory.find();
        const skillLevels = await SkillLevel.find();
        const languages = await Language.find();

        // Static prices data
        const prices = [
            { type: 'Free' },
            { type: 'Paid' }
        ];

        res.json({
            status: true,
            data: {
                categories,
                subCategories,
                skillLevels,
                languages,
                prices,
            },
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};


module.exports = {
    createCourse,
    getCourses,
    getCourse,
    getFilterData,
    getCoursesfilter,
    updateCourse,
    deleteCourse
};
