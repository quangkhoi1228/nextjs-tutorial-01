import React, { useEffect } from "react";
import { useToastContext } from "../hooks/ToastContext";

export default function ToastContainer() {
  const { state, dispatch } = useToastContext();

  useEffect(() => {
    if (state.toasts.length === 0) return;
    const timer = setTimeout(() => {
      dispatch({ type: "REMOVE_TOAST", id: state.toasts[0].id });
    }, 3000);
    return () => clearTimeout(timer);
  }, [state.toasts, dispatch]);

  return (
    <div className="toast-container">
      {state.toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type || "info"}`}>
          {toast.message}
        </div>
      ))}
      <style jsx>{`
        .toast-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 9999;
        }
        .toast {
          margin-bottom: 10px;
          padding: 12px 24px;
          border-radius: 6px;
          color: #fff;
          background: #333;
          opacity: 0.95;
          animation: fadeIn 0.3s;
          transition: all 0.3s;
        }
        .toast-success { background: #22c55e; }
        .toast-error { background: #ef4444; }
        .toast-info { background: #3b82f6; }
        @keyframes fadeIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 0.95; }
        }
      `}</style>
    </div>
  );
} 