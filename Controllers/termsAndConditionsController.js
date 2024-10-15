const express = require('express');
const TermsAndConditions = require('../Models/termsAndConditions');
const router = express.Router();

// Create a new terms and conditions entry
const createTermsAndConditions = async (req, res) => {
    try {
        const terms = await TermsAndConditions.create(req.body);
        res.status(201).json({ status: true, message: 'Terms and Conditions created successfully', data: terms });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error creating Terms and Conditions', error: error.message });
    }
};

// Read all terms and conditions
const getTermsAndConditions = async (req, res) => {
    try {
        const terms = await TermsAndConditions.find({ deleted: false });
        res.status(200).json({ status: true, data: terms });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error fetching Terms and Conditions', error: error.message });
    }
};

// Read a specific terms and conditions entry by ID
const getTermsAndCondition = async (req, res) => {
    try {
        const terms = await TermsAndConditions.findOne({ _id: req.params.id, deleted: false });
        if (!terms) return res.status(404).json({ status: false, message: 'Terms and Conditions not found' });
        res.status(200).json({ status: true, data: terms });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error fetching Terms and Conditions', error: error.message });
    }
};

// Update a terms and conditions entry
const updateTermsAndConditions = async (req, res) => {
    try {
        const terms = await TermsAndConditions.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            req.body,
            { new: true } // This option returns the updated document
        );

        if (!terms) return res.status(404).json({ status: false, message: 'Terms and Conditions not found' });

        res.status(200).json({ status: true, message: 'Terms and Conditions updated successfully', data: terms });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error updating Terms and Conditions', error: error.message });
    }
};

// Soft delete a terms and conditions entry
const deleteTermsAndConditions = async (req, res) => {
    try {
        const terms = await TermsAndConditions.findById(req.params.id);
        if (!terms) return res.status(404).json({ status: false, message: 'Terms and Conditions not found' });

        terms.deleted = true;
        await terms.save();
        res.status(200).json({ status: true, message: 'Terms and Conditions deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error deleting Terms and Conditions', error: error.message });
    }
};

module.exports = {
    createTermsAndConditions,
    getTermsAndCondition,
    getTermsAndConditions,
    updateTermsAndConditions,
    deleteTermsAndConditions
};
