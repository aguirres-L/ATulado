import { useState } from "react";
import { useUser } from "../../../context/UserContext";
import { updateDocumentFirebase } from "../../../services/data-firebase";

export default function ModalFeedBack({ setserviceSelect, setShowModalFeedBack }) {
  const { user, setUser } = useUser(); // Accede a los datos del usuario desde el contexto

  // Inicializa formData con los datos del usuario y asegúrate de que `chats` esté definido
  const [formData, setFormData] = useState({
    ...user,
    services: {
      ...user.services,
      chats: user.services?.chats || [], // Inicializa `chats` como un array vacío si no existe
    },
  });

  // Estado para los mensajes del chat
  const [messages, setMessages] = useState(formData.services.chats || []);
  const [newMessage, setNewMessage] = useState("");

  // Función para enviar un mensaje
  const sendMessage = async () => {
    if (newMessage.trim() === "") return; // Evita enviar mensajes vacíos

    try {
      // Crear un nuevo mensaje
      const message = { text: newMessage, sender: "padre" };

      // Actualizar el estado `messages`
      setMessages((prevMessages) => [...prevMessages, message]);

      // Actualizar el estado `formData` para agregar el mensaje a `formData.services.chats[]`
      setFormData((prevFormData) => ({
        ...prevFormData,
        services: {
          chats: [...prevFormData.services.chats, message],
        },
      }));

      // Limpiar el input después de enviar el mensaje
      setNewMessage("");
     await handleSave()
    } catch (error) {
      console.log(error);
    }
  };

  // Función para guardar los cambios en Firebase
  const handleSave = async () => {
    try {
      // Actualiza los datos en Firebase
      await updateDocumentFirebase("madre", user.idFirestore, formData);

      // Actualiza el contexto del usuario con los nuevos datos
      setUser(formData);

      // Cierra el modal
      setShowModalFeedBack(null);

      alert("Información actualizada correctamente");
    } catch (error) {
      console.error("Error al actualizar la información:", error);
      alert("Hubo un error al guardar los cambios.");
    }
  };

  // Función para cerrar el modal y guardar los cambios
  const closeModalFeedBack = async () => {
    setShowModalFeedBack(null); // Cierra el modal
  };

console.log(setserviceSelect,'setserviceSelect');


  return (
    <div className="fixed bottom-4 bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
      {/* Encabezado del chat */}
      <div className="flex justify-between items-center p-4 bg-pink-500 text-white">
        <h2 className="text-lg font-semibold">Deja tu comentario sobre la niñera</h2>
        <button
          onClick={closeModalFeedBack}
          className="p-2 rounded-full hover:bg-pink-600 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Cuerpo del chat */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {/* Mensajes del chat */}
          {messages.map((msg, index) => (
            <div key={index} className="flex justify-start">
              <div className="bg-gray-200 p-3 rounded-lg max-w-xs">
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input para enviar mensajes */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="ml-2 p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors duration-200"
            onClick={sendMessage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}