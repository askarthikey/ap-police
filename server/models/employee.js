const mongoose = require('mongoose');

const EmployeeSchema = new Schema({
  ABS_NO: { type: String, required: true, unique: true },
  Name: { type: String, required: true },
  Designation: { type: String },
  DOB: { type: Date },
  Address: { type: String },
  Blood_Group: { type: String },
  Medical_History: { type: Object }
});
module.exports = mongoose.model('Employee', EmployeeSchema);