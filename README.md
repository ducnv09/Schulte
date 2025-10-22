# Bảng Schulte - Trò chơi Luyện tập Tập trung & Tốc độ đọc

## Mô tả
Bảng Schulte là một trò chơi giúp luyện tập khả năng tập trung và tốc độ đọc. Người chơi cần tìm các số theo thứ tự từ 1 đến số cuối cùng trong một bảng số ngẫu nhiên.

## Tính năng

### 🎮 Hai chế độ chơi
- **Chơi Tự do**: Tìm hết các số và tính thời gian hoàn thành
- **Chơi Giới hạn Thời gian**: Tìm càng nhiều số càng tốt trong thời gian cố định

### 📏 Kích thước bảng linh hoạt
- 5x5 (25 số) - Mặc định
- 7x7 (49 số) 
- 9x9 (81 số)

### ⏱️ Timer chính xác
- Hiển thị thời gian với độ chính xác đến mili giây
- Đếm tăng (chế độ tự do) hoặc đếm ngược (chế độ giới hạn thời gian)

### 🎨 Giao diện hiện đại
- Thiết kế responsive, tương thích với mọi thiết bị
- Hiệu ứng phản hồi trực quan khi click
- Màu sắc thay đổi theo trạng thái

## Cách sử dụng

1. **Mở file `index.html`** trong trình duyệt web
2. **Chọn kích thước bảng** (5x5, 7x7, hoặc 9x9)
3. **Chọn chế độ chơi**:
   - Chơi Tự do: Tìm hết số và tính thời gian
   - Chơi Giới hạn Thời gian: Đặt thời gian và tìm càng nhiều càng tốt
4. **Nhấn "Bắt đầu"** để bắt đầu trò chơi
5. **Click vào các số** theo thứ tự từ 1 đến số cuối cùng
6. **Nhấn "Dừng/Thiết lập lại"** để dừng hoặc bắt đầu lại

## Luật chơi

- Tìm các số theo thứ tự từ 1 đến số cuối cùng
- Click vào số đúng sẽ chuyển màu xanh
- Click vào số sai sẽ chuyển màu đỏ và hiển thị thông báo
- Trong chế độ tự do: hoàn thành khi tìm hết số
- Trong chế độ giới hạn thời gian: kết thúc khi hết thời gian

## Cấu trúc file

```
game/
├── index.html      # File HTML chính
├── style.css      # File CSS cho giao diện
├── script.js      # File JavaScript cho logic trò chơi
└── README.md      # File hướng dẫn này
```

## Yêu cầu hệ thống

- Trình duyệt web hiện đại (Chrome, Firefox, Safari, Edge)
- Hỗ trợ JavaScript ES6+
- Không cần kết nối internet

## Tính năng kỹ thuật

- **HTML5**: Cấu trúc semantic, accessibility
- **CSS3**: Flexbox, Grid, animations, responsive design
- **JavaScript ES6+**: Classes, arrow functions, template literals
- **Không dependencies**: Chạy hoàn toàn offline

## Tùy chỉnh

Bạn có thể dễ dàng tùy chỉnh:
- Màu sắc trong file `style.css`
- Kích thước bảng trong file `script.js`
- Thời gian giới hạn mặc định
- Hiệu ứng animation

## Lợi ích

- **Cải thiện tập trung**: Luyện tập khả năng tập trung cao độ
- **Tăng tốc độ đọc**: Phát triển kỹ năng quét thông tin nhanh
- **Rèn luyện trí nhớ**: Ghi nhớ vị trí các số
- **Giảm stress**: Trò chơi thư giãn và giải trí

Chúc bạn chơi vui vẻ và cải thiện khả năng tập trung! 🎯
