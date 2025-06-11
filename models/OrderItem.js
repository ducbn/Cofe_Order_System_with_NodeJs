const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  quantity: { type: Number, default: 1 },
  note: { type: String },
  status: {
    type: String,
    enum: ['waiting', 'preparing', 'done', 'served'],
    default: 'waiting',
  },
}, { timestamps: true });

module.exports = mongoose.model('OrderItem', OrderItemSchema);
