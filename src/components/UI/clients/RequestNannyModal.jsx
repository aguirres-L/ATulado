import React, { useState } from "react";
import InputChildrenCount from "./components/InputChildreCount";
import BarrioSelector from "../../forms/BarrioSelector";
import { useUser } from "../../../context/UserContext";

// Simulamos ATs destacadas
// Ejemplo de datos simulados de niñeras destacadas
const FEATURED_NANNIES = [
    {
      idFirestore: "DBmUT4PBHNaWWOPxAYc3",
      name: "Alicia Luna",
      address: "Sucre 1468",
      neighborhood: "Cofico",
      phone: "3517337491",
      email: "a@a.com",
      cv: "https://firebasestorage.googleapis.com/v0/b/procure-easy.appspot.com/o/cvs%2Fcv-ej.pdf?alt=media&token=e85f7cc0-af17-4d53-a72b-b28473db2f83",
      ageRange: "5-10 años",
      availability: "Full-time",
      createdAt: "2 de enero de 2025, 1:15:01 p.m. UTC-3",
    },
    {
      idFirestore: "ABcdE4Pxyz7FFGHIjk23",
      name: "María José",
      address: "Av. Colón 2020",
      neighborhood: "Nueva Córdoba",
      phone: "3517123456",
      email: "maria@example.com",
      cv: "https://firebasestorage.googleapis.com/v0/b/procure-easy.appspot.com/o/cvs%2Fcv-ej.pdf?alt=media&token=e85f7cc0-af17-4d53-a72b-b28473db2f83",
      ageRange: "3-8 años",
      availability: "Part-time",
      createdAt: "10 de febrero de 2025, 3:20:10 p.m. UTC-3",
    },
    {
      idFirestore: "XYZuT4P97NaWW123xTest",
      name: "Carla Fernández",
      address: "Belgrano 700",
      neighborhood: "General Paz",
      phone: "3517009876",
      email: "carla@example.com",
      cv: "https://firebasestorage.googleapis.com/v0/b/procure-easy.appspot.com/o/cvs%2Fcv-ej.pdf?alt=media&token=e85f7cc0-af17-4d53-a72b-b28473db2f83",
      ageRange: "6-12 años",
      availability: "Full-time",
      createdAt: "15 de marzo de 2025, 9:45:00 a.m. UTC-3",
    },
  ];
  


const DAYS_OPTIONS = ["L", "M", "MI", "J", "V", "S", "D"];
/* const PLAN_OPTIONS = ["Niñera", "Niñera c/t domestica", "Niñera pedagógica", "Empleada domestica"]; */
const PLAN_OPTIONS = ["AT"];
const SCHEDULE_OPTIONS = ["mañana", "tarde", "noche"];
const SCHEDULE_HORA = ["AT por hora", "AT mensual"];
const TIPO_PAGO = ["Blanco", "Monotributista"];

