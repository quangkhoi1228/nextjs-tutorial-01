// import { useState, useEffect, useCallback } from 'react';
// import cinemaRoomService from '../services/cinemaRoomService';
// import { CinemaRoom } from '../types';
// import { handleApiError } from '@/app/utils/errorHandler';
// import { useToast } from './useToast';
// import { useSearchFilter } from './useSearchFilter';
// import { useModal } from './useModal';
// import { CINEMA_ROOM_MESSAGES } from '../constants';

// interface ToastState {
//   message: string;
//   type: "success" | "error" | "warning" | "info";
//   isVisible: boolean;
// }

// export function useCinemaRoom() {
//   const [rooms, setRooms] = useState<CinemaRoom[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedRoom, setSelectedRoom] = useState<CinemaRoom | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredRooms, setFilteredRooms] = useState<CinemaRoom[]>([]);
//   const [isDetailOpen, setIsDetailOpen] = useState(false);
//   const [isCreateOpen, setIsCreateOpen] = useState(false);
//   const [toast, setToast] = useState<ToastState>({
//     message: '',
//     type: 'info',
//     isVisible: false,
//   });

//   const showToast = (
//     message: string,
//     type: "success" | "error" | "warning" | "info" = "info"
//   ) => {
//     setToast({ message, type, isVisible: true });
//   };
//   const hideToast = () => {
//     setToast((prev) => ({ ...prev, isVisible: false }));
//   };

//   const fetchRooms = useCallback(async () => {
//     setLoading(true);
//     try {
//       const data = await cinemaRoomService.getAll();
//       setRooms(data);
//       setError(null);
//     } catch (err: any) {
//       setError(err.message || 'Lỗi khi tải danh sách phòng chiếu');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchRooms();
//   }, [fetchRooms]);

//   const handleDeleteRoom = async (data: CinemaRoom) => {
//     if (window.confirm(`Bạn có chắc muốn xóa phòng chiếu "${data.cinema_room_name}"?`)) {
//       try {
//         setLoading(true);
//         await cinemaRoomService.softDelete(data.id);
//         showToast(CINEMA_ROOM_MESSAGES.DELETE_SUCCESS, 'success');
//         setRooms(prev => prev.filter(room => room.id !== data.id));
//         setFilteredRooms(prev => prev.filter(room => room.id !== data.id));
//       } catch (error) {
//         showToast(handleApiError(error) || CINEMA_ROOM_MESSAGES.ERROR, 'error');
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleAddRoom = () => {
//     setSelectedRoom(null);
//     setIsModalOpen(true);
//     setIsCreateOpen(true);
//   };

//   const handleCreateRoom = async (data: { cinema_room_name: string }) => {
//     try {
//       setLoading(true);
//       await cinemaRoomService.create(data);
//       showToast(CINEMA_ROOM_MESSAGES.CREATE_SUCCESS, 'success');
//       await fetchRooms();
//       setIsModalOpen(false);
//     } catch (error) {
//       showToast(handleApiError(error) || CINEMA_ROOM_MESSAGES.ERROR, 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditRoom = (room: CinemaRoom) => {
//     setSelectedRoom(room);
//     setIsModalOpen(true);
//     setIsCreateOpen(false);
//   };

//   const handleUpdateRoom = async (id: number, data: { cinema_room_name: string }) => {
//     try {
//       setLoading(true);
//       await cinemaRoomService.update(id, data);
//       showToast(CINEMA_ROOM_MESSAGES.UPDATE_SUCCESS, 'success');
//       await fetchRooms();
//       setIsModalOpen(false);
//     } catch (error) {
//       showToast(handleApiError(error) || CINEMA_ROOM_MESSAGES.ERROR, 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//   };

//   const handleShowDetail = (room: CinemaRoom) => {
//     setSelectedRoom(room);
//     setIsDetailOpen(true);
//   };

//   const closeModal = () => setIsModalOpen(false);
//   const closeDetailModal = () => setIsDetailOpen(false);

//   useEffect(() => {
//     if (searchQuery) {
//       const filtered = rooms.filter(room =>
//         room.cinema_room_name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredRooms(filtered);
//     } else {
//       setFilteredRooms(rooms);
//     }
//   }, [rooms, searchQuery]);

//   // Save handler (for form submit)
//   const handleSaveRoom = async (data: { cinema_room_name: string }) => {
//     if (isCreateOpen) {
//       await handleCreateRoom(data);
//     } else if (selectedRoom) {
//       await handleUpdateRoom(selectedRoom.id, data);
//     }
//     setIsCreateOpen(false);
//     setIsModalOpen(false);
//   };

//   // Cancel handler (for form cancel)
//   const handleCancelRoom = () => {
//     setIsCreateOpen(false);
//     setIsModalOpen(false);
//   };

//   return {
//     rooms,
//     loading,
//     error,
//     selectedRoom,
//     isModalOpen,
//     searchQuery,
//     isDetailOpen,
//     isCreateOpen,
//     filteredRooms,
//     handleAddRoom,
//     handleEditRoom,
//     handleSearch,
//     closeModal,
//     fetchRooms,
//     handleDeleteRoom,
//     setIsDetailOpen,
//     handleShowDetail,
//     handleCreateRoom,
//     handleUpdateRoom,
//     closeDetailModal,
//     toast,
//     showToast,
//     hideToast,
//     handleSaveRoom,
//     handleCancelRoom,
//   };
// }