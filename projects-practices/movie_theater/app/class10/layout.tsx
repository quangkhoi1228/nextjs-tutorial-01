"use client";
import { ThemeProvider } from "./hooks/ThemeContext";
import { ModalProvider } from "./hooks/ModalContext";
import { ToastProvider } from "./hooks/ToastContext";
import { AppProvider } from "./hooks/AppContext";

export default function Class10Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <ThemeProvider>
        <ModalProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ModalProvider>
      </ThemeProvider>
    </AppProvider>
  );
} 