import { useToastContext } from "./ToastContext";

export function useToast() {
  const { dispatch } = useToastContext();
  return (message: string, type?: "success" | "error" | "info") => {
    dispatch({
      type: "ADD_TOAST",
      toast: { id: Date.now().toString(), message, type },
    });
  };
} 