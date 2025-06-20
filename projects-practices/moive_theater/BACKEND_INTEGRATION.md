---
noteId: "e69459204dd511f08bebbb44502fdbb2"
tags: []

---

# Backend Integration Guide

## Tổng quan

Hướng dẫn kết nối frontend Next.js với backend NestJS cho hệ thống quản lý rạp chiếu phim.

## Cấu trúc Backend (NestJS)

Dựa trên `app.module.ts`, backend có các module chính:

```typescript
// Core Modules
- MovieModule      // Quản lý phim
- ActorModule      // Quản lý diễn viên  
- GerneModule      // Quản lý thể loại
- VersionModule    // Quản lý phiên bản
- ScheduleModule   // Quản lý lịch chiếu
- CinemaRoomModule // Quản lý phòng chiếu
- SeatModule       // Quản lý ghế ngồi
- TicketModule     // Quản lý vé
- OrderModule      // Quản lý đơn hàng
- UserModule       // Quản lý người dùng
- AuthModule       // Xác thực
- PromotionModule  // Quản lý khuyến mãi
```

## API Endpoints

### 1. Movie Endpoints
```
GET    /movie              - Lấy danh sách phim (có pagination)
GET    /movie/:id          - Lấy chi tiết phim
POST   /movie              - Tạo phim mới
PATCH  /movie/:id          - Cập nhật phim
DELETE /movie/:id          - Xóa phim (soft delete)
GET    /movie/search       - Tìm kiếm phim
GET    /movie/stats        - Thống kê phim
POST   /movie/upload-image - Upload ảnh phim
```

### 2. Actor Endpoints
```
GET    /actor              - Lấy danh sách diễn viên
GET    /actor/:id          - Lấy chi tiết diễn viên
POST   /actor              - Tạo diễn viên mới
PATCH  /actor/:id          - Cập nhật diễn viên
DELETE /actor/:id          - Xóa diễn viên
```

### 3. Gerne Endpoints
```
GET    /gernes              - Lấy danh sách thể loại
GET    /gernes/:id          - Lấy chi tiết thể loại
POST   /gernes              - Tạo thể loại mới
PATCH  /gernes/:id          - Cập nhật thể loại
DELETE /gernes/:id          - Xóa thể loại
```

### 4. Version Endpoints
```
GET    /version            - Lấy danh sách phiên bản
GET    /version/:id        - Lấy chi tiết phiên bản
POST   /version            - Tạo phiên bản mới
PATCH  /version/:id        - Cập nhật phiên bản
DELETE /version/:id        - Xóa phiên bản
```

### 5. Schedule Endpoints
```
GET    /schedule           - Lấy danh sách lịch chiếu
GET    /schedule/movie/:id - Lấy lịch chiếu theo phim
POST   /schedule           - Tạo lịch chiếu mới
PATCH  /schedule/:id       - Cập nhật lịch chiếu
DELETE /schedule/:id       - Xóa lịch chiếu
```

## Cấu hình Frontend

### 1. Environment Variables
Tạo file `.env.local` trong thư mục gốc:

```env
# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000

# Frontend Configuration
NEXT_PUBLIC_APP_NAME=Movie Theater Admin
NEXT_PUBLIC_APP_VERSION=1.0.0

# Development Configuration
NODE_ENV=development
```

### 2. API Configuration
File `app/config/api.ts` chứa cấu hình API:

```typescript
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  ENDPOINTS: {
    MOVIE: {
      LIST: '/movie',
      DETAIL: (id: number) => `/movies/${id}`,
      // ... other endpoints
    },
    // ... other modules
  }
};
```

### 3. Service Layer
File `app/services/movieService.ts` chứa logic gọi API:

```typescript
export class MovieService {
  static async getAllMovies(params: MovieSearchParams = {}): Promise<PaginatedResponse<Movie>> {
    // Implementation
  }
  
  static async createMovie(movieData: CreateMovieDto): Promise<Movie> {
    // Implementation
  }
  
  // ... other methods
}
```

### 4. Custom Hook
File `app/hooks/useMovieManagement.ts` quản lý state:

```typescript
export const useMovieManagement = () => {
  // State management
  // API calls
  // Event handlers
};
```

## Cách sử dụng

