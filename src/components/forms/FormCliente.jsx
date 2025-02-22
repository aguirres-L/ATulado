import { useContext, useState } from "react";
import {
  addDocumentFirebase,
  checkIfEmailExists,
} from "../../services/data-firebase";
import { UserTypeContext } from "../../context/UserTypeContext";
import useDepartamentos from "../../hooks/useDepartamentos";

export default function FormClientes() {
  const { setUserType } = useContext(UserTypeContext);

  const [formData, setFormData] = useState({
    name: "",
    email:"",
    dni: "",
    phone: "",
    address: "",
    neighborhood: "",
    children:0,
    services: [],
    sub:false  ,/// Usar este valor para trabajar la subscri y los beneficios
    urlAvatar:''
  });
  const matchId = "madre"; // name collection type user
  const dataCba = useDepartamentos(); // Hook para obtener los barrios
/*   const  */
const [notification, setNotification] = useState(null);  /*  Notitifafiones */



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000); // Ocultar notificación después de 3 segundos
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si el correo ya existe
    const emailExists = await checkIfEmailExists("madre", formData.email);

    if (emailExists) {
      alert("El correo ya está registrado. Por favor, usa otro correo.");

      setFormData({
        // reset solo a los datos que no se deben de repetir como email y phone
      //  email: "",
        phone: "",
      });
      return; // Salir de la función si el correo ya existe
    }

    try {
      // Preparamos los datos tal cual los tienes en el state
      const dataToSave = {
        ...formData,
        userType: "madre", // para diferenciar que este documento es de tipo "nana"
        createdAt: new Date(), // opcional, para tener una fecha de creación
      };

      // 4. Llamamos a createNana
      const newNanaId = await addDocumentFirebase(matchId, dataToSave);
      showNotification("Usuario creado con éxito", "success");/* ----------   Notificaciones de envio */
      console.log("Niñera Registrada con ID:", newNanaId);

      // (Opcional) Reiniciar formulario
      setFormData({
        name: "",
        email:"",
        dni: "",
        phone: "",
        address: "",
        neighborhood: "",
        children:0,
        services: [],
        services: [],
        sub:false,/// Usar este valor para trabajar la subscri y los beneficios
        urlAvatar:''
      });

      setTimeout(() => {
        setUserType("Login");
      }, 1500);
    } catch (error) {
      console.error("Error creando Niñera:", error);
      showNotification("Hubo un error al enviar la solicitud", "error");  /* -------------->  notificacion Error */
    }
  };

  return (
    <section className="bg-gray-50 py-8 px-6">
    
    {/* Notificaciones */}
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
      
      
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-green-500 mb-6">
          Registro para Familia
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Nombre Completo
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-green-500"
              required
            />
          </div>
       
        {/* Email */}
        <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email 
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-green-500"
              required
            />
          </div>
        {/* DNI */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              DNI <p className="text-sm">(para generar factura)</p>
            </label>
            <input
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-green-500"
              required
            />
          </div>
        {/* Teléfono */}
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Teléfono
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-green-500"
              required
            />
          </div>
          {/* Dirección */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Dirección 
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-green-500"
              required
            />
          </div>

          {/* Barrio */}
          <div className="relative group">
            <label className="block text-gray-700 font-medium mb-2 group-hover:text-green-500 transition duration-300">
              Barrio
            </label>
            <select
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-300 ease-in-out"
              required
            >
              <option value="" className="text-gray-400">
                Seleccionar Barrio
              </option>
              {dataCba.map((barrio) => (
                <option key={barrio} value={barrio}>
                  {barrio}
                </option>
              ))}
            </select>

            {/* Decoración con efecto */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-400 to-green-600 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 ease-in-out"></div>
          </div>




          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            Registrarse como Familia
          </button>
        </form>
      </div>
    </section>
  );
}
