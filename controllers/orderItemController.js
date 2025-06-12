const { OrderItem } = require('../models');

// GET tất cả món đã gọi
exports.getAllOrderItems = async (req, res) => {
  try {
    const items = await OrderItem.find()
      .populate('order')
      .populate('menuItem');
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách món gọi' });
  }
};

// POST tạo món gọi mới trong đơn
exports.createOrderItem = async (req, res) => {
  try {
    const item = new OrderItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi tạo món gọi', error: err.message });
  }
};

// PUT cập nhật món gọi
exports.updateOrderItem = async (req, res) => {
  try {
    const updated = await OrderItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Không tìm thấy món gọi' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi cập nhật món gọi', error: err.message });
  }
};

// DELETE món gọi
exports.deleteOrderItem = async (req, res) => {
  try {
    const deleted = await OrderItem.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy món gọi' });
    res.status(200).json({ message: 'Đã xoá món khỏi đơn' });
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi xoá món gọi', error: err.message });
  }
};
