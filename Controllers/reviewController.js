const Course = require('../Models/courseModel'); // Adjust the path as necessary

// Create a new review
const createReview = async (req, res) => {
    const { courseId } = req.params;
    const { rating, review } = req.body;
    const userId = req.user.id; // Assuming user ID is fetched from the token

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ status: false, message: 'Course not found' });
        }

        const newReview = {
            user: userId,
            rating,
            review,
            deleted: false // Ensure soft delete status is set
        };

        // Add the review to the course
        course.reviews.push(newReview);

        // Update overall rating
        const totalRatings = course.reviews.reduce((acc, rev) => acc + rev.rating, 0);
        course.rating = (totalRatings / course.reviews.length).toFixed(1); // Update course rating

        await course.save();

        return res.status(201).json({ status: true, message: 'Review created successfully', data: course });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

// Update an existing review
const updateReview = async (req, res) => {
    const { courseId, reviewId } = req.params;
    const { rating, review } = req.body;

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ status: false, message: 'Course not found' });
        }

        const existingReview = course.reviews.id(reviewId);
        if (!existingReview || existingReview.user.toString() !== req.user.id) {
            return res.status(403).json({ status: false, message: 'Not authorized to update this review' });
        }

        existingReview.rating = rating;
        existingReview.review = review;

        // Update overall rating
        const totalRatings = course.reviews.reduce((acc, rev) => acc + rev.rating, 0);
        course.rating = (totalRatings / course.reviews.length).toFixed(1); // Update course rating

        await course.save();

        return res.status(200).json({ status: true, message: 'Review updated successfully', data: course });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

// Fetch all reviews for a course
const getReviews = async (req, res) => {
    const { courseId } = req.params;

    try {
        const course = await Course.findById(courseId).populate('reviews.user', 'username'); // Adjust based on your User model
        if (!course) {
            return res.status(404).json({ status: false, message: 'Course not found' });
        }

        const reviews = course.reviews.filter(review => !review.deleted); // Exclude soft-deleted reviews
        return res.status(200).json({ status: true, data: reviews });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

// Soft delete a review
const deleteReview = async (req, res) => {
    const { courseId, reviewId } = req.params;

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ status: false, message: 'Course not found' });
        }

        const existingReview = course.reviews.id(reviewId);
        if (!existingReview || existingReview.user.toString() !== req.user.id) {
            return res.status(403).json({ status: false, message: 'Not authorized to delete this review' });
        }

        existingReview.deleted = true; // Soft delete
        await course.save();

        return res.status(200).json({ status: true, message: 'Review deleted successfully' });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

module.exports = {
    createReview,
    getReviews,
    updateReview,
    deleteReview
};
