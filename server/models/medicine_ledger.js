import mongoose from 'mongoose';
const { Schema } = mongoose;
const MedicineLedgerSchema = new Schema({
  Ledger_Entry_ID: { type: Number, unique: true },
  Batch_Stock_ID: { type: Schema.Types.ObjectId, ref: 'MedicineBatchStock', required: true },
  Transaction_Type: {
	type: String,
	enum: ['RECEIPT', 'ISSUE', 'TRANSFER_OUT', 'TRANSFER_IN'],
	required: true
  },
  Quantity: { type: Number, required: true },
  Transaction_Date: { type: Date, required: true },
  Reg_No: { type: Schema.Types.ObjectId, ref: 'Registration' },
  Source_Institute_ID: { type: Schema.Types.ObjectId, ref: 'Institute' },
 
 Target_Institute_ID: { type: Schema.Types.ObjectId, ref: 'Institute' },
  Patient_Ref_ID: { type: String } // ABS_NO or Family_ID
});
module.exports = mongoose.model('MedicineLedger', MedicineLedgerSchema);