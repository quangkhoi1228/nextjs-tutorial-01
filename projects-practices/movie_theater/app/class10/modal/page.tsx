"use client";
import { ModalProvider, useModal } from "../hooks/ModalContext";

export function DemoButton() {
  const { showModal, hideModal } = useModal();
  return (
    <button
      onClick={() =>
        showModal(
          <div>
            <h2 className="text-lg font-bold mb-2">Hello Modal!</h2>
            <p className="mb-4">Đây là nội dung modal có thể đặt ở bất kỳ đâu trong app.</p>
            <button
              onClick={hideModal}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Đóng
            </button>
          </div>
        )
      }
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Mở Modal
    </button>
  );
}

export default function ModalDemoPage() {
  return (
    <ModalProvider>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Demo Global Modal với Context + Portal</h1>
        <DemoButton />
     
      </div>
    </ModalProvider>
  );
} 