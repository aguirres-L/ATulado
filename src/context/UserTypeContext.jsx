// src/context/UserTypeContext.jsx

import React, { createContext, useState } from 'react';

// 1. Creamos el context
export const UserTypeContext = createContext();

// 2. Creamos el provider
export const UserTypeProvider = ({ children }) => {
  // Estado para manejar el tipo de usuario
  // Puede ser "client" o "professional"
  const [userType, setUserType] = useState('');
  const [seeNavbar, setSeeNavbar] = useState(true);
  return (
    <UserTypeContext.Provider
      value={{
        userType,
        setUserType,
        seeNavbar, setSeeNavbar
      }}
    >
      {children}
    </UserTypeContext.Provider>
  );
};
