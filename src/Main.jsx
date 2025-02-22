import { useContext, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { UserTypeContext } from "./context/UserTypeContext";
import FormClientes from "./components/forms/FormCliente";
import FormProfesionales from "./components/forms/FormProfesionales";
import LoginComponent from "./components/login/LoginComponent";
import { UserProvider } from "./context/UserContext";

export default function Main(){
    const { userType} = useContext(UserTypeContext);
   if(userType) console.log(userType,'userType ');
   useEffect(() => {
    // Cuando userType sea "Profesional" o "Clients", desplázate hacia arriba.
    if (userType === "Profesional" || userType === "Clients") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [userType]); // Se ejecuta cada vez que cambia userType

    return(
        <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar/>
        <main className="flex-1">
        {!userType &&  
        <Home/>
        }
         <UserProvider>
        { userType === "Login" && <LoginComponent/> }
        { userType === "Profesional" &&  <FormProfesionales className="p-4 max-w-lg mx-auto bg-white rounded shadow-md" />  }
        { userType === "Clients" &&   <FormClientes className="p-4 max-w-lg mx-auto bg-white rounded shadow-md" /> }
        </UserProvider>
        </main>
        
        </div>
    )
}