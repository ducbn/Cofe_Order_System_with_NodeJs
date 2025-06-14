const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('Cafe Order API Running...'));
app.use('/api/menu-items', require('./routes/menuItemRoutes'));
app.use('/api/tables', require('./routes/tableRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/order-items', require('./routes/orderItemRoutes'));
//app.use('/api/invoices', require('./routes/invoiceRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Setup socket
const socket = require('./sockets/socket');
const io = socket.init(server); // dùng init để lưu biến io

// Các sự kiện socket
io.on('connection', (socket) => {
  console.log('🟢 Client connected:', socket.id);

  // Khi client gửi role, cho socket join phòng tương ứng
  socket.on('join', (role) => {
    socket.join(role);
    console.log(`👤 Socket ${socket.id} joined room: ${role}`);
  });

  // Khi bếp hoàn thành món
  socket.on('order_item_done', (orderItemData) => {
    console.log('👨‍🍳 Bếp hoàn thành món:', orderItemData);
    io.to('phucvu').emit('order_item_done', orderItemData);
  });

  // Khi phục vụ giao món xong
  socket.on('order_served', (orderId) => {
    console.log('🍽️ Phục vụ đã giao món xong:', orderId);
    io.to('thungan').emit('order_ready_to_pay', orderId);
  });

  socket.on('disconnect', () => {
    console.log('🔴 Client disconnected:', socket.id);
  });
});

// Kết nối Mongo và khởi động server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB Connected');
  server.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
})
.catch((err) => console.error('MongoDB Error:', err));
