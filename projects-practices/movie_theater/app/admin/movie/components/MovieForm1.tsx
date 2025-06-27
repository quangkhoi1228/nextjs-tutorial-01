import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Modal from './Modal';
import InputField from './form/InputField';
import MultiSelectField from './form/MultiSelectField';
import { getAllActors } from '../services/actorService';
import { getAllGernes } from '../services/gerneService';
import { getAllVersions } from '../services/versionService';
import { Genre, UpdateMovieDto } from '../services/movieService';

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
  const { register, handleSubmit, control, reset } = useForm({ defaultValues });
  const [actors, setActors] = useState<Option[]>([]);
  const [genres, setGenres] = useState<Option[]>([]);
  const [versions, setVersion] = useState<Option[]>([]);

  useEffect(() => {
    reset(defaultValues);
    if (open) {
      getAllActors().then(setActors);
      getAllGernes().then((data) =>
        setGenres(data.map((g: Genre) => ({ id: g.id, name: g.genre_name })))
      );
      getAllVersions().then(setVersion);
    }
  }, [open, defaultValues, reset]);

  // const handleMultiSelect = (field: string, values: string[]) => {
  //     setValue(field, values.map(Number));
  // }
  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className='text-lg font-bold mb-4'>Thêm / Sửa phim</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-4
        max-h-[70vh] overflow-y-auto'
      >
        <InputField label='Tên phim' name='name' register={register} required />
        <InputField
          label='Mô tả'
          name='content'
          register={register}
        ></InputField>
        <InputField
          label='Đạo diễn'
          name='director'
          register={register}
        ></InputField>
        <InputField
          label='Thời lượng'
          name='duration'
          register={register}
          type='number'
        ></InputField>
        <Controller
          control={control}
          name='gernes'
          render={({ field }) => (
            <MultiSelectField
              label='Thể loại'
              options={genres}
              onChange={(e) =>
                field.onChange(
                  Array.from(e.target.selectedOptions, (o) => Number(o.value))
                )
              }
            />
          )}
        />
        <Controller
          control={control}
          name='actors'
          render={({ field }) => (
            <MultiSelectField
              label='Diễn Viên'
              options={actors}
              onChange={(e) =>
                field.onChange(
                  Array.from(e.target.selectedOptions, (o) => Number(o.value))
                )
              }
            />
          )}
        />

        <Controller
          control={control}
          name='versions'
          render={({ field }) => (
            <MultiSelectField
              label='Phiên Bản'
              options={versions}
              onChange={(e) =>
                field.onChange(
                  Array.from(e.target.selectedOptions, (o) => Number(o.value))
                )
              }
            />
          )}
        />
        <InputField
          label='Quốc gia '
          name='nation'
          register={register}
          type='value'
        />

        <div>
          <label className='block font-medium'>Trang thai</label>
          <select {...register('is_deleted')} className='border p-2 w-full' />
          <option value='false'>cong khai</option>
          <option value='true'>Da xoa</option>
        </div>
        <div className='flex gap-4'>
          <InputField
            label='tu ngay'
            name='from_date'
            register={register}
            type='date'
          />
          <InputField
            label='den ngay'
            name='to_date'
            register={register}
            type='date'
          />
        </div>
        {/* <InputField label="Trailer" name="trailer" register={register} type='url' pattern={{
    value: /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/([\w/_.]*)?)?$/,
    message: "Vui lòng nhập đường dẫn hợp lệ"
  }} /> */}
        <InputField
          label='Trailer'
          name='trailer'
          register={register}
          type='url'
        />
        <InputField
          label='Giới hạn tuổi'
          name='limited_age'
          register={register}
          type='string'
        />
        <InputField
          label='Công ty sản xuất'
          name='production_company'
          register={register}
        />
        <InputField label='Thumbnail' name='thumbnail' register={register} />
        <InputField label='Banner' name='banner' register={register} />
        <div className='flex justify-end gap-2'>
          <button
            type='button'
            onClick={onClose}
            className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50'
            disabled={isLoading}
          >
            Hủy
          </button>
          <button
            type='submit'
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={isLoading}
          >
            {isLoading ? 'Đang xử lý...' : 'Lưu'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
