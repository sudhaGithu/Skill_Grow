const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['Free', 'Paid'],
  },
  amount: {
    type: Number,
    required: function() {
      return this.type === 'Paid';
    },
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Price', priceSchema);
