// routes/privacyPolicy.js
const express = require('express');
const PrivacyPolicy = require('../Models/privacyPolicyModel');
const router = express.Router();

// Create a new privacy policy entry
const createPrivacyPolicy = async (req, res) => {
    try {
        const privacyPolicy =  new PrivacyPolicy(req.body);
        await privacyPolicy.save();
        res.status(201).json(privacyPolicy);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Read all privacy policy entries
const getPrivacyPolicies = async (req, res) => {
    try {
        const privacyPolicies = await PrivacyPolicy.find({ deleted: false });
        res.status(200).json(privacyPolicies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read a specific privacy policy entry by ID
const getPrivacyPolicy = async (req, res) => {
    try {
        const privacyPolicy = await PrivacyPolicy.findOne({ _id: req.params.id, deleted: false });
        if (!privacyPolicy) return res.status(404).json({ message: 'Privacy Policy not found' });
        res.status(200).json(privacyPolicy);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a privacy policy entry
const updatePrivacyPolicy = async (req, res) => {
    try {
        const privacyPolicy = await PrivacyPolicy.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            req.body,
            { new: true } // This option returns the updated document
        );

        if (!privacyPolicy) return res.status(404).json({ message: 'Privacy Policy not found' });

        res.status(200).json({ message : "updated successfully",
            UpdatedData : privacyPolicy}); // This will now return the updated document
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Soft delete a privacy policy entry
const deletePrivacyPolicy = async (req, res) => {
    try {
        const privacyPolicy = await PrivacyPolicy.findById(req.params.id);
        if (!privacyPolicy) return res.status(404).json({ message: 'Privacy Policy not found' });

        privacyPolicy.deleted = true;
        await privacyPolicy.save();
        res.status(200).send({message : "deleted successfully"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPrivacyPolicy,
    getPrivacyPolicies,
    getPrivacyPolicy,
    updatePrivacyPolicy,
    deletePrivacyPolicy
};
