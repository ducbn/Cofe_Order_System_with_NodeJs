const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // Giả sử server.js export app
const { MenuItem } = require('../models');

describe('MenuItem API', () => {
  // Dữ liệu mẫu để test
  const newItem = {
    name: 'Cà phê sữa',
    price: 25000,
  };

  // ID của món ăn được tạo để test update/delete
  let itemId;

  // Setup trước khi chạy tất cả test
  beforeAll(async () => {
    // Kết nối đến MongoDB test (đảm bảo có TEST_MONGO_URI trong .env)
    await mongoose.connect(process.env.TEST_MONGO_URI || process.env.MONGO_URI);
    // Xóa dữ liệu cũ để đảm bảo test sạch
    await MenuItem.deleteMany();
  });

  // Cleanup sau khi chạy tất cả test
  afterAll(async () => {
    await MenuItem.deleteMany(); // Xóa dữ liệu test
    await mongoose.connection.close(); // Đóng kết nối
  });

  // Test GET /api/menu-items
  describe('GET /api/menu-items', () => {
    it('nên trả về danh sách món ăn', async () => {
      // Thêm một món ăn để test
      const item = new MenuItem(newItem);
      await item.save();

      const res = await request(app).get('/api/menu-items');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0].name).toBe(newItem.name);
      expect(res.body[0].price).toBe(newItem.price);
    });
  });

  // Test POST /api/menu-items
  describe('POST /api/menu-items', () => {
    it('nên tạo món ăn mới', async () => {
      const res = await request(app).post('/api/menu-items').send(newItem);
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe(newItem.name);
      expect(res.body.price).toBe(newItem.price);
      itemId = res.body._id; // Lưu ID để dùng cho test update/delete
    });

    it('nên trả về lỗi 400 nếu dữ liệu không hợp lệ', async () => {
      const invalidItem = { name: 'Trà đá' }; // Thiếu price
      const res = await request(app).post('/api/menu-items').send(invalidItem);
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Lỗi khi tạo món ăn');
    });
  });

  // Test PUT /api/menu-items/:id
  describe('PUT /api/menu-items/:id', () => {
    it('nên cập nhật món ăn thành công', async () => {
      const updatedData = { name: 'Cà phê sữa đặc biệt', price: 30000 };
      const res = await request(app)
        .put(`/api/menu-items/${itemId}`)
        .send(updatedData);
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe(updatedData.name);
      expect(res.body.price).toBe(updatedData.price);
    });

    it('nên trả về lỗi 404 nếu món ăn không tồn tại', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .put(`/api/menu-items/${nonExistentId}`)
        .send({ name: 'Không tồn tại' });
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Món ăn không tồn tại');
    });
  });

  // Test DELETE /api/menu-items/:id
  describe('DELETE /api/menu-items/:id', () => {
    it('nên xóa món ăn thành công', async () => {
      const res = await request(app).delete(`/api/menu-items/${itemId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Món ăn đã được xóa thành công');
    });

    it('nên trả về lỗi 404 nếu món ăn không tồn tại', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/api/menu-items/${nonExistentId}`);
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Món ăn không tồn tại');
    });
  });
});