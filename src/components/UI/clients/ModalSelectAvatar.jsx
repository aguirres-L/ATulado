import React from "react";

const ModalSelectAvatar = ({ isOpen, onClose, onSelectAvatar }) => {
  // URLs de los avatares (puedes cambiarlas por las que desees)
  const avatars = [
    "https://firebasestorage.googleapis.com/v0/b/new-api-2062c.appspot.com/o/ni%C3%B1eras-ya%2Favatar%2Fu1.jpg?alt=media&token=e43e9502-9612-467e-afa1-c099de3c07fd",
    "https://firebasestorage.googleapis.com/v0/b/new-api-2062c.appspot.com/o/ni%C3%B1eras-ya%2Favatar%2Fu2.jpg?alt=media&token=e18f452c-c464-4fe4-8617-e4c7462819d8",
    "https://firebasestorage.googleapis.com/v0/b/new-api-2062c.appspot.com/o/ni%C3%B1eras-ya%2Favatar%2Fu3.jpg?alt=media&token=120b23ac-7920-4ce9-88bc-bff68a895db2",
    "https://firebasestorage.googleapis.com/v0/b/new-api-2062c.appspot.com/o/ni%C3%B1eras-ya%2Favatar%2Fu4.jpg?alt=media&token=a5f81d0f-50b1-4756-9417-94c3329c53b6",
    "https://firebasestorage.googleapis.com/v0/b/new-api-2062c.appspot.com/o/ni%C3%B1eras-ya%2Favatar%2Fu5.jpg?alt=media&token=15243f55-38ab-460c-8454-6bfb5c881e46",
    "https://firebasestorage.googleapis.com/v0/b/new-api-2062c.appspot.com/o/ni%C3%B1eras-ya%2Favatar%2Fu6.jpg?alt=media&token=7a5d4261-89ba-48d7-a5d0-fd5ea05b07c0",
  ];

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose} // Cierra el modal al hacer clic fuera del contenido
    >
      <div
        className="bg-white rounded-lg p-6 w-11/12 max-w-md"
        onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del modal lo cierre
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Selecciona tu avatar
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {avatars.map((avatarUrl, index) => (
            <div
              key={index}
              onClick={() => {
                onSelectAvatar(avatarUrl); // Selecciona el avatar
                onClose(); // Cierra el modal después de seleccionar
              }}
              className="cursor-pointer  rounded-full p-1 hover:border-green-500 transition-all"
            >
              <img
                src={avatarUrl}
                alt={`Avatar ${index + 1}`}
                className="w-16 h-16 "
              />
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSelectAvatar;