const Language = require('../Models/Language');

// Create Language
const createLanguage = async (req, res) => {
  try {
    const { name } = req.body;
    const language = new Language({ name: name.trim() });
    await language.save();
    res.status(201).json({ message: 'Language created successfully', language });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get All Languages
const getAllLanguages = async (req, res) => {
  try {
    const languages = await Language.find();
    res.status(200).json(languages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get Language by ID
const getLanguageById = async (req, res) => {
  try {
    const { id } = req.params;
    const language = await Language.findById(id);
    if (!language) {
      return res.status(404).json({ message: 'Language not found' });
    }
    res.status(200).json(language);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Update Language
const updateLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const language = await Language.findByIdAndUpdate(
      id,
      { name: name.trim() },
      { new: true }
    );
    if (!language) {
      return res.status(404).json({ message: 'Language not found' });
    }

    res.status(200).json({ message: 'Language updated successfully', language });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Delete Language
const deleteLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const language = await Language.findByIdAndDelete(id);
    if (!language) {
      return res.status(404).json({ message: 'Language not found' });
    }
    res.status(200).json({ message: 'Language deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
createLanguage,
getAllLanguages,
 getLanguageById,
 updateLanguage,
 deleteLanguage
};