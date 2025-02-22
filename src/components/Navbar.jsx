import React, { useContext } from "react";
import { UserTypeContext } from "../context/UserTypeContext";
import logo from "../assets/imagen/logo-niñeras-ya.JPG"
import logo1 from '../assets/log-ATulado.jpg'
const Navbar = () => {
  let logoBussines = logo1;
  const { userType, setUserType, seeNavbar } = useContext(UserTypeContext);
  function routerHome() {
    setUserType("");
  }
  function routerLogin() {
    setUserType("Login");
  }
  
  
  return (
    <>
      {seeNavbar ? (
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4  flex justify-between items-center">
            {/* Logo o nombre */}
           {/*  <div className="text-xl font-bold text-gray-700">Match-a</div> */}
        {/*    <div className="text-xl font-bold text-gray-700">NiñetaYA</div> */}
           <img onClick={routerHome}  className="md:h-28 h-24 w-24 md:w-28 rounded-full  p-1"  src={logoBussines} alt="Niñeras Ya" />
            {/* Menú de navegación (extensible si agregas más páginas) */}
            <div className="flex items-center space-x-4">
              <p
                onClick={routerHome}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {userType && "Inicio"}
              </p>

              {/* Agrega más links si lo deseas */}

              {/* Botón de Login */}
              {userType !== "Login" ? (
                <p
                  onClick={routerLogin}
             /*      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              */   
             className="bg-[#D98CCA] text-white px-4 py-2 rounded hover:bg-[#d49fca] transition-colors"
              
              >
                  Iniciar sesión
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </nav>
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;
