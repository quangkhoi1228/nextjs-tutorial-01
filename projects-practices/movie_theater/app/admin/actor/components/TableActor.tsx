'use client';
import React from 'react';
import { Actor } from '../services/actorService';

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

// Optional: Extracted cell component
const Cell = ({ children, className = '' }: React.PropsWithChildren<{ className?: string }>) => (
  <td className={`py-2 px-4 border-b ${className}`}>{children}</td>
);

// Optional: Extracted actor row
const ActorRow = ({ actor, onEdit }: { actor: Actor; onEdit: (actor: Actor) => void }) => (
  <tr key={actor.id} className="hover:bg-gray-50 transition">
    <Cell>{actor.name}</Cell>
    <Cell>{actor.stage_name}</Cell>
    <Cell className="capitalize">{actor.gender}</Cell>
    <Cell>{actor.date_of_birth}</Cell>
    <Cell>{actor.nationality}</Cell>
    <Cell className="text-center">
      <img
        src={actor.profile_image}
        alt={actor.name}
        className="w-10 h-10 object-cover rounded-full mx-auto border"
      />
    </Cell>
    <Cell className="text-center">
      <button
        onClick={() => onEdit(actor)}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Sửa
      </button>
    </Cell>
  </tr>
);

export default function TableActor({
  actors,
  loading,
  error,
  onEdit,
}: TableActorProps) {
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            {['Tên', 'Tên nghệ danh', 'Giới tính', 'Ngày sinh', 'Quốc tịch', 'Ảnh', 'Thao tác'].map((title, idx) => (
              <th key={idx} className="py-2 px-4 font-semibold border-b text-left">
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {actors.map(actor => (
            <ActorRow key={actor.id} actor={actor} onEdit={onEdit} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
