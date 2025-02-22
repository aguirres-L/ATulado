import React, { useState, useEffect } from "react";
import { useUser } from "../../../context/UserContext";
import {
  getDocumentFirebaseId,
  getDocumentsFirebase,
/*   updateDocumentFirebase, */
} from "../../../services/data-firebase.js";
import CalendarProfesional from "./CalendarProfesional.jsx";
import ModalInfoUser from "./ModalInfoUser.jsx";
import SubscriptionComponent from "../../Subscription/SubscriptionComponent.jsx";
import SvgRefresh from "../../../assets/imagen/svg/SvgRefresh.jsx";
import logoBussine from "../../../assets/log-ATulado.jpg"

const ProfessionalUI = () => {
  const { user, setUser } = useUser();

  const [statusColor, setStatusColor] = useState("bg-gray-400");
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  // Función para obtener los datos del usuario y los datos filtrados
  const fetchData = async () => {
    try {
      // Obtener los datos relacionados al usuario desde Firebase
      const updatedUser = await getDocumentFirebaseId("nana", user.idFirestore);

      // Actualizar el estado del usuario en el contexto
      setUser(updatedUser);

      // Actualizar el color basado en el estado del usuario
      setStatusColor(updatedUser.state ? "bg-green-500" : "bg-gray-400");

      console.log(updatedUser, "Usuario actualizado desde Firebase");

      // Obtener datos relacionados al usuario (filteredData)
      const dataService = await getDocumentsFirebase("match");
      const filterDataWithIdFirestore = dataService.filter(
        (item) => item.idNana === user.idFirestore
      );

      // Actualizar los datos filtrados
      setFilteredData(filterDataWithIdFirestore);
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Llamar a fetchData cuando se monta el componente
  // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  // Función para alternar el estado del usuario
/*   const toggleState = async () => {
    const newState = !user.state; // Cambiar el estado actual
    const newColor = newState ? "bg-green-500" : "bg-gray-400";

    try {
      // Actualizar el estado en Firebase
      await updateDocumentFirebase("nana", user.idFirestore, {
        state: newState,
      });

      // Reflejar el cambio en la UI
      setUser((prevUser) => ({ ...prevUser, state: newState }));
      setStatusColor(newColor); // Actualizar el color del avatar

      console.log("Estado actualizado correctamente en Firebase.");
    } catch (error) {
      console.error("Error al actualizar el estado en Firebase:", error);
    }
  }; */

  const handleOpenModal = (data) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedData(null);
  };
  
/*   console.log(user,'from nana'); */
  

  return (
    <section className="bg-gray-100 min-h-screen py-8 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src={user.urlAvatar?user.urlAvatar:logoBussine}
              alt="Avatar Cliente"
          className="w-20 h-20 rounded-full cursor-pointer"
            />
         
            <span
              className={`absolute bottom-0 right-0 w-6 h-6 ${statusColor} border-2 border-white rounded-full shadow`}
            ></span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {user?.name || "Nombre Profesional"}
            </h2>
            <p className="text-gray-600">Dirección</p>
            <p className="text-gray-600">{user?.address || "Sin dirección"}</p>
          </div>
      
        </div>

        <div className="mt-6 flex flex-row w-full justify-around ">
            <button
              onClick={fetchData} // Llamar a fetchData al hacer clic
              className="bg-[#e896ef] text-white px-4  rounded-md ml-4 hover:bg-[#eec7e9]"
            >
             {/*  Refrescar Datos */}
             <SvgRefresh fetchData={fetchData}/>
            </button>
                 {/* Cambia 'parent' a 'nanny' según el tipo de usuario */}
      <SubscriptionComponent userType="nanny" />
          </div>

   {/* Listado de servicios */}
<div className="mt-8">
  <h3 className="text-xl font-bold text-gray-700 mb-4">Servicios</h3>
  {filteredData.length > 0 ? (
    <ul className="space-y-4">
      {filteredData.map((item, index) => {
        // Obtener el horario (schedule) del primer servicio
        const schedule = item.mother?.services?.[0]?.schedule || "mañana";

        // Definir colores para cada horario
        const scheduleColors = {
          mañana: "bg-yellow-200",
          tarde: "bg-blue-200",
          noche: "bg-purple-200",
        };

        // Asignar el color basado en el horario
        const cardColor = scheduleColors[schedule];

        return (
          <li
            key={index}
            className={`p-4 rounded-lg shadow-md cursor-pointer hover:bg-opacity-90 ${cardColor}`}
            onClick={() => handleOpenModal(item)} // Abre el modal con el dato seleccionado
          >
            <p className="text-lg font-semibold">Padres: {item.mother?.name}</p>
            <p>Dirección: {item.mother?.address}</p>
            <p>Email: {item.mother?.email}</p>
          </li>
        );
      })}
    </ul>
  ) : (
    <p className="text-gray-600">No se encontraron datos.</p>
  )}
</div>


        {/* Componente del calendario */}
        <CalendarProfesional filteredData={filteredData} />

        {/* Modal */}

        {isModalOpen && selectedData && (
        <ModalInfoUser selectedData={selectedData} handleCloseModal={handleCloseModal} />
        )}

      </div>
    </section>
  );
};

export default ProfessionalUI;
