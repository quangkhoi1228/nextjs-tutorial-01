import { Plus } from 'lucide-react';

function AddNewButton() {
  return (
    <button className='bg-[#007cbc] text-white p-2 px-4 rounded-md m-4 flex items-center gap-2'>
      <Plus
        className='w-4 h-4 bg-white text-[#007cbc] rounded-full'
        strokeWidth={4}
      />
      Add new
    </button>
  );
}

export default AddNewButton;
