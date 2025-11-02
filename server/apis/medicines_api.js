const express = require("express");
const medicineApp = express.Router();
const Medicine = require("../models/master_medicine"); // path to your Medicine schema file
const Manufacturer = require("../models/master_manufacture"); // path to your Manufacturer schema file

// ✅ CREATE - Add a new medicine by a manufacturer
medicineApp.post("/medicine_add", async (req, res) => {
  try {
    const {
      Medicine_Code,
      Manufacturer_ID,
      Medicine_Name,
      Type,
      Category,
      Quantity,
      Threshold_Qty,
    } = req.body;

    // Check if manufacturer exists
    const manufacturer = await Manufacturer.findById(Manufacturer_ID);
    if (!manufacturer) {
      return res.status(404).json({ message: "Manufacturer not found" });
    }

    // Create new medicine
    const newMedicine = new Medicine({
      Medicine_Code,
      Manufacturer_ID,
      Medicine_Name,
      Type,
      Category,
      Quantity,
      Threshold_Qty,
    });

    await newMedicine.save();
    res.status(201).json({ message: "Medicine added successfully", medicine: newMedicine });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ READ - Get all medicines (optionally filter by Manufacturer_ID)
medicineApp.get("/medicines/:manufacturerId", async (req, res) => {
  try {
    const { manufacturerId } = req.params;
    const medicines = await Medicine.find({ Manufacturer_ID: manufacturerId })
      .populate("Manufacturer_ID", "Manufacturer_Name");
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ READ (Single) - Get details of one medicine
medicineApp.get("/medicine/:id", async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id).populate("Manufacturer_ID", "Manufacturer_Name");
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });
    res.json(medicine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ UPDATE - Update medicine details (quantity, threshold, category, etc.)
medicineApp.put("/medicine_update/:id", async (req, res) => {
  try {
    const updates = req.body; // e.g., { Quantity: 200, Threshold_Qty: 20 }
    const updatedMedicine = await Medicine.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!updatedMedicine) return res.status(404).json({ message: "Medicine not found" });
    res.json({ message: "Medicine updated successfully", medicine: updatedMedicine });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

medicineApp.delete("/medicine_delete/:id/:manufacturerId", async (req, res) => {
  try {
    const { id, manufacturerId } = req.params;

    // ✅ Find medicine
    const medicine = await Medicine.findById(id);
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });

    // ✅ Check if it belongs to the given manufacturer
    if (medicine.Manufacturer_ID.toString() !== manufacturerId) {
      return res.status(403).json({ message: "Not authorized to delete this medicine" });
    }

    // ✅ Delete it
    await Medicine.findByIdAndDelete(id);

    res.json({ message: "Medicine deleted successfully" });
  } catch (err) {
    console.error("Error deleting medicine:", err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = medicineApp;
