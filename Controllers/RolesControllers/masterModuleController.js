const MasterModule = require('../../Models/Roles/masterModuleModel');

// Create a new master module
const addmasterModule = async (req, res) => {
    try {
        const masterModule = new MasterModule(req.body);
        await masterModule.save();
        res.status(201).json({ status: true, data: masterModule });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};

// Get all master modules (excluding soft-deleted ones)
const getallmasterModule = async (req, res) => {
    try {
        const masterModules = await MasterModule.find({ deletedAt: null });
        res.status(200).json({ status: true, data: masterModules });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// Get a single master module by ID (excluding soft-deleted ones)
const getmasterModule = async (req, res) => {
    try {
        const masterModule = await MasterModule.findOne({ _id: req.params.id, deletedAt: null });
        if (!masterModule) {
            return res.status(404).json({ status: false, message: 'MasterModule not found' });
        }
        res.status(200).json({ status: true, data: masterModule });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// Update a master module
const updatemasterModule = async (req, res) => {
    try {
        const masterModule = await MasterModule.findOneAndUpdate(
            { _id: req.params.id, deletedAt: null },
            req.body,
            { new: true, runValidators: true }
        );
        if (!masterModule) {
            return res.status(404).json({ status: false, message: 'MasterModule not found' });
        }
        res.status(200).json({ status: true, data: masterModule });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};

// Soft delete a master module
const deletemasterModule = async (req, res) => {
    try {
        const masterModule = await MasterModule.findOneAndUpdate(
            { _id: req.params.id, deletedAt: null },
            { deletedAt: new Date() },
            { new: true }
        );
        if (!masterModule) {
            return res.status(404).json({ status: false, message: 'MasterModule not found' });
        }
        res.status(200).json({ status: true, data: masterModule });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// Restore a soft-deleted master module
const restoremasterModule = async (req, res) => {
    try {
        const masterModule = await MasterModule.findOneAndUpdate(
            { _id: req.params.id, deletedAt: { $ne: null } },
            { deletedAt: null },
            { new: true }
        );
        if (!masterModule) {
            return res.status(404).json({ status: false, message: 'MasterModule not found' });
        }
        res.status(200).json({ status: true, data: masterModule });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

module.exports = {
    addmasterModule,
    getallmasterModule,
    getmasterModule,
    updatemasterModule,
    deletemasterModule,
    restoremasterModule
};
