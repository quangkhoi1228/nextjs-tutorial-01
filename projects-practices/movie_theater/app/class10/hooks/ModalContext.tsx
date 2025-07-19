import React, { createContext, useContext, useState, ReactNode } from "react";
import ReactDOM from "react-dom";

// Kiểu context
export type ModalContextType = {
  showModal: (content: ReactNode) => void;
  hideModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}

function ModalRoot({ children }: { children: ReactNode }) {
  if (!children) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 min-w-[300px] shadow-lg relative">
        {children}
      </div>
    </div>,
    typeof window !== "undefined" ? document.body : ({} as any)
  );
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const showModal = (content: ReactNode) => setModalContent(content);
  const hideModal = () => setModalContent(null);

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <ModalRoot>{modalContent}</ModalRoot>
    </ModalContext.Provider>
  );
} 


// // App.js
// import React, { useState } from "react";
// import Parent from "./Parent";

// export default function App() {
//   const [modalContent, setModalContent] = useState(null);

//   const showModal = (content) => setModalContent(content);
//   const hideModal = () => setModalContent(null);

//   return (
//     <div>
//       <Parent showModal={showModal} hideModal={hideModal} />
//       {modalContent && (
//         <div className="modal">
//           {modalContent}
//           <button onClick={hideModal}>Đóng</button>
//         </div>
//       )}
//     </div>
//   );
// }

// // Parent.js
// import Child from "./Child";
// export default function Parent({ showModal, hideModal }) {
//   return <Child showModal={showModal} hideModal={hideModal} />;
// }

// // Child.js
// import DeepChild from "./DeepChild";
// export default function Child({ showModal, hideModal }) {
//   return <DeepChild showModal={showModal} hideModal={hideModal} />;
// }

// // DeepChild.js
// export default function DeepChild({ showModal, hideModal }) {
//   return (
//     <button
//       onClick={() =>
//         showModal(
//           <div>
//             <h2>Modal từ component lồng sâu</h2>
//             <button onClick={hideModal}>Đóng</button>
//           </div>
//         )
//       }
//     >
//       Mở modal
//     </button>
//   );
// }