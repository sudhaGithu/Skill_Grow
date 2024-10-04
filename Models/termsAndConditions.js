// models/TermsAndConditions.js
const mongoose = require('mongoose');

const termsAndConditionsSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('TermsAndConditions', termsAndConditionsSchema);
