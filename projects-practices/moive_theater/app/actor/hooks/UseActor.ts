// app/actor/hooks/useActorManagement.ts
'use client';
import { useState, useEffect, useCallback } from 'react';
import { Actor, ActorService } from '../services/actorService';

export function useActorManagement() {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleAddActor = () => {
    setSelectedActor(null);
    setIsModalOpen(true);
  };

  const handleEditActor = (actor: Actor) => {
    setSelectedActor(actor);
    setIsModalOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Có thể gọi ActorService.search(query) nếu muốn search realtime
  };

  const closeModal = () => setIsModalOpen(false);

  return {
    actors,
    loading,
    error,
    selectedActor,
    isModalOpen,
    searchQuery,
    handleAddActor,
    handleEditActor,
    handleSearch,
    closeModal,
    fetchActors,
  };
}