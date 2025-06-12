const { Order } = require('../models');
const socket = require('../sockets/socket'); // <== Thêm dòng này

// GET tất cả đơn hàng
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('table').populate('orderedBy');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy đơn hàng' });
  }
};

// POST tạo đơn hàng mới
exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    // Emit socket cho role "bep"
    const io = socket.getIO();
    io.to('bep').emit('new_order', order); // Gửi đến bếp

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi tạo đơn hàng', error: err.message });
  }
};

// PUT cập nhật đơn hàng
exports.updateOrder = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi cập nhật đơn hàng', error: err.message });
  }
};

// DELETE đơn hàng
exports.deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    res.status(200).json({ message: 'Đã xoá đơn hàng' });
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi xoá đơn hàng', error: err.message });
  }
};
