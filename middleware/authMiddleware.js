const jwt = require('jsonwebtoken');

exports.authRequired = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token không được cung cấp' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    req.user = decoded; // Lưu thông tin user vào req
    next();
  } catch (err) {
    res.status(403).json({ message: 'Token không hợp lệ' });
  }
};


//kiểm tra vai trò
exports.requireRole = (role) => (req, res, next) => {
  if (req.user?.role !== role) {
    return res.status(403).json({ message: 'Không có quyền truy cập' });
  }
  next();
};
