// Định nghĩa các type/interface liên quan đến CinemaRoom domain
export interface CinemaRoom {
  id: number;
  cinema_room_name: string;
  is_deleted?: boolean;
}

export interface TableCinemaRoomProps {
  rooms: CinemaRoom[];
  onEdit: (room: CinemaRoom) => void;
  onDelete: (room: CinemaRoom) => void;
  onDetail: (room: CinemaRoom) => void;
  onSoftDelete: (room: CinemaRoom) => void;
}

export interface CinemaRoomFormProps {
  initialData?: CinemaRoom | null;
  onSubmit: (data: { cinema_room_name: string }) => void;
  onCancel: () => void;
  error?: string | null;
}

export interface CinemaRoomDetailModalProps {
  room: CinemaRoom | null;
  isOpen: boolean;
  onClose: () => void;
} 