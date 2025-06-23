// app/actor/components/TableActor.tsx
'use client';
import React from 'react';

import { Actor } from '../services/actorService';
import UtilityContainer from '@/app/components/UtilityContainer';
import SearchInput from '@/app/components/SearchInput';
import Pagination from '@/app/components/Pagination';

interface TableActorProps {
  actors: Actor[];
  loading: boolean;
  error: string | null;
  onEdit: (actor: Actor) => void;
  searchValue: string;
  onSearch: (value: string) => void;
  currentPage: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  totalPages?: number;
}

export default function TableActor({
  actors,
  loading,
  error,
  onEdit,
  searchValue,
  onSearch,
  currentPage,
  onPreviousPage,
  onNextPage,
  totalPages,
}: TableActorProps) {
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
     
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Stage Name</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Quốc tịch</th>
            <th>Ảnh</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {actors.map(actor => (
            <tr key={actor.id}>
              <td>{actor.name}</td>
              <td>{actor.stage_name}</td>
              <td>{actor.gender}</td>
              <td>{actor.date_of_birth}</td>
              <td>{actor.nationality}</td>
              <td>
                <img src={actor.profile_image} alt={actor.name} width={40} />
              </td>
              <td>
                <button onClick={() => onEdit(actor)}>Sửa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
    </>
  );
}