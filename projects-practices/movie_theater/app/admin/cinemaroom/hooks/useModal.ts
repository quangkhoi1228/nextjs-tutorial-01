import { useState } from "react";
type ModalMode = "create" | "edit" | "detail";
export function useModal(defaultMode: ModalMode = "create") {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ModalMode>(defaultMode);
  const open = (newMode?: ModalMode) => {
    setIsOpen(true);
    if (newMode) setMode(newMode);
  };
  const close = () => setIsOpen(false);
  return { isOpen, open, close, mode, setMode };
} 