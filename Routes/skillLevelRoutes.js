const express = require('express');
const router = express.Router();
const skillLevelController = require('../Controllers/skillLevelController');

// Skill Level Routes
router.post('/createSkillLevel', skillLevelController.createSkillLevel);
router.get('/getAllSkillLevels', skillLevelController.getAllSkillLevels);
router.get('/getSkillLevelById/:id', skillLevelController.getSkillLevelById);
router.put('/updateSkillLevel/:id', skillLevelController.updateSkillLevel);
router.delete('/deleteSkillLevel/:id', skillLevelController.deleteSkillLevel);

module.exports = router;
