import { Plus } from 'lucide-react'
import React from 'react'

interface AddnewButtonProps {
  onClick: () => void;
}

export default function AddnewButton({ onClick }: AddnewButtonProps) {
  return (
    <button 
      onClick={onClick}
      className='bg-[#007cbc] text-white p-2 px-4 rounded-md m-4 flex items-center gap-2 hover:bg-[#005a8b] transition-colors'
    >
      <Plus className='w-4 h-4 bg-white text-[#007cbc] rounded-full' />
      Thêm phim mới
    </button>
  )
}

