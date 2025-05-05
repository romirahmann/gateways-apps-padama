/* eslint-disable no-unused-vars */
export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0  z-50 flex items-center justify-center bg-black bg-opacity-50 ">
        {/* Modal content */}
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-6 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          {children}
        </div>
      </div>
    </>
  );
}