export default function RequestNannyModal({
  isOpen ,
  onClose = () => {},
  onSubmit = () => {},
}) {


  const { user } = useUser(); // Accede a los datos del usuario desde el contexto

  // Controla qué vista se muestra: 1 = Formulario, 2 = Sugerencias
  const [step, setStep] = useState(1);

  // Manejo del formulario en el Paso 1
  const [formData, setFormData] = useState({
    plan: "",
    schedule: "",
    days: [],
    childer:[],
    barrioZona:[],
    chats:[],
    contratacion:"",
    typePago:"",
    propuestaEconomica:"",
    
  });

  // Manejo de la niñera seleccionada en el Paso 2
  const [selectedNanny, setSelectedNanny] = useState(null);

  // Manejar la selección del plan
  const handlePlanSelection = (plan) => {
    setFormData((prev) => ({ ...prev, plan }));
  };

  // Manejar la selección del rango de horario
  const handleScheduleSelection = (schedule) => {
    setFormData((prev) => ({ ...prev, schedule }));
  };
  
    // Manejar la selección hijos
    const handleChildren = (childer) => {
      setFormData((prev) => ({ ...prev, childer }));
    };
  
  // Manejar la selección del rango de handleContratacion
  const handleContratacion = (contratacion) => {
    setFormData((prev) => ({ ...prev, contratacion }));
  };

  // Manejar la selección del rango de handleContratacion
  const handleTypePago = (typePago) => {
    setFormData((prev) => ({ ...prev, typePago }));
  };




 const changePropuesta =  (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value, // Actualiza el valor correspondiente
  }));
};


  // Manejar la selección de días
  const handleDayToggle = (day) => {
    setFormData((prev) => {
      const { days } = prev;
      // Si el día ya está seleccionado, lo removemos; si no, lo agregamos
      const updatedDays = days.includes(day)
        ? days.filter((d) => d !== day)
        : [...days, day];
      return { ...prev, days: updatedDays };
    });
  };


  const handleZone=(e)=>{
    /*   console.log(e); */
      
        setFormData({ ...formData, barrioZona: e })
      }



  // Validar datos y pasar a la siguiente pantalla
  const goToSuggestions = () => {
    // Validación simple: todos los campos llenos
    if (!formData.plan || !formData.schedule || formData.days.length === 0) {
      alert("Por favor, completa todos los campos para continuar.");
      return;
    }
    setStep(2);
  };

  // Validar datos y pasar a la siguiente pantalla      ***** VAlidar los datops de los hijos "canitadad" 
  const goToSuggestions3 = () => {
    // Validación simple: todos los campos llenos
    if (!formData.plan || !formData.schedule || formData.childer.length === 0) {
      alert("Por favor, completa todos los campos para continuar.");
      return;
    }
    setStep(3);
  };

  // add Nana in formData

  const addNana=(nana)=>{
    setSelectedNanny(nana)
  }

  // Acción final al confirmar la niñera seleccionada
  const handleConfirm = async () => {
  console.log(selectedNanny,'selectedNanny');
  
  console.log(user.sub);
  if (user?.sub && !selectedNanny) {  
      alert("Por favor, selecciona una niñera de la lista.");      /* ----------------- */
      return;
    }
    // Podrías enviar formData + selectedNanny al padre
    const finalData = { ...formData, nannyId: selectedNanny };
     onSubmit(finalData);
    // Opcional: cerramos el modal
    onClose();
    // Reseteamos estados (opcional, según tu flujo)
    setStep(1);
    setFormData({     plan: "",
      schedule: "",
      days: [],
      childer:[],
      barrioZona:[],
      contratacion:"",
      typePago:"",
      propuestaEconomica:"" });
    setSelectedNanny(null);
  };

  // Permitir volver al formulario
  const handleBack = () => {
    setStep(1);
  };
    // Permitir volver al formulario
 /*    const handleBack2 = () => {
      setStep(2);
    };
 */
  // Si no está abierto, retornamos null para no renderizar nada
  if (!isOpen) return null;
