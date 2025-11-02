const express = require("express");
const manufacturerApp = express.Router();
const Manufacturer = require("../models/master_manufacture");

// CREATE (Register)
manufacturerApp.post("/register_manufacturer", async (req, res) => {
  try {
    const manufacturer = new Manufacturer(req.body);
    const saved = await manufacturer.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// READ all
manufacturerApp.get("/manufacturers", async (req, res) => {
  try {
    const manufacturers = await Manufacturer.find();
    res.json(manufacturers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one by Manufacturer_Name
manufacturerApp.get("/manufacturer/name/:name", async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findOne({
      Manufacturer_Name: req.params.name
    });

    if (!manufacturer) {
      return res.status(404).json({ error: "Manufacturer not found" });
    }

    res.json(manufacturer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// UPDATE by Manufacturer_ID
manufacturerApp.put("/manufacturer_update/:id", async (req, res) => {
  try {
    const updated = await Manufacturer.findOneAndUpdate(
      { Manufacturer_ID: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE by Manufacturer_ID
manufacturerApp.delete("/manufacturer_delete/:id", async (req, res) => {
  try {
    const deleted = await Manufacturer.findOneAndDelete({ Manufacturer_ID: req.params.id });
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = manufacturerApp;
