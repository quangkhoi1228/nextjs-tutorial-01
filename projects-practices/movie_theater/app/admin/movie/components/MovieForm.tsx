import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface Option {
  id: number;
  name: string;
}

interface MovieFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  defaultValues?: any;
}

export default function MovieForm({ open, onClose, onSubmit, defaultValues = {} }: MovieFormProps) {
  const { register, handleSubmit, setValue, watch } = useForm({ defaultValues });
  const [actors, setActors] = useState<Option[]>([]);
  const [genres, setGenres] = useState<Option[]>([]);

  // Fetch actors and genres when modal opens
  useEffect(() => {
    if (open) {
      fetch('/api/actors').then(res => res.json()).then(setActors);
      fetch('/api/gernes').then(res => res.json()).then(setGenres);
    }
  }, [open]);

  // Multi-select handler
  const handleMultiSelect = (field: string, values: string[]) => {
    setValue(field, values.map(Number));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">×</button>
        <h2 className="text-lg font-bold mb-4">Thêm / Sửa phim</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block font-medium">Tên phim</label>
            <input {...register('name', { required: true })} className="border p-2 w-full" />
          </div>
          <div>
            <label className="block font-medium">Mô tả</label>
            <textarea {...register('content')} className="border p-2 w-full" />
          </div>
          <div>
            <label className="block font-medium">Đạo diễn</label>
            <input {...register('director')} className="border p-2 w-full" />
          </div>
          <div>
            <label className="block font-medium">Thoi Luong</label>
            <input
              type="number"
              {...register('duration', { valueAsNumber: true })}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label className="block font-medium">Diễn viên</label>
            <select multiple className="border p-2 w-full" onChange={e => handleMultiSelect('actors', Array.from(e.target.selectedOptions, o => o.value))}>
              {actors.map(a => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium">Thể loại</label>
            <select multiple className="border p-2 w-full" onChange={e => handleMultiSelect('gernes', Array.from(e.target.selectedOptions, o => o.value))}>
              {genres.map(g => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium">Quốc gia</label>
            <input {...register('nation')} className="border p-2 w-full" />
          </div>
          <div>
            <label className="block font-medium">Trạng thái</label>
            <select {...register('is_deleted')} className="border p-2 w-full">
              <option value="false">Công khai</option>
              <option value="true">Đã xóa</option>
            </select>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-medium">Từ ngày</label>
              <input type="date" {...register('from_date')} className="border p-2 w-full" />
            </div>
            <div className="flex-1">
              <label className="block font-medium">Đến ngày</label>
              <input type="date" {...register('to_date')} className="border p-2 w-full" />
            </div>
          </div>
          <div>
            <label className="block font-medium">Trailer</label>
            <input {...register('trailer')} className="border p-2 w-full" />
          </div>
          <div>
            <label className="block font-medium">Giới hạn tuổi</label>
            <input {...register('limited_age')} className="border p-2 w-full" />
          </div>
          <div>
            <label className="block font-medium">Công ty sản xuất</label>
            <input {...register('production_company')} className="border p-2 w-full" />
          </div>
          <div>
            <label className="block font-medium">Thumbnail</label>
            <input {...register('thumbnail')} className="border p-2 w-full" />
          </div>
          <div>
            <label className="block font-medium">Banner</label>
            <input {...register('banner')} className="border p-2 w-full" />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Hủy</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
}
