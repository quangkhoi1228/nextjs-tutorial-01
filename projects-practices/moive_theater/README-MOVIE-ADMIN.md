# Movie Admin Management System

## Tổng quan

Hệ thống quản lý phim (Movie Admin) được xây dựng dựa trên entity Movie từ backend, cung cấp giao diện quản lý đầy đủ cho việc CRUD phim.

## Tính năng chính

### 1. Quản lý phim
- **Xem danh sách phim**: Hiển thị tất cả phim với thông tin chi tiết
- **Thêm phim mới**: Form đầy đủ với validation
- **Chỉnh sửa phim**: Cập nhật thông tin phim hiện có
- **Xóa phim**: Xóa phim khỏi hệ thống
- **Xem chi tiết**: Modal hiển thị đầy đủ thông tin phim

### 2. Tìm kiếm và lọc
- Tìm kiếm theo tên phim, đạo diễn, quốc gia
- Lọc theo trạng thái (Đang chiếu, Sắp chiếu, Đã kết thúc, Đã xóa)

### 3. Thống kê
- Tổng số phim
- Số phim đang chiếu
- Số phim sắp chiếu
- Số phim đã xóa

## Cấu trúc dự án

```
app/
├── movie/
│   ├── components/
│   │   ├── TableMovie.tsx          # Bảng hiển thị danh sách phim
│   │   ├── MovieModal.tsx          # Modal thêm/sửa phim
│   │   ├── MovieDetailModal.tsx    # Modal xem chi tiết phim
│   │   ├── AddnewButton.tsx        # Nút thêm phim mới
│   │   ├── SearchInput.tsx         # Ô tìm kiếm
│   │   ├── Pagination.tsx          # Phân trang
│   │   ├── Tilte.tsx               # Tiêu đề trang
│   │   ├── UtilityContainer.tsx    # Container cho utility
│   │   └── usePagination.tsx       # Hook phân trang
│   └── page.tsx                    # Trang chính
├── services/
│   └── movieService.ts             # Service kết nối API
└── ...
```

## Các field của Movie Entity

### Thông tin cơ bản
- `id`: ID duy nhất
- `name`: Tên phim
- `content`: Nội dung tóm tắt
- `director`: Đạo diễn
- `duration`: Thời lượng (phút)
- `limited_age`: Độ tuổi giới hạn
- `trailer`: URL trailer
- `nation`: Quốc gia

### Thông tin chiếu
- `from_date`: Ngày bắt đầu chiếu
- `to_date`: Ngày kết thúc chiếu
- `production_company`: Công ty sản xuất

### Hình ảnh
- `thumbnail`: Ảnh thumbnail
- `banner`: Ảnh banner

### Trạng thái
- `is_deleted`: Trạng thái xóa

### Quan hệ
- `actors`: Danh sách diễn viên
- `gernes`: Danh sách thể loại
- `versions`: Danh sách phiên bản
- `schedules`: Lịch chiếu

## API Endpoints

### Base URL
```
http://localhost:3001
```

### Endpoints
- `GET /movie` - Lấy danh sách phim
- `GET /movie/:id` - Lấy chi tiết phim
- `POST /movie` - Tạo phim mới
- `PATCH /movie/:id` - Cập nhật phim
- `DELETE /movie/:id` - Xóa phim
- `GET /movie/search?q=query` - Tìm kiếm phim

## Cách sử dụng

### 1. Khởi chạy dự án
```bash
cd projects-practices/moive_theater
npm install
npm run dev
```

### 2. Truy cập trang quản lý phim
```
http://localhost:3000/movie
```

### 3. Các thao tác cơ bản

#### Thêm phim mới
1. Click nút "Thêm phim mới"
2. Điền đầy đủ thông tin bắt buộc (*)
3. Click "Thêm mới"

#### Chỉnh sửa phim
1. Click icon Edit (✏️) trong bảng
2. Chỉnh sửa thông tin cần thiết
3. Click "Cập nhật"

#### Xem chi tiết phim
1. Click icon Info (ℹ️) hoặc click vào thumbnail
2. Xem đầy đủ thông tin phim

#### Xóa phim
1. Click icon Delete (🗑️)
2. Xác nhận xóa

#### Tìm kiếm
- Sử dụng ô tìm kiếm để tìm phim theo tên, đạo diễn, quốc gia

## Validation

### Các field bắt buộc
- Tên phim
- Nội dung
- Đạo diễn
- Thời lượng (> 0)
- Công ty sản xuất
- Thumbnail URL
- Banner URL

### Validation logic
- Ngày kết thúc phải sau ngày bắt đầu
- Thời lượng phải là số dương
- URL phải hợp lệ

## Responsive Design

Giao diện được thiết kế responsive:
- Desktop: Hiển thị đầy đủ thông tin
- Tablet: Tối ưu layout
- Mobile: Stack layout, ẩn một số cột

## Error Handling

- Hiển thị loading state khi tải dữ liệu
- Fallback data khi API không khả dụng
- Error messages cho validation
- Confirm dialog cho các thao tác quan trọng

## Future Enhancements

1. **Upload ảnh**: Tích hợp upload ảnh thay vì nhập URL
2. **Bulk operations**: Xóa/chỉnh sửa nhiều phim cùng lúc
3. **Advanced filters**: Lọc theo thể loại, diễn viên, ngày
4. **Export/Import**: Xuất/nhập dữ liệu Excel/CSV
5. **Audit log**: Lưu lịch sử thay đổi
6. **Permissions**: Phân quyền người dùng

## Troubleshooting

### Lỗi kết nối API
- Kiểm tra backend có đang chạy không
- Kiểm tra URL trong `movieService.ts`
- Kiểm tra CORS configuration

### Lỗi validation
- Đảm bảo điền đầy đủ field bắt buộc
- Kiểm tra format URL cho thumbnail/banner
- Kiểm tra ngày tháng hợp lệ

### Lỗi hiển thị
- Refresh trang
- Kiểm tra console log
- Kiểm tra network tab trong DevTools 