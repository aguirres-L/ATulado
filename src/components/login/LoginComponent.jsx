import React, { useContext, useState } from "react";
import { UserTypeContext } from "../../context/UserTypeContext";
import ProfessionalUI from "../UI/profesional/ProfessionalUI";
import ClientUI from "../UI/clients/ClientUI";
import { verifyUserCredentials } from "../../services/data-firebase";
import { useUser } from "../../context/UserContext";
import logo from "../../assets/imagen/logo-niñeras-ya.JPG"
import SvgIcon from "./SvgIcon";
const LoginComponent = () => {
  const { setUserType, setSeeNavbar } = useContext(UserTypeContext);
  const { login } = useUser(); // Accede a la función login del contexto
  
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(""); // Puede ser "Profesional" o "Clients"
  const [userType1, setUserTypeLocal] = useState(""); // "Niñera" o "Madre"
  let logoBussines = logo;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTypeChange = (type) => {
    setUserTypeLocal(type); // Cambia dinámicamente el tipo de usuario
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSeeNavbar(null);
  
    const { email, phone } = formData;
  
    // Validaciones básicas
    if (!userType1) {
      setError("Por favor selecciona un tipo de usuario.");
      return;
    }
  
    if (!email || !phone) {
      setError("Todos los campos son obligatorios.");
      return;
    }
  
    setError("");
  
    try {
      // Determinar la colección según el tipo de usuario
      const collectionName = userType1 === "Niñera" ? "nana" : "madre";
  
      // Verificar credenciales en Firebase
      const userData = await verifyUserCredentials(collectionName, email, phone);
  
      if (userData) {
        // Usuario encontrado, autenticación exitosa
        setIsAuthenticated(true);
        setUserRole(userType1 === "Niñera" ? "professional" : "client");
  
        console.log("Usuario autenticado:", userData);
        login(userData);
      } else {
        // Usuario no encontrado
        setError("Credenciales incorrectas o usuario no registrado.");
      }
    } catch (error) {
      setError("Hubo un error al verificar las credenciales.");
      console.error(error);
    }
  };
  

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole("");
    setUserTypeLocal(""); // Resetea el tipo de usuario
    setSeeNavbar(true); // Restaura la visibilidad del navbar
  };


// Funcion mensaje wpp 

function sendMessageToWhatsApp(phoneNumber, message) {
  if (window.confirm("Comunicarte con Niñeras YA?")) {
  /*   window.open("exit.html", "Thanks for Visiting!"); */
  }else{return}
  // Formatea el mensaje para la URL
  const formattedMessage = encodeURIComponent(message);
  
  // Construye la URL de WhatsApp
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${formattedMessage}`;
  
  // Abre WhatsApp en una nueva pestaña
  window.open(whatsappURL, "_blank");
}


  if (isAuthenticated) {
/*     const handleRefresh = () => {
      // Aquí puedes llamar a una función que vuelva a cargar los datos del usuario
      console.log("Recargando datos del usuario...");
      // Por ejemplo, podrías volver a llamar a la función de Firebase o al contexto para obtener datos actualizados.
    }; */
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl bg-white shadow-lg mx-auto px-4  flex justify-between items-center">
          {/*  <h1 className="text-2xl font-bold text-blue-600">
            Bienvenido a Match-a, {userRole === "professional" ? "Profesional" : "Cliente"}
          </h1> */}
          <img
              onClick={() =>
                sendMessageToWhatsApp("3517426746", "¡Hola! Este es un mensaje automático.")
              }
            className="md:h-28 h-24 w-24 md:w-28 rounded-full  p-1 "
            src={logoBussines}
            alt="Niñeras Ya"
          />
          <div className="flex items-center space-x-4">
            {/*     <button
              onClick={handleRefresh}
              className="text-blue-500 hover:text-blue-700 transition-all"
            >
              🔄 Recargar
            </button> */}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all"
            >
             <SvgIcon/>
            </button>
              
          </div>
        </div>

        {userRole === "professional" && <ProfessionalUI />}
        {userRole === "client" && <ClientUI />}
      </div>
    );
  }

  return (
    <section className="mt-[15%] md:mt-[1%] flex items-center justify-center">
      <div className="w-full max-w-md bg-gradient-to-b from-[#f1b6e8] to-[#fde1f9] bg-white p-8 rounded-lg shadow-xl">
     {/*    <h2 className="text-3xl font-bold text-blue-600 text-center mb-6"> */}
     <h2 className="text-3xl font-bold text-white text-center mb-6">
     
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-red-500 text-sm font-medium text-center mb-4">
              {error}
            </div>
          )}

          {/* Selector de Tipo de Usuario */}
          <div>
         {/*    <label className="block text-gray-700 font-medium mb-4 text-center"> */}
         <label className="block text-white font-medium mb-4 text-center">
              Tipo de Usuario
            </label>
            <div className="flex justify-center space-x-6">
              <button
                type="button"
                onClick={() => handleTypeChange("Niñera")}
                className={`p-4 rounded-lg text-white font-medium transition-all duration-300 shadow-lg 
                  ${
                    userType1 === "Niñera"
                      ? "bg-blue-600 scale-110"
                      : "bg-gray-600 opacity-50 hover:opacity-100 hover:scale-105"
                  }`}
              >
                AT
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange("Madre")}
                className={`p-4 rounded-lg text-white font-medium transition-all duration-300 shadow-xl
                  ${
                    userType1 === "Madre"
                      ? "bg-green-600 scale-110 "
                      : "bg-gray-600 opacity-50 hover:opacity-100 hover:scale-105"
                  }`}
              >
                Familia
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="ejemplo@correo.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-2"
            >
              Número Telefónico
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="1234567890"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#f07fdf] text-white py-3 rounded-lg shadow-md hover:bg-[#db41c2] transition-all duration-300"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            ¿No tienes cuenta?{" "}
            <a
              href="#register"
              className="text-blue-500 font-medium hover:underline"
              onClick={() => setUserType("")}
            >
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginComponent;
