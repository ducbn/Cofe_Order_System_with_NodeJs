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
app.use('/api/invoices', require('./routes/invoiceRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Khởi tạo socket
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: { origin: '*' },
});

// Gọi module xử lý socket
require('./sockets')(io);

// MongoDB connection
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
