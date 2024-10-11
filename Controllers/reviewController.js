// controllers/reviewController.js
const Course = require('../Models/courseModel'); // Adjust the path as necessary
const mongoose = require('mongoose');

// Create a new review
const createReview = async (req, res) => {
    const { courseId } = req.params;
    const { rating, review } = req.body;
    const userId = req.user.id; // Assuming user ID is fetched from the token

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const newReview = {
            user: userId,
            rating,
            review
        };

        // Add the review to the course
        course.reviews.push(newReview);

        // Update overall rating
        const totalRatings = course.reviews.reduce((acc, rev) => acc + rev.rating, 0);
        course.rating = (totalRatings / course.reviews.length).toFixed(1); // Update course rating

        await course.save();

        return res.status(201).json(course);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Update an existing review
const updateReview = async (req, res) => {
    const { courseId, reviewId } = req.params;
    const { rating, review } = req.body;

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const existingReview = course.reviews.id(reviewId);
        if (!existingReview || existingReview.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to update this review' });
        }

        existingReview.rating = rating;
        existingReview.review = review;

        // Update overall rating
        const totalRatings = course.reviews.reduce((acc, rev) => acc + rev.rating, 0);
        course.rating = (totalRatings / course.reviews.length).toFixed(1); // Update course rating

        await course.save();

        return res.status(200).json(course);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Fetch all reviews for a course
const getReviews = async (req, res) => {
    const { courseId } = req.params;

    try {
        const course = await Course.findById(courseId).populate('reviews.user', 'username'); // Adjust based on your User model
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        return res.status(200).json(course.reviews);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Soft delete a review
const deleteReview = async (req, res) => {
    const { courseId, reviewId } = req.params;

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const existingReview = course.reviews.id(reviewId);
        if (!existingReview || existingReview.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this review' });
        }

        existingReview.deleted = true; // Soft delete
        await course.save();

        return res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createReview,
    getReviews,
    updateReview,
    deleteReview
}
