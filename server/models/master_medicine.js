const mongoose = require('mongoose');
const { Schema } = mongoose;
const MedicineSchema = new Schema({
  Medicine_Code: { type: String, required: true, unique: true },
  Manufacturer_ID: { type: Schema.Types.ObjectId, ref: 'Manufacturer', required: true },
  Medicine_Name: { type: String, required: true, unique: true },
  Type: { type: String },
  Category: { type: String },
  Threshold_Qty: { type: Number, required: true }
});
module.exports = mongoose.model('Medicine', MedicineSchema);