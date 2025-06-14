const { OrderItem } = require('../models');

// GET tất cả món đã gọi
exports.getAllOrderItems = async (req, res) => {
  try {
    const filter = {};
    if (req.query.orderId) {
      filter.order = req.query.orderId;
    }

    const items = await OrderItem.find(filter)
      .populate('order')
      .populate('menuItem');

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách món gọi' });
  }
};

// GET các món trong 1 đơn hàng cụ thể
exports.getOrderItemsByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;

    const items = await OrderItem.find({ order: orderId })
      .populate('menuItem')
      .populate('order');

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy các món trong đơn hàng', error: err.message });
  }
};


// POST tạo món gọi mới trong đơn
exports.createOrderItem = async (req, res) => {
  try {
    const { order, menuItem, quantity, price } = req.body;
    if (!order || !menuItem || !quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Thiếu thông tin món hoặc số lượng không hợp lệ' });
    }

    const item = new OrderItem({ order, menuItem, quantity, price });
    await item.save();

    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi tạo món gọi', error: err.message });
  }
};


// PUT cập nhật món gọi
exports.updateOrderItem = async (req, res) => {
  try {
    const existing = await OrderItem.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Không tìm thấy món gọi' });

    if (existing.status === 'served') {
      return res.status(403).json({ message: 'Món đã phục vụ, không thể chỉnh sửa' });
    }

    const updated = await OrderItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi cập nhật món gọi', error: err.message });
  }
};


// DELETE món gọi
exports.deleteOrderItem = async (req, res) => {
  try {
    const existing = await OrderItem.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Không tìm thấy món gọi' });

    if (existing.status === 'served') {
      return res.status(403).json({ message: 'Món đã phục vụ, không thể xoá' });
    }

    await OrderItem.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Đã xoá món khỏi đơn' });
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi xoá món gọi', error: err.message });
  }
};

