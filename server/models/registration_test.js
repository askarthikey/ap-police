const mongoose = require('mongoose');

const RegistrationSchema = new Schema({
  Reg_No: { type: String, required: true, unique: true },
  Institute_ID: { type: Schema.Types.ObjectId, ref: 'Institute', required: true },
  Patient_Type: { type: String, enum: ['EMPLOYEE', 'FAMILY'], required: true },
  Patient_Ref_ID: { type: String, required: true }, // ABS_NO or Family_ID
  Reg_Date: { type: Date, required: true },
  Visit_Status: { type: String }
});
module.exports = mongoose.model('Registration', RegistrationSchema);