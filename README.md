# BOOK-TICKET-BUS-APP

Một ứng dụng đặt vé xe buýt được xây dựng bằng MERN Stack (MongoDB, Express.js, React.js, Node.js)

Ứng dụng đặt vé xe buýt bao gồm các tính năng sau:

### Front-End

* Trang Đăng nhập & Đăng ký.

* Sử dụng hệ thống dựa trên Token, chỉ người dùng đã đăng ký mới có thể truy cập vào website bằng passport.js.

* Mã hóa mật khẩu bằng passport.js.

* Có trang hồ sơ, hiển thị tất cả thông tin về người dùng đã đăng nhập.

* Danh sách các thành phố để người dùng lựa chọn (thành phố xuất phát & thành phố đích).

* Lấy danh sách các xe buýt của các công ty khác nhau với nhiều thông tin chi tiết.

* Trang chọn ghế có giao diện thân thiện với người dùng, đồng thời tạo các biểu mẫu động để lưu trữ dữ liệu của hành khách.

* Có trang Xác nhận, thu thập dữ liệu thẻ ghi nợ bằng react-credit-cards. Phiên bản này của ứng dụng không bao gồm xử lý quy trình thanh toán.

* Trang cuối cùng có thành phần hiển thị vé, hiển thị tất cả dữ liệu của hành khách và tạo một số ngẫu nhiên làm ID giao dịch.

### Back-End

* Sử dụng ứng dụng dựa trên Express.js cho quy trình backend.

* Sử dụng MongoDB Atlas để lưu trữ các bộ sưu tập.

* Sử dụng passport.js để xác thực người dùng và hệ thống dựa trên token.

* Sử dụng passport.js để mã hóa mật khẩu trước khi gửi dữ liệu lên đám mây.
