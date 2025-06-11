const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true },
  area: { type: String },
  status: {
    type: String,
    enum: ['empty', 'occupied', 'waiting_payment'],
    default: 'empty',
  },
  qrCodeUrl: { type: String }, // dùng cho QR link gọi món
}, { timestamps: true });

module.exports = mongoose.model('Table', TableSchema);
