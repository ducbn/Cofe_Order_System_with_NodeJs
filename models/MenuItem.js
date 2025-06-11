const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['cafe', 'nuoc', 'banh', 'khac'], default: 'khac' },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  available: { type: Boolean, default: true },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', MenuItemSchema);
