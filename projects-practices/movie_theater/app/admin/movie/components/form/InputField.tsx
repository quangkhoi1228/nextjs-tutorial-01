// import { InputHTMLAttributes } from 'react';
// import { UseFormRegister } from 'react-hook-form';

// interface InputFieldProps<T> extends InputHTMLAttributes<HTMLInputElement> {
//   label: string;
//   register: UseFormRegister<T>;
//   name: keyof T | string;
//   type?: string;
//   inputRef?: React.Ref<HTMLInputElement>;
// }

// export default function InputField<T>({
//   label,
//   register,
//   name,
//   type = 'text',
//   inputRef,
//   ...props
// }: InputFieldProps<T>) {
//   return (
//     <div>
//       <label className='block font-medium'>{label}</label>
//       <input
//         {...register(name as any)}
//         type={type}
//         ref={inputRef}
//         className='border p-2 w-full'
//         {...props}
//       />
//     </div>
//   );
// }
