import mongoose from 'mongoose';
const MedicineBatchStockSchema = new Schema({
  Batch_Stock_ID: { type: Number, unique: true },
  Medicine_Code: { type: Schema.Types.ObjectId, ref: 'Medicine', required: true },
  Institute_ID: { type: Schema.Types.ObjectId, ref: 'Institute', required: true },
  Batch_No: { type: String, required: true },
  Expiry_Date: { type: Date, required: true },
  Current_Balance: { type: Number, required: true }
});
module.exports = mongoose.model('MedicineBatchStock', MedicineBatchStockSchema);