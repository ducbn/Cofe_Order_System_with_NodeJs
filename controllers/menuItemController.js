const { MenuItem } = require('../models');

// Lấy danh sách tất cả món ăn
exports.getAllMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách món ăn' });
  }
};

// Thêm món ăn mới
exports.createMenuItem = async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi tạo món ăn', error: err.message });
  }
};

// Cập nhật món ăn
exports.updateMenuItem = async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Món ăn không tồn tại' });
    }
    res.status(200).json(updatedItem);
  }
  catch (err) {
    res.status(400).json({ message: 'Lỗi khi cập nhật món ăn', error: err.message });
  }
}

// Xóa món ăn
exports.deleteMenuItem = async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Món ăn không tồn tại' });
    }
    res.status(200).json({ message: 'Món ăn đã được xóa thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa món ăn', error: err.message });
  }
};
