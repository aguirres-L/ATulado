import React, { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";
import {/*  getDocumentFirebaseId, */ getDocumentsFirebase, updateDocumentFirebase } from "../../../services/data-firebase"; // Asegúrate de tener esta función
/* import Calendar from "./Calendar"; */
import Asignada from "./Asignada";
import SubscriptionComponent from "../../Subscription/SubscriptionComponent";
import SvgRefresh from "../../../assets/imagen/svg/SvgRefresh";
import ModalSelectAvatar from "./ModalSelectAvatar.jsx"; // Importa el modal


import ModalFeedBack from "./ModalFeedback.jsx"


import logoNana from "../../../assets/imagen/logo-niñeras-ya.JPG"
const ClientUI = () => {
  const { user, setUser } = useUser(); // Accede a los datos del usuario desde el contexto
  const [isEditing, setIsEditing] = useState(false); // Controla el modo edición
  
  const [isAvatar, setIsAvatar] = useState(false); // control para modal "selecion de avatar"
  
  
  /* 
  
  
  terminar la la conexion para la foto de avatar, falta añadirlo en firebase, ya se modifico el formulario para que se añada el apartado "urlAvatar" 
  
  */
  
  
  
  const [formData, setFormData] = useState(user);

  const [seeState, setSeeState] = useState(null); // valor para el tipo de estado

  const [buttonRefresh, setButtonRefresh] = useState(false);
  const [showModalFeedBack, setShowModalFeedBack] = useState(null);
  const [setserviceSelect, setSetserviceSelect] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState(formData?formData.urlAvatar:logoNana); 

  useEffect(()=>{
    async function getUserUpdate() { 
      let nameColletionCliente = 'madre'
      try {
        let newDataUser =  await  getDocumentsFirebase(nameColletionCliente) /// Aca va el nombre de la collection del cliente madre o acompañado o paciente
       console.log(newDataUser, ' refesh dato user');
       let filterData = newDataUser.filter((item)=>item.idFirestore === user.idFirestore)
       console.log(filterData,'dato filtrado y actualizado ');
           // Actualizar el estado global del usuario con los datos filtrados
      if (filterData.length > 0) {
        setUser(filterData[0]); // Establece el primer resultado filtrado como el usuario actualizado
      }
      } catch (error) {
        console.log(error);
        throw Error
      }
      
    }
    
    getUserUpdate()
  },[buttonRefresh])

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target; 
    setFormData({ ...formData, [name]: value });
  };

  // Guardar cambios en Firebase
  const handleSave = async () => {
    try {
      await updateDocumentFirebase("madre", user.idFirestore, formData); // Actualiza los datos en Firebase
      setUser(formData);
      alert("Información actualizada correctamente");
      setIsEditing(false); // Salir del modo edición
      setSeeState(!seeState);
    } catch (error) {
      console.error("Error al actualizar la información:", error);
      alert("Hubo un error al guardar los cambios.");
    }
    
  };
  
  
  
  
    // Función para refrescar los datos del usuario
    const handleRefresh = async () => {
      try {
        // Suponiendo que tienes una función que obtiene el usuario actualizado
      /*   const updatedUser = await fetchUserFromFirebase(user.idFirestore); */
      console.log(user,'from refresh');
      
      setButtonRefresh(!buttonRefresh)
/*         alert("Datos actualizados"); */
      } catch (error) {
        console.error("Error al refrescar los datos:", error);
        alert("Hubo un error al refrescar los datos.");
      }
    };
  
  
  
  // function para poder visualizar el chat de feedBack
  const toogleFeedBack=()=>{
    setShowModalFeedBack(true)
/*     console.log(setserviceSelect,'from toogle'); */
    
  }
  
/*     console.log(setserviceSelect,'desde fuera setserviceSelect '); */
  
  // funcion para mostrar el modal de "selecion de avatar"
  const selectAvatar =()=>{
  if(isEditing) setIsAvatar(!isAvatar)
  }
  
// Manejar la selección del avatar
const handleSelectAvatar = (url) => {
  setAvatarUrl(url); // Actualiza la URL del avatar seleccionado
  setFormData({ ...formData, urlAvatar: url }); // Actualiza formData con la nueva URL del avatar
  console.log(url, 'url avatar actualizada');
};

  return (
    <section className="bg-gray-100 min-h-screen py-8 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
        <img
          onClick={selectAvatar} // Abre el modal al hacer clic en la imagen
          src={avatarUrl}
          alt="Avatar Cliente"
          className="w-20 h-20 rounded-full cursor-pointer"
        />
          <div>
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block   text-gray-800 w-5/6 border rounded px-2 py-1"
                />
              </>
            ) : (
              <h2 className="text-2xl font-bold text-gray-800">
                {user.name || "Nombre"}
              </h2>
            )}
            <p className="text-gray-600">Dirección</p>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="block text-gray-600 w-5/6 border rounded px-2 py-1"
              />
            ) : (
              <p className="text-gray-600">{user.address || "Dirección"}</p>
            )}
            <p className="text-gray-600">Teléfono</p>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="block w-5/6 text-gray-600  border rounded px-2 py-1"
              />
            ) : (
              <p className="text- gray-600">{user.phone || "Teléfono"}</p>
            )}
          </div>
        </div>

        {/* Botones para guardar o editar */}
        <div className="mt-4">
          {isEditing ? (
            <div className="flex space-x-4">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Guardar
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Editar Información
            </button>
          )}
        </div>

        <div className="mt-6 flex flex-row w-full justify-around ">

       {/*    <h3 className="text-xl font-bold text-gray-700">{}</h3> */}
          <button
            onClick={handleRefresh}
            className="bg-[#e896ef] text-white px-4  rounded-md ml-4 hover:bg-[#eec7e9]"

          >
           {/*  Refrescar */}
                        <SvgRefresh fetchData={handleRefresh}/>
           
          </button>
          
           {/* Cambia 'parent' a 'nanny' según el tipo de usuario */}
      <SubscriptionComponent userType="parent" />
          
          </div>
          
          
          
        {/* Información de la Niñera Asignada */}
        <div className="mt-8">
      <h3 className="text-xl font-bold text-gray-700 mb-4">Servicio Solicitado</h3>
      {user.services && user.services.length > 0 ? (
        <ul className="space-y-4">
          {user.services?.map((service, index) => {
  console.log(service, 'desde map cliente UI');

  return (
    <li
      key={index}
      className={`p-4 rounded shadow-sm ${
        service.state
          ? "bg-green-100 border-green-500"
          : "bg-yellow-100 border-yellow-500"
      } border-l-4 mb-4`} // Añadí mb-4 para separar los servicios
    >
      {/* Detalles de los servicios mas el chat para feedback */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* Sección de detalles del servicio */}
        <section className="w-full md:w-2/3">
          <p className="font-medium text-gray-800">
            <span className="font-bold">Barrio:</span> {service.barrioZona?.join(', ') || 'No especificado'}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Horario:</span>{" "}
            {service.schedule || 'Error en plan'}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Servicio:</span>{" "}
            {service.plan || 'Error en plan'}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Tipo de Contratación:</span>{" "}
            {service.contratacion || 'No especificado'}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Propuesta Económica:</span>{" "}
            {service.propuestaEconomica || 'No especificado'}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Tipo de Pago:</span>{" "}
            {service.typePago || 'No especificado'}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Días:</span>{" "}
            <div className="flex flex-wrap gap-2 mt-2">
              {service.days?.map((dia, index) => {
                const dayMap = {
                  L: "Lunes",
                  M: "Martes",
                  MI: "Miércoles",
                  J: "Jueves",
                  V: "Viernes",
                  S: "Sábado",
                  D: "Domingo",
                };

                return (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full shadow-sm"
                  >
                    {dayMap[dia] || dia}
                  </span>
                );
              })}
            </div>
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Niños:</span>{" "}
            <div className="flex flex-wrap gap-2 mt-2">
              {service.childer?.map((child, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full shadow-sm"
                >
                  {child.name} ({child.age} años)
                </span>
              ))}
            </div>
          </p>
          <p
            className={`font-bold mt-2 ${
              service.state ? "text-green-600" : "text-yellow-600"
            }`}
          >
            Estado: {service.state ? "Confirmado" : "En espera"}
          </p>
        </section>

        {/* Botón de feedback (solo visible en desktop) */}
        {service.state && (
          <div className="flex justify-center md:justify-end items-start w-full md:w-1/3">
            <button
              onClick={() => {
                toogleFeedBack(); // Abre el modal del chat de feedback
                setSetserviceSelect(service); // Obtiene los datos del servicio seleccionado
              }}
              className="p-2 rounded-lg bg-white transition duration-300 shadow-md hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20">
                <path fill="#f7a8d6" d="M22 2H2.01L2 22l4-4h16zm-4 12H6v-2h12zm0-3H6V9h12zm0-3H6V6h12z"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </li>
  );
})}
        </ul>
      ) : (
        <p className="text-gray-600">No hay servicios solicitados actualmente.</p>
      )}
    </div>
    
    
    {/* Modal from FeedBack */}
     {/* Modal para seleccionar el avatar */}
     <ModalSelectAvatar
        isOpen={isAvatar} // Controla si el modal está abierto o cerrado
        onClose={selectAvatar} // Cierra el modal
        onSelectAvatar={handleSelectAvatar} // Maneja la selección del avatar
      />
    {showModalFeedBack && <ModalFeedBack setserviceSelect={setserviceSelect} setShowModalFeedBack={setShowModalFeedBack}  toogleFeedBack={toogleFeedBack}  />}
    
    
        <Asignada user={user} handleRefresh={handleRefresh} buttonRefresh={buttonRefresh}  />

        {/* Calendario VER si o dejo  */}
      {/*   <Calendar service={user.services} />
 */}
      </div>
    </section>
  );
};

export default ClientUI;
