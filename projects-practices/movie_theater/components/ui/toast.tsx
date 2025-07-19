import { useEffect } from "react";

interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
}
export default function Toast({ message, type, isVisible, onClose, duration = 5000 }: ToastProps) {

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);
    if (!isVisible) return null;
    const getToastStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-green-500 text-white';
            case 'error':
                return 'bg-red-500 text-white';
            case 'warning':
                return 'bg-yellow-500 text-black';
            case 'info':
                return 'bg-blue-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'success':
              return '✓';
            case 'error':
              return '✕';
            case 'warning':
              return '⚠';
            case 'info':
              return 'ℹ';
            default:
              return '';
          }
    }
    return (
     <div className="fixed top-4 right-4 z-50 animate-slide-in">
        <div className={`${getToastStyles()} px-6 py-4 rounded-lg shadow-lg flex items-center
        gap-3 min-w[300px]`}>
            <span className="text-lg font-bold">{getIcon()}</span>
            <span className="flex-1">{message}</span>
            <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-xl font-bold">

            </button>
        </div>
     </div>
    )

}