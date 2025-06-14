const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'prepared', 'served', 'paid'],
    default: 'pending',
  },
  orderedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // nếu do nhân viên đặt
  guestSessionId: { type: String }, // nếu khách tự gọi món
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
