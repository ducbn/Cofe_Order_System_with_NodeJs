const { Invoice } = require('../models');

// GET tất cả hoá đơn
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('order');
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy hóa đơn' });
  }
};

// POST tạo hóa đơn mới
exports.createInvoice = async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();
    res.status(201).json(invoice);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi tạo hóa đơn', error: err.message });
  }
};

// PUT cập nhật hóa đơn
exports.updateInvoice = async (req, res) => {
  try {
    const updated = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Không tìm thấy hóa đơn' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi cập nhật hóa đơn', error: err.message });
  }
};

// DELETE xoá hóa đơn (tuỳ chọn)
exports.deleteInvoice = async (req, res) => {
  try {
    const deleted = await Invoice.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy hóa đơn' });
    res.status(200).json({ message: 'Đã xoá hóa đơn' });
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi xoá hóa đơn', error: err.message });
  }
};
