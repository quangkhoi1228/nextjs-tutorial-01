

// interface Option{
//     id: number;
//     name: string;
// }
// interface MultilSelectProps{
//     label : string;
//     options: Option[];
//     onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
// }
// export default function MultiSelectField({label, options, onChange}: MultilSelectProps){
//     return (
//         <div>
//         <label className="block font-meidum">{label}
//         </label>
//         <select multiple className="border p-2 w-full" onChange={onChange}>
//             {options.map(opt =>(
//                 <option key ={opt.id} value={opt.id}>{opt.name}</option>
//             ))}

//         </select>
        
//         </div>
//     )
// }