import React, { useState } from "react";

const SubscriptionComponent = ({ userType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = {
    parents: [
      {
        name: "Premium Gold",
        price: "$15.000",
        features: [
          "Atención prioritaria (soporte 24/7).",
          "Acceso a niñeras Full-time o certificadas.",
          "Visibilidad de perfiles completos.",
          "Garantía extra de reemplazo inmediato.",
        ],
        color: "bg-[#E896EF] border-[#E896EF]",
        iconBg: "bg-yellow-500",
      },
    ],
    nannies: [
      {
        name: "Pro Plan",
        price: "$10.000",
        features: [
          "Mayor visibilidad en búsquedas.",
          "Múltiples cuidados simultáneamente (2-3 contrataciones).",
          "Badges o certificaciones verificadas.",
        ],
        color: "bg-[#E896EF] border-[#eec7e9]",
        iconBg: "bg-blue-500",
      },
    ],
  };

  const currentPlans = userType === "parent" ? plans.parents : plans.nannies;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setSelectedPlan(null); // Restablecer la selección al cerrar
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan); // Guarda el plan seleccionado y cambia la UI
  };

  const handleCopyAlias = () => {
    navigator.clipboard.writeText("CUIDADONIÑOS.ALIASTRANSFER");
    alert("Alias copiado al portapapeles! ✅");
  };

  return (
    <div className="relative">
      <button
        onClick={toggleModal}
        className="px-4 py-2 bg-[#e896ef] text-white font-semibold rounded-lg hover:bg-[#d87de1] transition"
      >
        Suscripción
      </button>

      {isModalOpen && (
        <div /* style={{border:"solid 2px red"}} */  className="fixed inset-0  overflow-auto bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-11/12 md:w-2/3 lg:w-1/2">
            {/* Si hay un plan seleccionado, mostramos el detalle */}
            {selectedPlan ? (
              <>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                  Detalle de la Suscripción
                </h2>
                <div className="text-center">
                 {/*  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {selectedPlan.name}
                  </h3> */}
                  <p className="text-lg text-gray-600 mb-2">
                    <strong>Precio:</strong> {selectedPlan.price}
                  </p>

                  {/* Método de pago */}
                  <div className=" p-4 rounded-lg mb-4">
                    <h4 className="text-lg font-bold text-gray-800 mb-2">
                      Método de Pago
                    </h4>
                    <p className="text-gray-600">Transferencia Bancaria</p>
                    <div className="flex items-center justify-center flex-col  px-4 py-2 rounded-lg mt-2">
                      <span className="text-gray-800 font-semibold">
                        CUIDADONIÑOS.ALIASTRANSFER
                      </span>
                      <button
                        onClick={handleCopyAlias}
                        className="ml-4 px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition"
                      >
                        Copiar Alias
                      </button>
                    </div>
                  </div>

                  {/* Instrucciones */}
                  <div className="bg-gray-100 p-4 rounded-lg text-left">
                    <h4 className="text-lg font-bold text-gray-800 mb-2">
                      Instrucciones
                    </h4>
                    <p className="text-gray-600">
                      Luego de realizar la transferencia, envíanos el comprobante de pago al siguiente número de WhatsApp:
                    </p>
                    <p className="text-gray-800 font-bold mt-2">
                      📞 3517 42-6746
                    </p>
                  </div>

                  {/* Botones */}
                  <div className="mt-6 flex justify-center gap-4">
                    <button
                      onClick={() => setSelectedPlan(null)}
                      className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                    >
                      Volver
                    </button>
                    <button
                      onClick={toggleModal}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* UI de selección de planes */
              <>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                  {userType === "parent"
                    ? "Planes para Padres"
                    : "Planes para Niñeras"}
                </h2>

                <div className="gap-6">
                  {currentPlans.map((plan, index) => (
                    <div
                      key={index}
                      className={`relative ${plan.color} border rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1 p-6 flex flex-col items-center text-center`}
                    >
                      {/* Icono */}
                      <div
                        className={`w-16 h-16 ${plan.iconBg} text-white rounded-full shadow-xl flex items-center justify-center mb-4`}
                      >
                        <span className="text-2xl font-bold">★</span>
                      </div>

                      {/* Características */}
                      <ul className="text-white space-y-2 mb-6">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2 text-green-500">✔️</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Precio y botón de selección */}
                      <p className="text-white font-bold text-lg mb-2">
                        {plan.price}
                      </p>
                      <button
                        onClick={() => handleSelectPlan(plan)}
                        className="mt-auto px-6 shadow-xl py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                      >
                        Seleccionar
                      </button>
                    </div>
                  ))}
                </div>

                {/* Botón para cerrar */}
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={toggleModal}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cerrar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionComponent;
