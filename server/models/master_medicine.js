const mongoose = require('mongoose');
const { Schema } = mongoose;

const MedicineSchema = new Schema({
  Medicine_Code: { type: String, required: true },
  Manufacturer_ID: { type: Schema.Types.ObjectId, ref: 'Manufacturer', required: true },
  Medicine_Name: { type: String, required: true },
  Type: { type: String },
  Category: { type: String },
  Quantity: { type: Number, required: true },
  Threshold_Qty: { type: Number, required: true }
});

// ✅ Make (Manufacturer_ID + Medicine_Code) unique together
MedicineSchema.index({ Manufacturer_ID: 1, Medicine_Code: 1 }, { unique: true });

// (Optional) if you want unique names *per manufacturer*, uncomment this too:
// MedicineSchema.index({ Manufacturer_ID: 1, Medicine_Name: 1 }, { unique: true });

module.exports = mongoose.model('Medicine', MedicineSchema);
