const mongoose = require('mongoose');

const skillLevelSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('SkillLevel', skillLevelSchema);
