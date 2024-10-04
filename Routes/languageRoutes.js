const express = require('express');
const router = express.Router();
const languageController = require('../controllers/languageController');

// Language Routes
router.post('/createLanguage', languageController.createLanguage);
router.get('/getAllLanguages', languageController.getAllLanguages);
router.get('/getLanguageById/:id', languageController.getLanguageById);
router.put('/updateLanguage/:id', languageController.updateLanguage);
router.delete('/deleteLanguage/:id', languageController.deleteLanguage);

module.exports = router;
