const Pricing = require('../models/Price');

// Create Pricing
const createPricing = async (req, res) => {
  try {
    const { type, amount, description } = req.body;

    // Check if 'Paid' type requires an amount
    if (type === 'Paid' && !amount) {
      return res.status(400).json({ message: 'Amount is required for paid pricing.' });
    }

    const pricing = new Pricing({
      type: type.trim(),
      amount: type === 'Paid' ? amount : 0, // Amount only for 'Paid', otherwise default to 0
      description: description ? description.trim() : ''
    });

    await pricing.save();
    res.status(201).json({ message: 'Pricing created successfully', pricing });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get all Pricing options
const getPricing = async (req, res) => {
  try {
    const pricing = await Pricing.find();
    res.status(200).json(pricing);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get Pricing by ID
const getPricingById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const pricing = await Pricing.findById(id);
      if (!pricing) {
        return res.status(404).json({ message: 'Pricing not found' });
      }
  
      res.status(200).json(pricing);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };

// Update Pricing
const updatePricing = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, amount, description } = req.body;

    const pricing = await Pricing.findById(id);
    if (!pricing) {
      return res.status(404).json({ message: 'Pricing not found' });
    }

    pricing.type = type ? type.trim() : pricing.type;
    pricing.amount = type === 'Paid' ? amount : 0;
    pricing.description = description ? description.trim() : pricing.description;

    await pricing.save();
    res.status(200).json({ message: 'Pricing updated successfully', pricing });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Delete Pricing
const deletePricing = async (req, res) => {
  try {
    const { id } = req.params;

    const pricing = await Pricing.findByIdAndDelete(id);
    if (!pricing) {
      return res.status(404).json({ message: 'Pricing not found' });
    }

    res.status(200).json({ message: 'Pricing deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  createPricing,
  getPricing,
  getPricingById,
  updatePricing,
  deletePricing
};
