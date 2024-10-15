const Role = require('../../Models/Roles/roleModel');

// Create a new role
const addRole = async (req, res) => {
    try {
        const role = new Role(req.body);
        await role.save();
        res.status(201).json({
            status: true,
            message: 'Role created successfully',
            data: role
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
};

// Get all roles (excluding soft-deleted ones)
const getAllRole = async (req, res) => {
    try {
        const roles = await Role.find({ deletedAt: null });
        res.status(200).json({
            status: true,
            message: 'Roles retrieved successfully',
            data: roles
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Get a single role by ID (excluding soft-deleted ones)
const getRole = async (req, res) => {
    try {
        const role = await Role.findOne({ _id: req.params.id, deletedAt: null });
        if (!role) {
            return res.status(404).json({
                status: false,
                message: 'Role not found'
            });
        }
        res.status(200).json({
            status: true,
            message: 'Role retrieved successfully',
            data: role
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Update a role
const updateRole = async (req, res) => {
    try {
        const role = await Role.findOneAndUpdate(
            { _id: req.params.id, deletedAt: null },
            req.body,
            { new: true, runValidators: true }
        );
        if (!role) {
            return res.status(404).json({
                status: false,
                message: 'Role not found'
            });
        }
        res.status(200).json({
            status: true,
            message: 'Role updated successfully',
            data: role
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
};

// Soft delete a role
const deleteRole = async (req, res) => {
    try {
        const role = await Role.findOneAndUpdate(
            { _id: req.params.id, deletedAt: null },
            { deletedAt: new Date() },
            { new: true }
        );
        if (!role) {
            return res.status(404).json({
                status: false,
                message: 'Role not found'
            });
        }
        res.status(200).json({
            status: true,
            message: 'Role deleted successfully',
            data: role
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

// Restore a soft-deleted role
const restoreRole = async (req, res) => {
    try {
        const role = await Role.findOneAndUpdate(
            { _id: req.params.id, deletedAt: { $ne: null } },
            { deletedAt: null },
            { new: true }
        );
        if (!role) {
            return res.status(404).json({
                status: false,
                message: 'Role not found'
            });
        }
        res.status(200).json({
            status: true,
            message: 'Role restored successfully',
            data: role
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

module.exports = {
    addRole,
    getAllRole,
    getRole,
    updateRole,
    deleteRole,
    restoreRole
};
