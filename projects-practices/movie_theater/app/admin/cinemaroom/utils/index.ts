// Các hàm tiện ích dùng chung cho domain CinemaRoom

export function formatRoomName(name: string): string {
  return name.trim().replace(/\s+/g, ' ');
} 