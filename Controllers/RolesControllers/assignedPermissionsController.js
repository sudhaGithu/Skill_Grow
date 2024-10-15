const CenterAdminModule = require('../../Models/Roles/assignedPermissions');

// Create a new CenterAdminModule
const addpermissionsCenter = async (req, res) => {
    try {
        let centerAdminModule;

        if (req.body.centerId) {
            const { centerId, adminId, modulePermissions } = req.body;
            centerAdminModule = new CenterAdminModule({ centerId, adminId, modulePermissions });
        } else {
            const { adminId, modulePermissions } = req.body;
            centerAdminModule = new CenterAdminModule({ adminId, modulePermissions });
        }

        await centerAdminModule.save();
        res.status(201).json({ status: true, data: centerAdminModule });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};

// Get all CenterAdminModules (excluding soft-deleted ones)
const getAllpermissionsCenter = async (req, res) => {
    try {
        const centerAdminModules = await CenterAdminModule.find({ deletedAt: null })
            .populate('centerId')
            .populate('adminId')
            .populate('modulePermissions.moduleId')
            .populate('modulePermissions.permissions');
        
        res.status(200).json({ status: true, data: centerAdminModules });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// Get a single CenterAdminModule by ID (excluding soft-deleted ones)
const getpermissionsCenter = async (req, res) => {
    try {
        const centerAdminModule = await CenterAdminModule.findOne({ _id: req.params.id, deletedAt: null })
            .populate('centerId')
            .populate({
                path: 'adminId',
                populate: { path: 'role' }
            })
            .populate('modulePermissions.moduleId')
            .populate('modulePermissions.permissions');

        if (!centerAdminModule) {
            return res.status(404).json({ status: false, message: 'CenterAdminModule not found' });
        }

        res.status(200).json({ status: true, data: centerAdminModule });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// Update a CenterAdminModule
const updatepermissionsCenter = async (req, res) => {
    try {
        const { centerId, adminId, modulePermissions } = req.body;

        const centerAdminModule = await CenterAdminModule.findOneAndUpdate(
            { _id: req.params.id, deletedAt: null },
            { centerId, adminId, modulePermissions },
            { new: true, runValidators: true }
        )
        .populate('centerId')
        .populate('adminId')
        .populate('modulePermissions.moduleId')
        .populate('modulePermissions.permissions');

        if (!centerAdminModule) {
            return res.status(404).json({ status: false, message: 'CenterAdminModule not found' });
        }

        res.status(200).json({ status: true, data: centerAdminModule });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};

// Soft delete a CenterAdminModule
const deletepermissionsCenter = async (req, res) => {
    try {
        const centerAdminModule = await CenterAdminModule.findOneAndUpdate(
            { _id: req.params.id, deletedAt: null },
            { deletedAt: new Date() },
            { new: true }
        )
        .populate('centerId')
        .populate('adminId')
        .populate('modulePermissions.moduleId')
        .populate('modulePermissions.permissions');

        if (!centerAdminModule) {
            return res.status(404).json({ status: false, message: 'CenterAdminModule not found' });
        }

        res.status(200).json({ status: true, data: centerAdminModule });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// Restore a soft-deleted CenterAdminModule
const restorepermissionsCenter = async (req, res) => {
    try {
        const centerAdminModule = await CenterAdminModule.findOneAndUpdate(
            { _id: req.params.id, deletedAt: { $ne: null } },
            { deletedAt: null },
            { new: true }
        )
        .populate('centerId')
        .populate('adminId')
        .populate('modulePermissions.moduleId')
        .populate('modulePermissions.permissions');

        if (!centerAdminModule) {
            return res.status(404).json({ status: false, message: 'CenterAdminModule not found' });
        }

        res.status(200).json({ status: true, data: centerAdminModule });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

module.exports = {
    addpermissionsCenter,
    getAllpermissionsCenter,
    getpermissionsCenter,
    updatepermissionsCenter,
    deletepermissionsCenter,
    restorepermissionsCenter
};
