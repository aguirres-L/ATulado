import React from "react";

const HowItWorks = ({ createUserClients, createUserProfesional }) => {
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 animate-fade-in-up">
          Cómo funciona nuestra plataforma
        </h2>
        <p className="text-gray-600 text-lg md:text-xl mb-12 animate-fade-in-up delay-100">
          Tanto si eres un familiar buscando un acompañante terapéutico o un profesional buscando oportunidades, nuestro sistema es sencillo y eficiente.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Proceso para Acompañantes Terapéuticos */}
          <div
            className="group p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer animate-fade-in-left"
            onClick={createUserProfesional}
          >
            <h3 className="text-2xl font-bold text-blue-500 mb-6 group-hover:text-blue-600 transition-colors duration-300">
              Para Acompañantes Terapéuticos
            </h3>
            <ul className="space-y-6 text-gray-700 text-left">
              <li className="flex items-start gap-6">
                <span className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-bold group-hover:bg-blue-600 transition-all duration-300">
                  1
                </span>
                <span className="flex-1">
                  Completa el proceso de registro en la plataforma para comenzar a ofrecer tus servicios como acompañante terapéutico.
                </span>
              </li>
              <li className="flex items-start gap-6">
                <span className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-bold group-hover:bg-blue-600 transition-all duration-300">
                  2
                </span>
                <span className="flex-1">
                  Incluye tu nombre completo, experiencia y una breve descripción sobre ti, enfocada en tus habilidades y pasión por el acompañamiento terapéutico.
                </span>
              </li>
              <li className="flex items-start gap-6">
                <span className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-bold group-hover:bg-blue-600 transition-all duration-300">
                  3
                </span>
                <span className="flex-1">
                  Establece tu disponibilidad horaria y preferencias, como trabajar con adultos mayores, niños o personas con necesidades especiales.
                </span>
              </li>
            </ul>
          </div>

          {/* Proceso para Familias */}
          <div
            className="group p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer animate-fade-in-right"
            onClick={createUserClients}
          >
            <h3 className="text-2xl font-bold text-green-500 mb-6 group-hover:text-green-600 transition-colors duration-300">
              Para Familias
            </h3>
            <ul className="space-y-6 text-gray-700 text-left">
              <li className="flex items-start gap-6">
                <span className="flex-shrink-0 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center text-lg font-bold group-hover:bg-green-600 transition-all duration-300">
                  1
                </span>
                <span className="flex-1">
                  Proporciona la ubicación donde se necesitará el acompañamiento terapéutico, ya sea en tu hogar o en un centro especializado.
                </span>
              </li>
              <li className="flex items-start gap-6">
                <span className="flex-shrink-0 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center text-lg font-bold group-hover:bg-green-600 transition-all duration-300">
                  2
                </span>
                <span className="flex-1">
                  Especifica las necesidades del paciente (adulto mayor, niño, persona con discapacidad, etc.) para encontrar al profesional adecuado.
                </span>
              </li>
              <li className="flex items-start gap-6">
                <span className="flex-shrink-0 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center text-lg font-bold group-hover:bg-green-600 transition-all duration-300">
                  3
                </span>
                <span className="flex-1">
                  Define el horario y la frecuencia del acompañamiento, ya sea para días específicos o de manera continua.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;