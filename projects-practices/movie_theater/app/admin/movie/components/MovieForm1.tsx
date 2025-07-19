import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import { Genre, getAllActors, getAllGernes, getAllVersions, UpdateMovieDto } from '../services/movieService';

interface Option {
  id: number;
  name: string;
}
interface MovieFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateMovieDto) => void;
  defaultValues: UpdateMovieDto;
  isLoading?: boolean;
}

export default function MovieForm({
  open,
  onClose,
  onSubmit,
  defaultValues,
  isLoading,
}: MovieFormProps) {
  // const { register, handleSubmit, control, reset } = useForm<UpdateMovieDto>({ defaultValues });
  const { register, handleSubmit, control, reset } = useForm<UpdateMovieDto>({
    defaultValues: {
      ...defaultValues,
      actors: defaultValues.actors || [],
      gernes: defaultValues.gernes || [],
      versions: defaultValues.versions || [],
    },
  });
  const [actors, setActors] = useState<Option[]>([]);
  const [genres, setGenres] = useState<Option[]>([]);
  const [versions, setVersion] = useState<Option[]>([]);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    reset(defaultValues);
    if (open) {
      getAllActors().then(setActors);
      getAllGernes().then((data) =>
        setGenres(data.map((g: Genre) => ({ id: g.id, name: g.genre_name })))
      );
      getAllVersions().then(setVersion);
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    }
  }, [open, defaultValues, reset]);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogTitle>Thêm / Sửa phim</DialogTitle>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 max-h-[70vh] overflow-y-auto"
        >
          <div>
            <label className="block font-medium">Tên phim</label>
            {/* <Input {...register('name', { required: true })} ref={nameInputRef} /> */}
            <Input
              {...register('name', { required: true })}
              ref={(e) => {
                register('name').ref(e);     // để react-hook-form hoạt động
                nameInputRef.current = e;    // để bạn focus
              }}
            />
          </div>
          <div>
            <label className="block font-medium">Mô tả</label>
            <Textarea {...register('content')} />
          </div>
          <div>
            <label className="block font-medium">Đạo diễn</label>
            <Input {...register('director')} />
          </div>
          <div>
            <label className="block font-medium">Thời lượng</label>
            <Input
              type="number"
              min={0}
              {...register('duration', { valueAsNumber: true, min: 0 })}
            />
          </div>

          <Controller
            control={control}
            name="actors"
            render={({ field: { onChange, value = [] } }) => {
              const [search, setSearch] = useState('');
              const filteredActors = actors.filter(a =>
                a.name.toLowerCase().includes(search.toLowerCase())
              );
              const handleCheck = (id: number) => {
                if (value.includes(id)) {
                  onChange(value.filter((v: number) => v !== id));
                } else {
                  onChange([...value, id]);
                }
              };
              return (
                <div>
                  <label className="block font-medium mb-1">Diễn viên</label>
                  <input
                    type="text"
                    placeholder="Tìm diễn viên..."
                    className="border p-2 w-full mb-2"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                  <div className="max-h-40 overflow-y-auto border rounded p-2">
                    {filteredActors.length === 0 && (
                      <div className="text-gray-500 text-sm">Không tìm thấy diễn viên</div>
                    )}
                    {filteredActors.map(a => (
                      <label key={a.id} className="flex items-center gap-2 mb-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value.includes(a.id)}
                          onChange={() => handleCheck(a.id)}
                        />
                        <span>{a.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            }}
          />
          <Controller
            control={control}
            name="versions"
            render={({ field: { onChange, value = [] } }) => {
              const [search, setSearch] = useState('');
              const filteredVersions = versions.filter(v =>
                v.name.toLowerCase().includes(search.toLowerCase())
              );
              const handleCheck = (id: number) => {
                if (value.includes(id)) {
                  onChange(value.filter((v: number) => v !== id));
                } else {
                  onChange([...value, id]);
                }
              };
              return (
                <div>
                  <label className="block font-medium mb-1">Phiên bản</label>
                  <input
                    type="text"
                    placeholder="Tìm phiên bản..."
                    className="border p-2 w-full mb-2"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                  <div className="max-h-40 overflow-y-auto border rounded p-2">
                    {filteredVersions.length === 0 && (
                      <div className="text-gray-500 text-sm">Không tìm thấy phiên bản</div>
                    )}
                    {filteredVersions.map(v => (
                      <label key={v.id} className="flex items-center gap-2 mb-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value.includes(v.id)}
                          onChange={() => handleCheck(v.id)}
                        />
                        <span>{v.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            }}
          />
          <Controller
            control={control}
            name="gernes"
            render={({ field: { onChange, value = [] } }) => {
              const [search, setSearch] = useState('');
              const filteredGenres = genres.filter(g =>
                g.name.toLowerCase().includes(search.toLowerCase())
              );
              const handleCheck = (id: number) => {
                if (value.includes(id)) {
                  onChange(value.filter((v: number) => v !== id));
                } else {
                  onChange([...value, id]);
                }
              };
              return (
                <div>
                  <label className="block font-medium mb-1">Thể loại</label>
                  <input
                    type="text"
                    placeholder="Tìm thể loại..."
                    className="border p-2 w-full mb-2"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                  <div className="max-h-40 overflow-y-auto border rounded p-2">
                    {filteredGenres.length === 0 && (
                      <div className="text-gray-500 text-sm">Không tìm thấy thể loại</div>
                    )}
                    {filteredGenres.map(g => (
                      <label key={g.id} className="flex items-center gap-2 mb-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value.includes(g.id)}
                          onChange={() => handleCheck(g.id)}
                        />
                        <span>{g.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            }}
          />
          <div>
            <label className="block font-medium">Quốc gia</label>
            <Input {...register('nation')} />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-medium">Từ ngày</label>
              <Input type="date" {...register('from_date')} />
            </div>
            <div className="flex-1">
              <label className="block font-medium">Đến ngày</label>
              <Input type="date" {...register('to_date')} />
            </div>
          </div>
          <div>
            <label className="block font-medium">Trailer</label>
            <Input type="url" {...register('trailer')} />
          </div>
          <div>
            <label className="block font-medium">Giới hạn tuổi</label>
            <Input {...register('limited_age')} />
          </div>
          <div>
            <label className="block font-medium">Công ty sản xuất</label>
            <Input {...register('production_company')} />
          </div>
          <div>
            <label className="block font-medium">Thumbnail</label>
            <Input {...register('thumbnail')} />
          </div>
          <div>
            <label className="block font-medium">Banner</label>
            <Input {...register('banner')} />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={onClose} disabled={isLoading}>
              Hủy
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Đang xử lý...' : 'Lưu'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
