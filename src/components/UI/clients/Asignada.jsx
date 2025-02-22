import { useEffect, useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, getDocumentsFirebase } from "../../../services/data-firebase";
import RequestNannyModal from "./RequestNannyModal";

export default function Asignada({ user,handleRefresh ,buttonRefresh }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    state: false,
  });

const [isMatch, setIsMatch] = useState(false);
const [notification, setNotification] = useState(null);

useEffect(()=>{

async function getMatch() {
  try {
    const data = await getDocumentsFirebase('match');
    // Filtrar los datos para encontrar los que coincidan
    const filteredData = data.filter(
      (item) => item.mother.idFirestore === user.idFirestore
    );
/*     console.log(filteredData, 'Datos filtrados'); */
    setIsMatch(filteredData)
  } catch (error) {
    console.log()
  }
}
getMatch()
// eslint-disable-next-line react-hooks/exhaustive-deps

},[buttonRefresh,user.idFirestore])

  const collectionName = "madre";

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000); // Ocultar notificación después de 3 segundos
  };

/*   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }; */

  const handleSubmit = async (finalData) => {
    try {
      const docRef = doc(db, collectionName, user.idFirestore);
      // Usar arrayUnion para agregar el nuevo servicio al array
      await updateDoc(docRef, {
        services: arrayUnion(finalData),
      });
      console.log("Solicitud enviada:", finalData);
      setIsModalOpen(false);
      handleRefresh()
 /*      alert("Solicitud enviada con éxito");
    } catch (error) {
      console.error("Error al actualizar el documento:", error);
      alert("Hubo un error al enviar la solicitud"); */
      showNotification("Solicitud enviada con éxito", "success");
    } catch (error) {
      console.error("Error al actualizar el documento:", error);
      showNotification("Hubo un error al enviar la solicitud", "error");
    }
  };

if(isMatch)   console.log(isMatch, "isMatcha");

  return (
    <div className="mt-8">
    
    {notification && (
        <div
          className={`fixed top-4 right-4 p-4 rounded shadow-lg ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : notification.type === "error"
              ? "bg-red-500 text-white"
              : "bg-blue-500 text-white"
          }`}
        >
          {notification.message}
        </div>
      )}
    
      <h3 className="text-xl font-bold text-gray-700 mb-4" >{isMatch[0]?.nanny?'Niñera Asignada':'Niñera en Espera'}</h3>
      {user.services.length > 0 ? (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    {isMatch[0]?.nanny && (
      <>
      
      {console.log(isMatch,'isMatch[0]?.nanny')
      }
        <p className="text-gray-800 font-medium text-lg">
          <span className="font-bold">Nombre:</span> {isMatch[0]?.nanny.name}
        </p>
        <p className="text-gray-800 font-medium">
          <span className="font-bold">Teléfono:</span> {isMatch[0]?.nanny.phone}
        </p>
        <p className="text-gray-800 font-medium">
          <span className="font-bold">Direc:</span> {isMatch[0]?.nanny.address}
        </p>
        <div className="mt-4 flex gap-4">
          {/* Botón para enviar mensaje por WhatsApp */}
          <button
            onClick={() => {
              const nannyName = isMatch[0]?.nanny.name;
              const nannyPhone = isMatch[0]?.nanny.phone;
              const message = `Hola ${nannyName}, me comunico para coordinar el servicio.`;
              const whatsappURL = `https://wa.me/${nannyPhone}?text=${encodeURIComponent(
                message
              )}`;
              window.open(whatsappURL, "_blank");
            }}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            WhatsApp
          </button>
        </div>
      </>
    )}
  </div>
) 
:/* Aca se oculta o muestra el button para poder solicitar un servicios */

<div className=" p-6 rounded-lg text-center">
   {/*  <p className="text-red-500 font-medium mb-4">
      Todavía no se ha asignado una niñera para este servicio.
    </p> */}
    <button
      onClick={() => setIsModalOpen(true)}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Solicitar Niñera
    </button>
  </div>
}









      {/* Modal solictar niñera o at */}
      {isModalOpen && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h3 className="text-lg font-bold text-gray-700 mb-4">
        Solicitar Niñera
      </h3>
      <form className="space-y-4">
        {/* Selección del Plan */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Selecciona un Plan:
          </label>
          <div className="flex space-x-4">
            <button
              type="button"
              className={`px-4 py-2 border rounded-lg ${
                formData.plan === "básico"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setFormData({ ...formData, plan: "básico" })}
            >
              Básico
            </button>
            <button
              type="button"
              className={`px-4 py-2 border rounded-lg ${
                formData.plan === "intermedio"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setFormData({ ...formData, plan: "intermedio" })}
            >
              Intermedio
            </button>
            <button
              type="button"
              className={`px-4 py-2 border rounded-lg ${
                formData.plan === "premium"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setFormData({ ...formData, plan: "premium" })}
            >
              Premium
            </button>
          </div>
        </div>

        {/* Selección del Rango de Horario */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Selecciona el Rango de Horario:
          </label>
          <div className="flex space-x-4">
            <button
              type="button"
              className={`px-4 py-2 border rounded-lg ${
                formData.schedule === "mañana"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setFormData({ ...formData, schedule: "mañana" })}
            >
              Mañana
            </button>
            <button
              type="button"
              className={`px-4 py-2 border rounded-lg ${
                formData.schedule === "tarde"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setFormData({ ...formData, schedule: "tarde" })}
            >
              Tarde
            </button>
            <button
              type="button"
              className={`px-4 py-2 border rounded-lg ${
                formData.schedule === "noche"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setFormData({ ...formData, schedule: "noche" })}
            >
              Noche
            </button>
          </div>
        </div>
        
        {/* Selección de los Días de la Semana */}
<div>
  <label className="block text-gray-700 font-medium mb-2">
    Selecciona los Días de la Semana:
  </label>
  <div className="flex space-x-2 flex-wrap">
    {["L", "M", "MI", "J", "V", "S", "D"].map((day) => (
      <button
        key={day}
        type="button"
        className={`px-3 py-2 border rounded-lg ${
          formData.days?.includes(day)
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
        onClick={() => {
          // Añadir o eliminar el día seleccionado del estado formData
          const updatedDays = formData.days?.includes(day)
            ? formData.days.filter((d) => d !== day)
            : [...(formData.days || []), day];
          setFormData({ ...formData, days: updatedDays });
        }}
      >
        {day}
      </button>
    ))}
  </div>
</div>


        {/* Botones de Acción */}
        <RequestNannyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
      </form>
    </div>
  </div>
  

  
)}

    </div>
  );
}
