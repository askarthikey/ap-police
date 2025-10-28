const mongoose = require('mongoose');

const ManufacturerSchema = new Schema({
  Manufacturer_ID: { type: Number, unique: true },
  Manufacturer_Name: { type: String, required: true, unique: true },
  Address: { type: String },
  Contact_No: { type: String },
  Email_ID: { type: String }
});
module.exports=mongoose.model('Manufacturer',ManufacturerSchema);