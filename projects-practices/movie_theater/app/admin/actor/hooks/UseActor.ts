// app/actor/hooks/useActorManagement.ts
'use client';
import { useState, useEffect, useCallback } from 'react';
import { Actor, ActorService } from '../services/actorService';
import { handleApiError } from '@/app/utils/errorHandler';

interface ToastState {
  message: string;
  type: "success" | "error" | "warning" | "info";
  isVisible: boolean;
}
export function useActorManagement() {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchActorForm, setSearchActorForm] = useState('');
  const [filteredActor, setFilteredActors] = useState<Actor[]>([])
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  

  const [toast, setToast] = useState<ToastState>({
    message: "",
    type: "info",
    isVisible: false,
  });
  // const [isDeleted,setIsDeleted] = use

  const showToast = (
    message: string,
    type: "success" | "error" | "warning" | "info" = "info"
  ) => {
    setToast({ message, type, isVisible: true });
  };
  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };
  const fetchActors = useCallback(async () => {
    setLoading(true);
    try {
      const data = await ActorService.getAll();
      setActors(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tải danh sách diễn viên');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActors();
  }, [fetchActors]);

  const handleDeleteActor = async (data: Actor)=>{
    if(window.confirm(`Ban co chac muon xoa dien vien "${data.id}"`)){
      try{
        setLoading(false);
        await ActorService.softDelete(data.id);
        showToast("Xoa phim thanh cong!!","success");
        setActors(prev => prev.filter(actor => actor.id !==data.id));
        setFilteredActors(prev =>prev.filter(actor => actor.id !== data.id) )
      }catch(error){
        showToast(handleApiError(error),"error")
      }finally{
        setLoading(true);
      }
    }

  }
  const handleAddActor = () => {
    
    setIsModalOpen(true);
  };

  const handleCreateMovie = async (data: Actor)=>{
    try{
      setLoading(false);
      await ActorService.create(data);
      showToast("Them dien vien thanh cong!","success");
      await fetchActors();
      setIsModalOpen(false);
    }catch(error){
      showToast(handleApiError(error), "error");
    }finally{
      setLoading(true);
    }
  }

  const handleEditActor = (actor: Actor) => {
    setSelectedActor(actor);
    setIsModalOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Không cần setFilteredActors ở đây nữa, sẽ xử lý bằng useEffect bên dưới
  };

  const handleSearchActorForm = (query: string) => {
    setSearchActorForm(query);
    // Có thể gọi ActorService.search(query) nếu muốn search realtime trong form
  };
  const handleShowDetail = (actor: Actor) =>{
    setSelectedActor(actor);
    setIsDetailOpen(true);
  }

  const closeModal = () => setIsModalOpen(false);

  // Luôn đồng bộ filteredActor khi actors hoặc searchQuery thay đổi
  useEffect(() => {
    if (searchQuery) {
      const filtered = actors.filter((actor) =>
        actor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredActors(filtered);
    } else {
      setFilteredActors(actors);
    }
  }, [actors, searchQuery]);

  return {
    actors,
    loading,
    error,
    selectedActor,
    isModalOpen,
    searchQuery,
    isDetailOpen,
    handleAddActor,
    handleEditActor,
    handleSearch,
    closeModal,
    fetchActors,
    searchActorForm,
    handleSearchActorForm,
    handleDeleteActor,
    setIsDetailOpen,
    handleShowDetail,
    handleCreateMovie,
    filteredActor,
    isCreateOpen,
  };
}