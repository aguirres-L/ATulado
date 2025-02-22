import { useState } from "react"; // Importamos useState para manejar el estado de colapso/despliegue

export default function ModalInfoUser({ selectedData, handleCloseModal }) {
  const [showChildDetails, setShowChildDetails] = useState(false); // Estado para controlar el despliegue de los detalles del niño

  console.log(selectedData.mother, "datos del cliente");

  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-lg p-6 relative max-h-[80vh] overflow-y-auto">
        {/* Botón de cierre */}
        <button
          onClick={handleCloseModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✖️
        </button>

        {/* Título del modal */}
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Detalles de Padres
        </h3>

        {/* Información del padre/madre */}
        <div className="mb-4">
          <p className="mb-2">
            <span className="font-semibold">Nombre:</span>{" "}
            {selectedData.mother?.name}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Dirección:</span>{" "}
            {selectedData.mother?.address}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Barrio:</span>{" "}
            {selectedData.mother?.neighborhood}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Teléfono:</span>{" "}
            {selectedData.mother?.phone}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Email:</span>{" "}
            {selectedData.mother?.email}
          </p>
        </div>

        {/* Detalles del servicio */}
        <div className="mb-4">
          <h4 className="text-lg font-bold text-gray-800 mb-2">
            Detalles del Servicio
          </h4>
          <p className="mb-2">
            <span className="font-semibold">Horario:</span>{" "}
            {selectedData.mother?.services[0]?.schedule}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Días:</span>{" "}
            {selectedData.mother?.services[0]?.days.map((dia, index) => (
              <span
                key={index}
                className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-2 text-sm"
              >
                {dia}
              </span>
            ))}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Tipo de Servicio:</span>{" "}
            {selectedData.mother?.services[0]?.plan}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Modalidad de Contratación:</span>{" "}
            {selectedData.mother?.services[0]?.contratacion}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Propuesta Económica:</span>{" "}
            {selectedData.mother?.services[0]?.propuestaEconomica}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Tipo de Pago:</span>{" "}
            {selectedData.mother?.services[0]?.typePago}
          </p>
        </div>

        {/* Detalles del niño (colapsable) */}
        <div className="mb-4">
          <button
            onClick={() => setShowChildDetails(!showChildDetails)}
            className="w-full text-left text-lg font-bold text-gray-800 mb-2 flex justify-between items-center"
          >
            <span>Detalles del Niño</span>
            <span>{showChildDetails ? "▲" : "▼"}</span>
          </button>

          {showChildDetails && (
            <div className="pl-4 border-l-2 border-gray-200">
              {selectedData.mother?.services[0]?.childer.map((child, index) => (
                <div key={index} className="mb-4">
                  <p className="mb-2">
                    <span className="font-semibold">Nombre del Niño:</span>{" "}
                    {child.name}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Edad:</span> {child.age}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Cuidados Especiales:</span>{" "}
                    {child.specialCare}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Toma Medicación:</span>{" "}
                    {child.takesMedication ? "Sí" : "No"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Botón de WhatsApp */}
        <div className="mt-4">
          <button
            onClick={() => {
              const motherName = selectedData.mother?.name;
              const motherPhone = selectedData.mother?.phone;
              const message = `Hola ${motherName}, me comunico en relación al servicio que estamos coordinando.`;
              const whatsappURL = `https://wa.me/${motherPhone}?text=${encodeURIComponent(
                message
              )}`;
              window.open(whatsappURL, "_blank");
            }}
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Enviar WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}