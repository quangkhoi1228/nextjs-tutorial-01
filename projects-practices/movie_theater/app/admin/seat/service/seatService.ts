import { BaseService } from '../../api/baseService';

export interface Seat {
  id: string;
  seat_row: string;
  seat_column: string;
  seatType?: any; // Có thể thay bằng interface SeatType nếu muốn chuẩn hóa
  cinemaRoom?: any; // Có thể thay bằng interface CinemaRoom nếu muốn chuẩn hóa
  is_deleted?: boolean;
  // Thêm các trường khác nếu cần
}

const seatService = new BaseService<Seat>('/seat');
export default seatService;
