module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('⚡ New client connected:', socket.id);

    // Nhận vai trò khi client kết nối
    socket.on('join', (role) => {
      socket.join(role); // join theo role (e.g., 'bep', 'phucvu', 'thungan')
      console.log(`Socket ${socket.id} joined room: ${role}`);
    });

    // Khi có đơn mới
    socket.on('new_order', (orderData) => {
      io.to('bep').emit('new_order', orderData); // Gửi đơn đến bếp
    });

    // Khi bếp hoàn thành món
    socket.on('order_item_done', (orderItemData) => {
      io.to('phucvu').emit('order_item_done', orderItemData); // Gửi đến phục vụ
    });

    // Khi phục vụ giao món xong
    socket.on('order_served', (orderId) => {
      io.to('thungan').emit('order_ready_to_pay', orderId); // Gửi đến thu ngân
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};
