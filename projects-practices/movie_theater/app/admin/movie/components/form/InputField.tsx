import { InputHTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { UpdateMovieDto } from '../../services/movieService';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: UseFormRegister<UpdateMovieDto>;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  name:
    | 'name'
    | 'content'
    | 'director'
    | 'duration'
    | 'from_date'
    | 'to_date'
    | 'production_company'
    | 'thumbnail'
    | 'banner'
    | 'limited_age'
    | 'trailer'
    | 'nation'
    | 'is_deleted'
    | 'actors'
    | 'gernes'
    | 'versions';
  type?: string;
}
export default function InputField({
  label,
  register,
  name,
  type = 'text',
  inputRef,
  ...props
}: InputFieldProps) {
  return (
    <div>
      <label className='block font-medium'>{label}</label>
      <input
        {...register(name)}
        type={type}
        className='border p-2 w-full'
        {...props}
        ref={inputRef}
      ></input>
    </div>
  );
}
