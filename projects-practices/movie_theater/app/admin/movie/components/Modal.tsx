import { ReactNode } from "react";

// co the dung  PropswithChildren   thi sex bo  children: Re... va thay doi o PropswithChildren<>
interface ModalProps{
    open: boolean;
    onClose: () => void;
    children: ReactNode; 
}
export default function Modal({open, onClose, children}: ModalProps){
    if(!open) return null;
    return(
        <div className="fixed inset-0 bg-black bg-opacity-30 flex
        
        items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl relative
            ">
                <button onClick={onClose} className ="absolute top-2 right-2 text-xl">x</button>
            {children}
            </div>
        </div>
        
    )
}