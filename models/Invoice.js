const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  totalAmount: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  finalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['cash', 'card', 'momo'], default: 'cash' },
}, { timestamps: true });

module.exports = mongoose.model('Invoice', InvoiceSchema);
