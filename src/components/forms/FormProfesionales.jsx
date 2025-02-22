import { useContext,/* useEffect, */ useState } from "react";
import {
  addDocumentFirebase,
  checkIfEmailExists,
} from "../../services/data-firebase";
import { UserTypeContext } from "../../context/UserTypeContext";
import useDepartamentos from "../../hooks/useDepartamentos";
/* import firebase from "firebase/compat/app"; */
import { storage } from "../../services/data-firebase";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import BarrioSelector from "./BarrioSelector";
export default function FormProfesionales() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dni:"",
    phone: "",
    address: "",
    availability: "",
    mobility:"",
    children: "",
    childrenInfo: "",
    maritalStatus: "",
    crossStudies:"",
    neighborhood: "",
    barrioZona:[],
    state: "",
    service:[],
    cv: null,
    urlAvatar:''
  });

  const { setUserType } = useContext(UserTypeContext);
  const dataCba = useDepartamentos(); // Hook para obtener los barrios
  
  const [notification, setNotification] = useState(null);  /*  Notitifafiones */

  const matchId = "nana"; // Nombre de la colección en Firebase


  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value,'value')
    setFormData({ ...formData, [name]: value });
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
  setTimeout(() => setNotification(null), 4000); // Ocultar notificación después de 3 segundos
  };
  


  const handleFileChange = (e) => {
    setFormData({ ...formData, cv: e.target.files[0] });
  };

  const handleZone=(e)=>{
/*   console.log(e); */
  
    setFormData({ ...formData, barrioZona: e })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Verificar si el correo ya existe
      const emailExists = await checkIfEmailExists("nana", formData.email);

      if (emailExists) {
        alert("El correo ya está registrado. Por favor, usa otro correo.");
        setFormData({
          ...formData,
          email: "",
          phone: "",
        });
        return;
      }

      let cvUrl = null;

      // Subir CV si está presente
      if (formData.cv) {
        const storageRef = ref(storage, `cvs/${formData.cv.name}`);
        await uploadBytes(storageRef, formData.cv); // Sube el archivo
        cvUrl = await getDownloadURL(storageRef); // Obtén la URL de descarga
      }

      // Guardar datos en Firestore
      const dataToSave = {
        ...formData,
        cv: cvUrl,
        userType: "nana",
        createdAt: new Date(),
      };

    /*   const newNanaId =  */await addDocumentFirebase(matchId, dataToSave);
     /*  console.log("Niñera Registrada con ID:", newNanaId); */
      showNotification("Usuario creado con éxito", "success");/* ----------   Notificaciones de envio */

      setFormData({
        name: "",
        email: "",
        dni:"",
        phone: "",
        address: "",
        availability: "",
        mobility:"",
        children: "",
        maritalStatus: "",
        crossStudies:"",
        neighborhood: "",
        barrioZona:[],
        state: "",
        service:[],
        cv: null,
        sub:false,
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
    <section className="bg-gray-50 ">
    
      {/* Notificaciones */}
    {notification && (
        <div
          className={` p-4 rounded shadow-lg ${
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
    
    {!notification&&
    
    
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-blue-500 mb-6">
          Registro para AT
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
              className="w-full p-3 border rounded-lg focus:outline-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-blue-500"
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
              className="w-full p-3 border rounded-lg focus:outline-blue-500"
              required
            />
          </div>
          
               {/* DNI */}
               <div>
            <label className="block text-gray-700 font-medium mb-2">
              DNI
            </label>
            <input
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-blue-500"
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
              className="w-full p-3 border rounded-lg focus:outline-blue-500"
              required
            />
          </div>


    {/* Barrio */}
    <div className="relative group">
  <label
    className="block text-gray-700 font-medium mb-2 group-hover:text-blue-500 transition duration-300"
  >
    Barrio
  </label>
  <select
    name="neighborhood"
    value={formData.neighborhood}
    onChange={handleChange}
    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
    required
  >
    <option value="" className="text-gray-400">Seleccionar Barrio</option>
    {dataCba.map((barrio) => (
      <option key={barrio} value={barrio}>
        {barrio}
      </option>
    ))}
  </select>

  {/* Decoración con efecto */}
  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 ease-in-out"></div>
</div>

<BarrioSelector handleZone={handleZone}/>


   {/* Rango Horario */}
<div className="relative group">
  <label className="block text-gray-700 font-medium mb-2 group-hover:text-blue-500 transition duration-300">
    Rango Horario Disponible
  </label>
  <input
    type="text"
    name="availability"
    value={formData.availability}
    onChange={handleChange}
    placeholder="Ejemplo: Full-time o Part-time"
    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
    required
  />
  {/* Opciones sugeridas */}
  <div className="mt-2">
    <p className="text-gray-600 text-sm mb-2">Selecciona una opción rápida:</p>
    <div className="flex space-x-4">
      <button
        type="button"
        onClick={() =>
          handleChange({ target: { name: "availability", value: "Full-time" } })
        }
        className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Full-time
      </button>
      <button
        type="button"
        onClick={() =>
          handleChange({ target: { name: "availability", value: "Part-time-m" } })
        }
        className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Part-time Mañana
      </button>
      
      <button
        type="button"
        onClick={() =>
          handleChange({ target: { name: "availability", value: "Part-time-t" } })
        }
        className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Part-time Tarde
      </button>
    </div>
  </div>
</div>


{/* mobility */}
<div className="relative group ">
  <label className="block text-gray-700 font-medium mb-2 group-hover:text-blue-500 transition duration-300">
    ¿Posees movilidad?
  </label>
  <input
    type="text"
    name="mobility"
    value={formData.mobility}
    onChange={handleChange}
    placeholder="Ejemplo:  Si, moto"
    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
    required
  />
  {/* Opciones sugeridas */}
  <div className="mt-2">
  <div className="flex flex-wrap gap-4 sm:space-x-4 sm:flex-nowrap">
      <button
        type="button"
        onClick={() =>
          handleChange({ target: { name: "mobility", value: "autobus" } })
        }
        className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
      Autobus</button>
      <button
        type="button"
        onClick={() =>
          handleChange({ target: { name: "mobility", value: "moto" } })
        }
        className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Si, moto
      </button>
      
      <button
        type="button"
        onClick={() =>
          handleChange({ target: { name: "mobility", value: "auto" } })
        }
        className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
         Si, auto
      </button>
      
           
      <button
        type="button"
        onClick={() =>
          handleChange({ target: { name: "mobility", value: "bici" } })
        }
        className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
         Si, bici
      </button>
      
           
      <button
        type="button"
        onClick={() =>
          handleChange({ target: { name: "mobility", value: "si" } })
        }
        className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
         Tengo quien me lleve
      </button>
    </div>
  </div>
</div>




{/* Hijos ? */}
<div className="relative group mt-6">
  <label className="block text-gray-700 font-medium mb-2 group-hover:text-blue-500 transition duration-300">
   ¿Tienes Hijos?
  </label>
  <input
    type="text"
    name="children"
    value={formData.children}
    onChange={handleChange}
    placeholder="Ej: 2 hijos, 5 y 8 años"
    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
    required
  />

</div>

          
{/* Estado Civil ? */}
<div className="relative group mt-6">
  <label className="block text-gray-700 font-medium mb-2 group-hover:text-blue-500 transition duration-300">
  ¿Con quién convives?
  </label>
  <input
    type="text"
    name="maritalStatus"
    value={formData.maritalStatus}
    onChange={handleChange}
    placeholder="Ej: Solo/a, pareja, familia, compañeros"
    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
    required
  />

</div>



{/* Estudios */}
<div className="relative group ">
  <label className="block text-gray-700 font-medium mb-2 group-hover:text-blue-500 transition duration-300">
  Estudios 
  </label>
  <input
    type="text"
    name="crossStudies"
    value={formData.crossStudies}
    onChange={handleChange}
    placeholder="Ej: Universitario Psicologia, Secundario completo"
    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
    required
  />
  {/* Opciones sugeridas */}
  <div className="mt-2">
  <div className="flex flex-wrap gap-4 sm:space-x-4 sm:flex-nowrap">
      <button
        type="button"
        onClick={() =>
          handleChange({ target: { name: "crossStudies", value: "primario" } })
        }
        className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
       Nivel Primario
      </button>
      <button
        type="button"
        onClick={() =>
          handleChange({ target: { name: "crossStudies", value: "secundario" } })
        }
        className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Nivel Secundario
      </button>
      
      <button
        type="button"
        onClick={() =>
          handleChange({ target: { name: "crossStudies", value: "terciario" } })
        }
        className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
      Nivel Terciario
      </button>
      
           
      <button
        type="button"
        onClick={() =>
          handleChange({ target: { name: "crossStudies", value: "universitario" } })
        }
        className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Nivel Universitario
      </button>
      
           
   
    </div>
  </div>
</div>



          {/* Cargar CV */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Subir CV (opcional)
            </label>
            <input
              type="file"
              name="cv"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full p-3 border rounded-lg focus:outline-blue-500"
            />
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Registrarme como Niñera
          </button>
        </form>
      </div>
      
    }
      
    </section>
  );
}
