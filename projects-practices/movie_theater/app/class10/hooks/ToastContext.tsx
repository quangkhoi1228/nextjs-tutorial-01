import React, { createContext, useContext, useReducer, ReactNode } from "react";

type Toast = {
  id: string;
  message: string;
  type?: "success" | "error" | "info";
};

type State = {
  toasts: Toast[];
};

type Action =
  | { type: "ADD_TOAST"; toast: Toast }
  | { type: "REMOVE_TOAST"; id: string };

const ToastContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: { toasts: [] }, dispatch: () => {} });

 function toastReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TOAST":
      return { ...state, toasts: [...state.toasts, action.toast] };
    case "REMOVE_TOAST":
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.id) };
    default:
      return state;
  }
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] });
  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  return useContext(ToastContext);
} 