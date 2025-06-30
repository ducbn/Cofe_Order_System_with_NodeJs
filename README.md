# 🚍 BOOK-TICKET-BUS-APP

## 📝 Giới thiệu

**BOOK-TICKET-BUS-APP** là một ứng dụng đặt vé xe buýt được phát triển bằng **MERN Stack** (MongoDB, Express.js, React.js, Node.js).  
Ứng dụng cho phép người dùng thực hiện các thao tác đặt vé xe, chọn chỗ ngồi, quản lý thông tin cá nhân và xác nhận thông tin đặt vé.

---

## ✅ Các chức năng chính của ứng dụng

### 🎨 Front-End (React.js)

- Trang **Đăng nhập** và **Đăng ký**.
- Hệ thống **xác thực dựa trên Token**, chỉ cho phép người dùng đã đăng ký truy cập (sử dụng `passport.js`).
- **Mã hóa mật khẩu** người dùng trước khi lưu trữ.
- Trang **Hồ sơ cá nhân**, hiển thị đầy đủ thông tin người dùng đã đăng nhập.
- **Danh sách các thành phố** cho phép người dùng chọn thành phố xuất phát và điểm đến.
- **Hiển thị danh sách các chuyến xe buýt** của nhiều nhà xe, bao gồm thông tin chi tiết về từng chuyến.
- Trang **Chọn ghế** với giao diện thân thiện, hỗ trợ chọn chỗ ngồi và nhập thông tin hành khách động.
- Trang **Xác nhận**, thu thập thông tin thẻ ghi nợ (sử dụng `react-credit-cards`).  
*Lưu ý: Ứng dụng phiên bản này không xử lý thanh toán thực tế.*
- Trang **Vé đặt thành công**, hiển thị toàn bộ thông tin hành khách cùng một mã số ID giao dịch ngẫu nhiên.

---

### 🔧 Back-End (Node.js + Express.js)

- Ứng dụng **Express.js** cho toàn bộ xử lý phía server.
- Sử dụng **MongoDB Atlas** làm hệ quản trị cơ sở dữ liệu, lưu trữ thông tin người dùng, chuyến xe, ghế ngồi và vé đặt.
- **Passport.js** được sử dụng để:
  - Xác thực người dùng qua token.
  - Mã hóa mật khẩu trước khi lưu vào database.

---

## ✅ Các chức năng được kiểm thử

- Đăng nhập
- Đăng ký vé
- Đăng ký chỗ ngồi
- Thông tin cá nhân
- Quản lý thông tin vé
- Thêm chỗ ngồi
- Thêm vé xe
- Thanh toán (Giả lập)

---

## 🧪 Phương pháp kiểm thử

### 📦 Kiểm thử hộp đen (Black-box Testing)

- **Khái niệm:**  
  Kiểm thử hộp đen là phương pháp kiểm thử phần mềm chỉ tập trung vào **đầu vào và kết quả đầu ra** của ứng dụng mà **không cần biết logic bên trong hay mã nguồn chương trình**.

- **Áp dụng trong dự án:**  
  Các chức năng như đăng nhập, đặt vé, chọn ghế, thanh toán... đều được kiểm thử theo phương pháp hộp đen.  
  Mục đích là đảm bảo hệ thống phản hồi đúng với các dữ liệu hợp lệ và không hợp lệ.

---

### 🧰 Công cụ hỗ trợ kiểm thử - Selenium IDE

- **Selenium IDE là gì?**  
  Selenium IDE (Integrated Development Environment) là **công cụ kiểm thử tự động cho ứng dụng web**, dạng **Record & Playback**.

- **Ứng dụng trong dự án:**  
  Nhóm sử dụng Selenium IDE để **ghi lại các thao tác người dùng trên giao diện web**, sau đó **tự động chạy lại các test case** nhiều lần nhằm kiểm tra độ ổn định của giao diện.

- **Ưu điểm của Selenium IDE:**  
  - Không cần viết mã lập trình phức tạp.
  - Giao diện thân thiện với người dùng.
  - Dễ dàng kiểm thử hồi quy (Regression Testing) trên trình duyệt.

---

## 👥 Thông tin nhóm thực hiện

- **Tên nhóm:** Kiểm thử phần mềm - BOOK-TICKET-BUS-APP
- **Thành viên:**  
  - Nguyễn Danh Hiếu 
  - Bùi Ngọc Đức
  - Lê Thành Nam
  - Phạm Văn Thân
  - Vũ Thành Dương


---
