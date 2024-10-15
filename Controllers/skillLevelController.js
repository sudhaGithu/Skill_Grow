const SkillLevel = require('../Models/SkillLevel');

// Create Skill Level
const createSkillLevel = async (req, res) => {
    try {
        const { level } = req.body;
        const skillLevel = new SkillLevel({ level });
        await skillLevel.save();
        res.status(201).json({ status: true, message: 'Skill level created successfully', data: skillLevel });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Get All Skill Levels
const getAllSkillLevels = async (req, res) => {
    try {
        const skillLevels = await SkillLevel.find();
        res.status(200).json({ status: true, data: skillLevels });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Get Skill Level by ID
const getSkillLevelById = async (req, res) => {
    try {
        const { id } = req.params;
        const skillLevel = await SkillLevel.findById(id);
        if (!skillLevel) {
            return res.status(404).json({ status: false, message: 'Skill level not found' });
        }
        res.status(200).json({ status: true, data: skillLevel });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Update Skill Level
const updateSkillLevel = async (req, res) => {
    try {
        const { id } = req.params;
        const { level } = req.body;

        const skillLevel = await SkillLevel.findByIdAndUpdate(
            id,
            { level },
            { new: true }
        );
        if (!skillLevel) {
            return res.status(404).json({ status: false, message: 'Skill level not found' });
        }

        res.status(200).json({ status: true, message: 'Skill level updated successfully', data: skillLevel });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Delete Skill Level
const deleteSkillLevel = async (req, res) => {
    try {
        const { id } = req.params;
        const skillLevel = await SkillLevel.findByIdAndDelete(id);
        if (!skillLevel) {
            return res.status(404).json({ status: false, message: 'Skill level not found' });
        }
        res.status(200).json({ status: true, message: 'Skill level deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createSkillLevel,
    getAllSkillLevels,
    getSkillLevelById,
    updateSkillLevel,
    deleteSkillLevel
};
