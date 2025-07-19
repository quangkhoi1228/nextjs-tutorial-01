'use client'
import React, { useState } from 'react';
import CinemaRoomForm from './components/CinemaRoomForm';
import TableCinemaRoom from './components/TableCinemaRoom';
import CinemaRoomDetailModal from './components/DetailCinemaroom.tsx/CinemaRoomDetailModal';
import { useCinemaRoomQuery } from './hooks/useCinemaRoomQuery';
import { CinemaRoom } from './types';
import { toast as sonnerToast, Toaster } from 'sonner';

export default function CinemaRoomPage() {
    const {
        rooms,
        isLoading,
        error,
        createRoom,
        updateRoom,
        deleteRoom,
    } = useCinemaRoomQuery();

    // UI state
    const [selectedRoom, setSelectedRoom] = useState<CinemaRoom | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Filtered rooms
    const filteredRooms = rooms.filter(room => room.cinema_room_name.toLowerCase().includes(searchQuery.toLowerCase()));

    // Handlers
    const handleAddRoom = () => {
        setSelectedRoom(null);
        setIsModalOpen(true);
        setIsCreateOpen(true);
    };
    const handleEditRoom = (room: CinemaRoom) => {
        setSelectedRoom(room);
        setIsModalOpen(true);
        setIsCreateOpen(false);
    };
    const handleShowDetail = (room: CinemaRoom) => {
        setSelectedRoom(room);
        setIsDetailOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);
    const closeDetailModal = () => setIsDetailOpen(false);
    const handleSearch = (query: string) => setSearchQuery(query);

    // CRUD handlers
    const handleSaveRoom = (data: { cinema_room_name: string }) => {
        if (isCreateOpen) {
            createRoom.mutate(data, {
                onSuccess: () => {
                    sonnerToast.success('Thêm phòng chiếu thành công!');
                    setIsModalOpen(false);
                },
                onError: (error: any) => {
                    const message = error?.response?.data?.message || error?.message || 'Lỗi khi thêm phòng chiếu';
                    sonnerToast.error(message);
                },
            });
        } else if (selectedRoom) {
            updateRoom.mutate({ id: selectedRoom.id, data }, {
                onSuccess: () => {
                    sonnerToast.success('Cập nhật phòng chiếu thành công!');
                    setIsModalOpen(false);
                },
                onError: (error: any) => {
                    const message = error?.response?.data?.message || error?.message || 'Lỗi khi cập nhật phòng chiếu';
                    sonnerToast.error(message);
                },
            });
        }
        setIsCreateOpen(false);
    };
    const handleDeleteRoom = (room: CinemaRoom) => {
        if (window.confirm(`Bạn có chắc muốn xóa phòng chiếu "${room.cinema_room_name}"?`)) {
            deleteRoom.mutate(room.id, {
                onSuccess: () => sonnerToast.success('Xóa phòng chiếu thành công!'),
                onError: (error: any) => {
                    const message = error?.response?.data?.message || error?.message || 'Lỗi khi xóa phòng chiếu';
                    sonnerToast.error(message);
                },
            });
        }
    };
    const handleCancelRoom = () => {
        setIsCreateOpen(false);
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen flex bg-white dark:bg-[#18181b]">
            <Toaster position="bottom-right" richColors closeButton duration={5000} />
            <main className="flex-1 flex flex-col">
                <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 dark:border-[#23232a] bg-white dark:bg-[#18181b] w-full">
                    <h1 className="text-3xl font-bold text-black dark:text-white">Quản lý phòng chiếu</h1>
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            placeholder="Tìm kiếm phòng chiếu..."
                            value={searchQuery}
                            onChange={e => handleSearch(e.target.value)}
                            className="max-w-xs border px-3 py-2 rounded bg-white text-black dark:bg-[#2a2a2e] dark:text-white dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400"
                        />
                        <button
                            onClick={handleAddRoom}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            + Thêm phòng chiếu
                        </button>
                    </div>
                </div>
                <section className="flex-1 overflow-y-auto p-4">
                    {isLoading ? (
                        <div>Đang tải...</div>
                    ) : error ? (
                        <div className="text-red-600">Lỗi: {error.message}</div>
                    ) : (
                        <TableCinemaRoom
                            rooms={filteredRooms.filter(room => !room.is_deleted)}
                            onEdit={handleEditRoom}
                            onDelete={handleDeleteRoom}
                            onDetail={handleShowDetail}
                            onSoftDelete={handleDeleteRoom}
                        />
                    )}
                    <CinemaRoomDetailModal
                        isOpen={isDetailOpen}
                        onClose={closeDetailModal}
                        room={selectedRoom}
                    />
                    {(isModalOpen || isCreateOpen) && (
                        <div className="fixed inset-0 bg-gray-900/40 flex items-center justify-center z-50">
                            <div className="rounded-lg shadow-lg p-6 w-full max-w-md relative bg-white dark:bg-[#2a2a2e] text-black dark:text-white">
                                <CinemaRoomForm
                                    initialData={isCreateOpen ? null : selectedRoom}
                                    onSubmit={handleSaveRoom}
                                    onCancel={handleCancelRoom}
                                />
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}   