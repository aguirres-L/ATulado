import React, { createContext, useContext, useState } from "react";

// Crear el contexto
const UserContext = createContext();

// Hook personalizado para usar el contexto
export const useUser = () => useContext(UserContext);

// Componente proveedor para envolver la aplicación
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario

  const login = (userData) => {
    setUser(userData); // Establece los datos del usuario cuando inicia sesión
  };

  const logout = () => {
    setUser(null); // Limpia los datos del usuario cuando cierra sesión
  };

  return (
    <UserContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
