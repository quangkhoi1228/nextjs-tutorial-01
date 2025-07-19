'use client';
import React from 'react';
import { Actor } from '../services/actorService';
import { Button } from '@/components/ui/button';

interface TableActorProps {
  actors: Actor[];
  loading: boolean;
  error: string | null;
  onEdit: (actor: Actor) => void;
  searchValue: string;
  onSearch: (value: string) => void;
  onDelete: (actor: Actor) => void;
  onShowDetail?: (actor: Actor) => void;

}

export default function TableActor({
  actors,
  loading,
  error,
  onEdit,
  onDelete,
  onShowDetail,
}: TableActorProps) {
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 bg-gray-100 dark:bg-[#18181b] min-h-screen">
      {actors.map((actor) => (
        <div
          key={actor.id}
          className="bg-gray-50 dark:bg-[#23232a] rounded-xl shadow-lg overflow-hidden flex flex-col border border-gray-200 dark:border-[#23232a] hover:border-cyan-400 transition group"
          onClick={()=> onShowDetail && onShowDetail(actor)}
          style={{cursor: onShowDetail ? "pointer":"default"}}
          
        >
          <div className="relative w-full">
            <img
              src={actor.profile_image}
              alt={actor.name}
              className="w-full h-40 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
            />
             <div className="absolute top-3 right-3 flex gap-2 z-10">
              <Button
                variant="outline"
                size="sm"
                className="border-cyan-400 bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-200 hover:bg-cyan-200 dark:hover:bg-cyan-800"
                title="Sửa"
                onClick={e => { e.stopPropagation(); onEdit(actor); }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2h6" /></svg>
                Sửa
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="border-red-400 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800"
                title="Xóa"
                onClick={e => { e.stopPropagation(); onDelete(actor); }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                Xóa
              </Button>
            </div>
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1 truncate" title={actor.name}>{actor.name}</h3>
            <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Nghệ danh: <span className="text-gray-800 dark:text-white">{actor.stage_name}</span></div>
            <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Giới tính: <span className="text-gray-800 dark:text-white capitalize">{actor.gender}</span></div>
            <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Ngày sinh: <span className="text-gray-800 dark:text-white">{actor.date_of_birth}</span></div>
            <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Quốc tịch: <span className="text-gray-800 dark:text-white">{actor.nationality}</span></div>
            <div className="flex gap-2 justify-end mt-2">
             

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
