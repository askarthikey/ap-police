import mongoose from 'mongoose';
const { Schema } = mongoose;
const DiagnosticsRecordSchema = new Schema({
  Record_ID: { type: Number, unique: true },
  Reg_No: { type: Schema.Types.ObjectId, ref: 'Registration', required: true },
  Test_ID: { type: Schema.Types.ObjectId, ref: 'DiagnosticsTest', required: true },
  Result_Value: { type: String, required: true },
  Diagnosis_Date: { type: Date, required: true }
});
module.exports = mongoose.model('DiagnosticsRecord', DiagnosticsRecordSchema);