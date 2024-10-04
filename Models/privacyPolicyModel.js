// models/PrivacyPolicy.js
const mongoose = require('mongoose');

const privacyPolicySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('PrivacyPolicy', privacyPolicySchema);
