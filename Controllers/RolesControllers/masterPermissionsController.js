const MasterPermissions = require('../../Models/Roles/modulePermissions');
const MasterModule = require('../../Models/Roles/masterModuleModel');

// Create a new master permission
const addPermission = async (req, res) => {
    try {
        const { moduleId, permissions } = req.body;

        // Check if the moduleId exists in MasterModule
        const module = await MasterModule.findById(moduleId);
        if (!module) {
            return res.status(404).json({ status: false, message: 'Module not found' });
        }

        const masterPermission = new MasterPermissions({ moduleId, permissions });
        await masterPermission.save();
        res.status(201).json({ status: true, data: masterPermission });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};

// Get all master permissions (excluding soft-deleted ones)
const getAllPermission = async (req, res) => {
    try {
        const masterPermissions = await MasterPermissions.find({ deletedAt: null })
            .populate('moduleId')
            .populate('permissions');
        res.status(200).json({ status: true, data: masterPermissions });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// Get a single master permission by ID (excluding soft-deleted ones)
const getPermission = async (req, res) => {
    try {
        const masterPermission = await MasterPermissions.findOne({ _id: req.params.id, deletedAt: null })
            .populate('moduleId');
        if (!masterPermission) {
            return res.status(404).json({ status: false, message: 'MasterPermission not found' });
        }
        res.status(200).json({ status: true, data: masterPermission });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// Update a master permission
const updatePermission = async (req, res) => {
    try {
        const { moduleId, permissionName } = req.body;

        // Check if the moduleId exists in MasterModule
        const module = await MasterModule.findById(moduleId);
        if (!module) {
            return res.status(404).json({ status: false, message: 'Module not found' });
        }

        const masterPermission = await MasterPermissions.findOneAndUpdate(
            { _id: req.params.id, deletedAt: null },
            { moduleId, permissionName },
            { new: true, runValidators: true }
        ).populate('moduleId');
        
        if (!masterPermission) {
            return res.status(404).json({ status: false, message: 'MasterPermission not found' });
        }
        res.status(200).json({ status: true, data: masterPermission });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};

// Soft delete a master permission
const deletePermission = async (req, res) => {
    try {
        const masterPermission = await MasterPermissions.findOneAndUpdate(
            { _id: req.params.id, deletedAt: null },
            { deletedAt: new Date() },
            { new: true }
        ).populate('moduleId');
        
        if (!masterPermission) {
            return res.status(404).json({ status: false, message: 'MasterPermission not found' });
        }
        res.status(200).json({ status: true, data: masterPermission });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// Restore a soft-deleted master permission
const restorePermission = async (req, res) => {
    try {
        const masterPermission = await MasterPermissions.findOneAndUpdate(
            { _id: req.params.id, deletedAt: { $ne: null } },
            { deletedAt: null },
            { new: true }
        ).populate('moduleId');

        if (!masterPermission) {
            return res.status(404).json({ status: false, message: 'MasterPermission not found' });
        }
        res.status(200).json({ status: true, data: masterPermission });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

module.exports = {
    addPermission,
    getAllPermission,
    getPermission,
    updatePermission,
    deletePermission,
    restorePermission
};
