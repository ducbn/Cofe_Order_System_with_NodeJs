const { Table } = require('../models');

// GET tất cả bàn
exports.getAllTables = async (req, res) => {
  try {
    const tables = await Table.find();
    res.status(200).json(tables);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách bàn' });
  }
};

// POST tạo bàn mới
exports.createTable = async (req, res) => {
  try {
    const table = new Table(req.body);
    await table.save();
    res.status(201).json(table);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi tạo bàn', error: err.message });
  }
};

// PUT cập nhật bàn
exports.updateTable = async (req, res) => {
  try {
    const updated = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Không tìm thấy bàn' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi cập nhật bàn', error: err.message });
  }
};

// DELETE bàn
exports.deleteTable = async (req, res) => {
  try {
    const deleted = await Table.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy bàn' });
    res.status(200).json({ message: 'Đã xóa bàn' });
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi xóa bàn', error: err.message });
  }
};
