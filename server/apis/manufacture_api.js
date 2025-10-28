const express = require('express');
const manufacturerApp = express.Router();
const Manufacturer = require('../models/master_manufacture');

// CREATE a manufacturer
manufacturerApp.post('/register_manufacturer', async (req, res) => {
  try {
    const manufacturer = new Manufacturer(req.body);
    const saved = await manufacturer.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all manufacturers
manufacturerApp.get('/manufacturers', async (req, res) => {
  try {
    const manufacturers = await Manufacturer.find();
    res.json(manufacturers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one manufacturer by custom ID
manufacturerApp.get('/manufacturer/:id', async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findOne({ Manufacturer_ID: req.params.id });
    if (!manufacturer) return res.status(404).json({ error: 'Not found' });
    res.json(manufacturer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE manufacturer by MongoDB _id (or change to Manufacturer_ID if you prefer)
manufacturerApp.put('/manufacturer_update/:id', async (req, res) => {
  try {
    const updated = await Manufacturer.findOneAndUpdate(
      { Manufacturer_ID: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE manufacturer by custom ID
manufacturerApp.delete('/manufacturer_delete/:id', async (req, res) => {
  try {
    const deleted = await Manufacturer.findOneAndDelete({ Manufacturer_ID: req.params.id });
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = manufacturerApp;
