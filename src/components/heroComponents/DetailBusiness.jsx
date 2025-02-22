import React, { useEffect, useState } from 'react';
import { getDocumentsFirebase } from '../../services/data-firebase';

const DetailBusiness = ({ createUserClients, createUserProfesional }) => {
  const [images/* , setImages */] = useState([
    "https://institutosmas.com.ar/wp-content/uploads/2024/11/unnamed.jpg",
    "https://apredis.com.ar/wp-content/uploads/2020/08/01.jpg",
    "https://villamariaeducativa.ar/wp-content/uploads/2024/10/acompanante-terapeutico-web.jpg",
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);



  // Función para avanzar al siguiente slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Función para retroceder al slide anterior
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
      <div className="max-w-7xl mx-auto text-center">
        {/* Hero Content */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Text Section */}
          <div className="md:w-2/4 text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-8 leading-tight">
              Conecta <span className="text-blue-500">Acompañantes Terapéuticos</span> y{' '}
              <span className="text-green-500">Familias</span> de forma sencilla
            </h1>
            <p className="text-gray-700 text-lg md:text-xl mb-10 leading-relaxed">
              Encuentra al acompañante ideal para tus seres queridos o inicia como profesional y
              recibe solicitudes de cuidado. Todo en un solo lugar.
            </p>
            <p className="text-gray-700 text-lg md:text-xl mb-10 leading-relaxed">
              Desde 2018, nos dedicamos a guiar, acompañar y asesorar en la búsqueda de
              profesionales capacitados, confiables y responsables.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <a
                onClick={createUserProfesional}
                href="#register-nanny"
                className="bg-blue-500 text-white py-3 px-8 rounded-full shadow-lg hover:bg-blue-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Registrarme como AT
              </a>
              <a
                onClick={createUserClients}
                href="#register-mother"
                className="bg-green-500 text-white py-3 px-8 rounded-full shadow-lg hover:bg-green-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Registrarse como Familia
              </a>
            </div>
          </div>

          {/* Image Section - Slider */}
          <div className="md:w-1/2 mt-10 md:mt-0 relative">
            {images.length > 0 && (
              <div className="relative overflow-hidden rounded-lg shadow-2xl">
                {/* Imagen actual */}
                <img
                  src={images[currentIndex]}
                  alt={`Slide ${currentIndex + 1}`}
                  className="w-full md:h-full h-40 transition-transform duration-500 ease-in-out transform hover:scale-105"
                />

                {/* Botones de navegación */}
                <button
                  onClick={prevSlide}
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all duration-300"
                >
                  &#10094; {/* Icono de flecha izquierda */}
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all duration-300"
                >
                  &#10095; {/* Icono de flecha derecha */}
                </button>

                {/* Indicadores de paginación */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBusiness;