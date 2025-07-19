import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import cinemaRoomService from '../services/cinemaRoomService';
import { CinemaRoom } from '../types';

export function useCinemaRoomQuery() {
  const queryClient = useQueryClient();

  // Lấy danh sách phòng chiếu
  const { data: rooms = [], isLoading, error } = useQuery<CinemaRoom[]>({
    queryKey: ['cinemaRooms'],
    queryFn: () => cinemaRoomService.getAll(),
  });

  // Thêm phòng chiếu
  const createRoom = useMutation({
    mutationFn: (data: { cinema_room_name: string }) => cinemaRoomService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cinemaRooms'] }),
  });

  // Sửa phòng chiếu
  const updateRoom = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { cinema_room_name: string } }) =>
      cinemaRoomService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cinemaRooms'] }),
  });

  // Xóa phòng chiếu
  const deleteRoom = useMutation({
    mutationFn: (id: number) => cinemaRoomService.softDelete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cinemaRooms'] }),
  });

  return {
    rooms,
    isLoading,
    error,
    createRoom,
    updateRoom,
    deleteRoom,
  };
} 