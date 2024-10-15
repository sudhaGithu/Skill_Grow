const Permission = require('../../Models/Roles/permission');

// Permission CRUD operations
const addPermission = async (req, res) => {
    try {
        const { name } = req.body;
        const permission = new Permission({ name });
        await permission.save();
        res.status(201).json({
            status: true,
            message: 'Permission created successfully',
            data: permission
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
};

const editPermission = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const permission = await Permission.findById(id);
        if (!permission) {
            return res.status(404).json({
                status: false,
                message: 'Permission not found'
            });
        }
        permission.name = name || permission.name;
        await permission.save();
        res.status(200).json({
            status: true,
            message: 'Permission updated successfully',
            data: permission
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
};

const deletePermission = async (req, res) => {
    try {
        const { id } = req.params;
        const permission = await Permission.findById(id);
        if (!permission) {
            return res.status(404).json({
                status: false,
                message: 'Permission not found'
            });
        }
        await permission.remove();
        res.status(200).json({
            status: true,
            message: 'Permission removed successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

const getPermissions = async (req, res) => {
    try {
        const permissions = await Permission.find();
        res.status(200).json({
            status: true,
            message: 'Permissions retrieved successfully',
            data: permissions
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

const getPermissionById = async (req, res) => {
    try {
        const { id } = req.params;
        const permission = await Permission.findById(id);
        if (!permission) {
            return res.status(404).json({
                status: false,
                message: 'Permission not found'
            });
        }
        res.status(200).json({
            status: true,
            message: 'Permission retrieved successfully',
            data: permission
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

module.exports = {
    addPermission,
    getPermissions,
    getPermissionById,
    deletePermission,
    editPermission
};