console.log(user.sub,'user');

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div
        /* style={{border:"solid 2px red"}} */ className="bg-white p-6 rounded-lg shadow-lg w-96 h-[80%] relative overflow-scroll"
      >
        {/* Botón para cerrar modal */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Paso 1: Formulario (fade in/out) */}
        <div
          className={`transition-all duration-500 ${
            step === 1 ? "opacity-100 block" : "opacity-0 hidden"
          }`}
        >
          <h3 className="text-lg font-bold text-gray-700 mb-4">
            Solicitar AT
          </h3>
          <form className="space-y-4">
            {/* Selección del Plan */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Selecciona un Servicio:
              </label>

              <div
                /*  style={{border:"solid 2px red"}} */ className="flex flex-wrap justify-start gap-4"
              >
                {PLAN_OPTIONS.map((planOption) => (
                  <button
                    key={planOption}
                    type="button"
                    className={`px-4 py-2 border rounded-lg ${
                      formData.plan === planOption
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => handlePlanSelection(planOption)}
                  >
                    {planOption.charAt(0).toUpperCase() + planOption.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Selección del Rango de Horario */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Selecciona el Rango de Horario:
              </label>
              <div className="flex space-x-4">
                {SCHEDULE_OPTIONS.map((scheduleOption) => (
                  <button
                    key={scheduleOption}
                    type="button"
                    className={`px-4 py-2 border rounded-lg ${
                      formData.schedule === scheduleOption
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => handleScheduleSelection(scheduleOption)}
                  >
                    {scheduleOption.charAt(0).toUpperCase() +
                      scheduleOption.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            {/* Selección x HOra o Mensual */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Tipo de Contratación:
              </label>
              <div className="flex space-x-4">
                {SCHEDULE_HORA.map((tipoContratacion) => (
                  <button
                    key={tipoContratacion}
                    type="button"
                    className={`px-4 py-2 border rounded-lg ${
                      formData.contratacion === tipoContratacion
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => handleContratacion(tipoContratacion)}
                  >
                    {tipoContratacion.charAt(0).toUpperCase() +
                      tipoContratacion.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Selección de los Días de la Semana */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Selecciona los Días de la Semana:
              </label>
              <div className="flex w-72 space-x-1 flex-wrap">
                {DAYS_OPTIONS.map((day) => (
                  <button
                    key={day}
                    type="button"
                    className={`px-3 py-2 border rounded-lg ${
                      formData.days.includes(day)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => handleDayToggle(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Selección de los Días de la Semana */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                ¿En que zona prefieres que resida la AT?
              </label>
              <BarrioSelector handleZone={handleZone} />
            </div>

            {/* Selección de CONTRATACIÓN */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Selecciona forma de Contrato:
              </label>
              <div className="flex space-x-2 flex-wrap">
                {TIPO_PAGO.map((typePago) => (
                  <button
                    key={typePago}
                    type="button"
                    className={`px-4 py-2 border rounded-lg ${
                      formData.typePago === typePago
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => handleTypePago(typePago)}
                  >
                    {typePago.charAt(0).toUpperCase() + typePago.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Escriba la propuesta económica */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Escriba la propuesta económica:
              </label>
              <div className="flex space-x-2 flex-wrap">
                <input
                  type="text"
                  name="propuestaEconomica"
                  value={formData.propuestaEconomica}
                  placeholder="$00.00"
                  onChange={changePropuesta}
                  className="p-4 bg-gray-100 rounded shadow-md "
                />
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={goToSuggestions}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Siguiente
              </button>
            </div>
          </form>
        </div>

        {/* Paso 2: Formulario (fade in/out) */}
        <div
          className={`transition-all h-90  duration-500 ${
            step === 2 ? "opacity-100 block" : "opacity-0 hidden"
          }`}
        >
          <h3 className="text-lg font-bold text-gray-700 mb-4">
          Información del acompañado
          </h3>
          <form className="space-y-4">
            {/* Selección del Plan */}

            <InputChildrenCount handleChildren={handleChildren} />

            {/* Selección del Rango de Horario */}
            {/*   <div>
              <label className="block text-gray-700 font-medium mb-2">
                Selecciona el Rango de Horario:
              </label>
              <div className="flex space-x-4">
                {SCHEDULE_OPTIONS.map((scheduleOption) => (
                  <button
                    key={scheduleOption}
                    type="button"
                    className={`px-4 py-2 border rounded-lg ${
                      formData.schedule === scheduleOption
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => handleScheduleSelection(scheduleOption)}
                  >
                    {scheduleOption.charAt(0).toUpperCase() +
                      scheduleOption.slice(1)}
                  </button>
                ))}
              </div>
            </div> */}

            {/* Selección de los Días de la Semana */}
            {/*   <div>
              <label className="block text-gray-700 font-medium mb-2">
                Selecciona los Días de la Semana:
              </label>
              <div className="flex space-x-2 flex-wrap">
                {DAYS_OPTIONS.map((day) => (
                  <button
                    key={day}
                    type="button"
                    className={`px-3 py-2 border rounded-lg ${
                      formData.days.includes(day)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => handleDayToggle(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div> */}

            {/* Botones de Acción */}
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={goToSuggestions3}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Siguiente
              </button>
            </div>
          </form>
        </div>

        {/* Paso 3: ATs Sugeridas (fade in/out) */}
        <div
          className={`transition-all duration-500 ${
            step === 3 ? "opacity-100 block" : "opacity-0 hidden"
          }`}
        >
            {user.sub === true?
          <h3 className="text-lg font-bold text-gray-700 mb-4">
            ATs Recomendadas
          </h3>
          :''}
       {/*    <p className="text-sm text-gray-600 mb-4">
            Basado en tu selección, aquí algunas ATs destacadas:
          </p> */}

          {user.sub === true?   // SI el valor de sub es true me muestra todas las ATs disponibles haciendo alucion a los servicios premium 
          (<div className="space-y-4  overflow-y-auto">
            {FEATURED_NANNIES.map((nanny, index) => (
              <div
                key={index}
                className={`border p-3 rounded-lg flex flex-col hover:bg-gray-100 cursor-pointer ${
                  selectedNanny === nanny.id ? "bg-blue-50 border-blue-400" : ""
                }`}
                /*  onClick={() => setSelectedNanny(nanny.id)} */
                onClick={() => addNana(nanny)}
              >
                {console.log(nanny.cv, "nanny")}
                <h4 className="font-semibold text-gray-700">{nanny.name}</h4>
                <p className="text-gray-600 text-sm">{nanny.address}</p>
                <p className="text-gray-600 text-sm">{nanny.neighborhood}</p>
                <p className="text-gray-600 text-sm">{nanny.ageRange}</p>

                {/* Botón para mostrar el CV */}
                {nanny.cv && (
                  <a
                    href={nanny.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-blue-500 hover:underline text-sm"
                  >
                    Ver CV completo
                  </a>
                )}
              </div>
            ))}
          </div>
)
          :(<>
       <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      {/* Encabezado */}
      <div className="bg-blue-500 text-white text-center py-4">
        <h2 className="text-2xl font-semibold">Tu Solicitud</h2>
      </div>

      {/* Contenido */}
      <div className="p-6 space-y-4">
        {/* Info General */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700">📌 Información General</h3>
          <p className="text-gray-600"><strong>Plan:</strong> {formData.plan}</p>
          <p className="text-gray-600"><strong>Horario:</strong> {formData.schedule}</p>
          <p className="text-gray-600"><strong>Días:</strong> {formData.days.join(", ")}</p>
          <p className="text-gray-600"><strong>Zona:</strong> {formData.barrioZona.join(", ")}</p>
        </div>

        {/* Info del Niño */}
        {formData.childer?.map((child, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700">👶 Niño/a</h3>
            <p className="text-gray-600"><strong>Nombre:</strong> {child.name}</p>
            <p className="text-gray-600"><strong>Edad:</strong> {child.age} años</p>
            <p className="text-gray-600"><strong>Medicación:</strong> {child.takesMedication ? "Sí" : "No"}</p>
            <p className="text-gray-600"><strong>Cuidado Especial:</strong> {child.specialCare}</p>
          </div>
        ))}

        {/* Propuesta Económica */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700">💰 Propuesta Económica</h3>
          <p className="text-gray-600"><strong>Tipo de Contratación:</strong> {formData.contratacion}</p>
          <p className="text-gray-600"><strong>Monto:</strong> ${formData.propuestaEconomica}</p>
          <p className="text-gray-600"><strong>Tipo de Pago:</strong> {formData.typePago}</p>
        </div>
      </div>
    </div>
          </>) // Si el valor de user.sub es false me tiene que mostrar los datos que acabo de cargar
          }
          
          {/* Botones de Acción */}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mr-2"
            >
              Reiniciar
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
