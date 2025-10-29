const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ManufacturerSchema = new mongoose.Schema({
  Manufacturer_ID: {
    type: Number,
    unique: true
  },
  Manufacturer_Name: {
    type: String,
    required: true
  },
  Contact_No: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/
  },
  Email_ID: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  Address: {
    Street: { type: String, required: true },
    District: { type: String, required: true },
    State: { type: String, required: true },
    Pincode: { type: String, required: true }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Auto increment Manufacturer_ID
ManufacturerSchema.plugin(AutoIncrement, { inc_field: "Manufacturer_ID" });

module.exports = mongoose.model("Manufacturer", ManufacturerSchema);
