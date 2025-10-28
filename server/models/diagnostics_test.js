const mongoose = require('mongoose');
const { Schema } = mongoose;
const DiagnosticsTestSchema = new Schema({
  Test_ID: { type: Number, unique: true },
  Test_Name: { type: String, required: true },
});
module.exports = mongoose.model('DiagnosticsTest', DiagnosticsTestSchema);