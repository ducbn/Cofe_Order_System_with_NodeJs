const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Middlewares
app.use(cors());
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Cafe Order API Running...');
});

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/api/menu-items', menuItemRoutes);

const tableRoutes = require('./routes/tableRoutes');
app.use('/api/tables', tableRoutes);


// Socket.IO setup
require('./sockets')(io);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB Connected');
  server.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
})
.catch((err) => console.error('MongoDB Error:', err));
