import { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement>{
    label: string;
    register: any;
    name: string;
    type: string
    
}
export default function InputField({label, register, name, type="text",...props}: InputFieldProps){
    return(
        <div>
            <label className="block font-medium">{label}</label>
            <input {...register(name)}
            type={type}
            className="border p-2 w-full" {...props} 
            ></input>
        </div>
    )
}