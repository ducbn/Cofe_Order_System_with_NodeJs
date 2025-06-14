const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'preparing', 'done', 'served'],
    default: 'pending'
  }
});

module.exports = mongoose.model('OrderItem', OrderItemSchema);