### 1. Khởi chạy Backend
```bash
cd "d:\Movie_theater_p\Be_Nestjs - Copy"
npm install
npm run start:dev
```

Backend sẽ chạy trên `http://localhost:3001`

### 2. Khởi chạy Frontend
```bash
cd projects-practices/moive_theater
npm install
npm run dev
```

Frontend sẽ chạy trên `http://localhost:3000`

### 3. Truy cập Movie Admin
```
http://localhost:3000/movie
```

## Authentication

### JWT Token
Backend sử dụng JWT authentication. Token được lưu trong localStorage:

```typescript
// Lưu token
localStorage.setItem('token', response.data.token);

// Sử dụng token trong requests
headers: {
  'Authorization': `Bearer ${localStorage.getItem('token')}`
}
```

### Protected Routes
Một số endpoints yêu cầu authentication:
- POST, PATCH, DELETE operations
- Upload endpoints
- User-specific data

## Error Handling

### HTTP Status Codes
```typescript
200 - OK
201 - Created
204 - No Content
400 - Bad Request
401 - Unauthorized
403 - Forbidden
404 - Not Found
409 - Conflict
422 - Unprocessable Entity
500 - Internal Server Error
```

### Error Messages
```typescript
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet.',
  UNAUTHORIZED: 'Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn.',
  VALIDATION_ERROR: 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.',
  // ... other messages
};
```

## Database Schema

### Movie Entity
```typescript
@Entity('movie')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 100 })
  director: string;

  @Column({ type: 'int' })
  duration: number;

  @Column({ type: 'int', nullable: true })
  limited_age: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  trailer: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nation: string;

  @Column({ type: 'date' })
  from_date: Date;

  @Column({ type: 'date' })
  to_date: Date;

  @Column({ type: 'varchar', length: 100 })
  production_company: string;

  @Column({ type: 'varchar', length: 255 })
  thumbnail: string;

  @Column({ type: 'varchar', length: 255 })
  banner: string;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  // Relations
  @OneToMany(() => Schedule, (schedule) => schedule.movie)
  schedules: Schedule[];

  @ManyToMany(() => Actor, (actor) => actor.movies)
  actors: Actor[];

  @ManyToMany(() => Gerne, (gerne) => gerne.movies)
  gernes: Gerne[];

  @ManyToMany(() => Version, (version) => version.movies)
  versions: Version[];
}
```

## Troubleshooting

### 1. CORS Error
Nếu gặp CORS error, đảm bảo backend có cấu hình CORS:

```typescript
// main.ts
app.enableCors({
  origin: ['http://localhost:3000'],
  credentials: true,
});
```

### 2. Connection Refused
- Kiểm tra backend có đang chạy không
- Kiểm tra port 3001 có bị chiếm không
- Kiểm tra firewall settings

### 3. Authentication Error
- Kiểm tra token có hợp lệ không
- Kiểm tra token có hết hạn không
- Refresh token nếu cần

### 4. Validation Error
- Kiểm tra dữ liệu gửi lên có đúng format không
- Kiểm tra required fields
- Kiểm tra data types

## Development Tips

### 1. API Testing
Sử dụng Postman hoặc Insomnia để test API:
- Import collection từ backend
- Test các endpoints
- Kiểm tra response format

### 2. Debug Mode
Bật debug mode trong frontend:
```typescript
// Trong browser console
localStorage.setItem('debug', 'true');
```

### 3. Network Tab
Sử dụng Chrome DevTools Network tab để:
- Xem API requests
- Kiểm tra request/response
- Debug CORS issues

### 4. Error Logging
Implement error logging:
```typescript
console.error('API Error:', error);
// Hoặc gửi error đến service như Sentry
```

## Production Deployment

### 1. Environment Variables
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NODE_ENV=production
```

### 2. Build Frontend
```bash
npm run build
npm start
```

### 3. Deploy Backend
```bash
npm run build
npm run start:prod
```

### 4. Database Migration
```bash
npm run migration:run
```

## Security Considerations

### 1. HTTPS
Sử dụng HTTPS trong production

### 2. Input Validation
Validate tất cả input từ frontend

### 3. Rate Limiting
Implement rate limiting cho API

### 4. SQL Injection
Sử dụng TypeORM để tránh SQL injection

### 5. XSS Protection
Sanitize user input

### 6. CSRF Protection
Implement CSRF tokens nếu cần 