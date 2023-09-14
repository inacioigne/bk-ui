"use client";
import { createContext, useContext, useState } from "react";

export const AlertContext = createContext({});

export const AlertProvider = ({ children }) => {
  const [openSnack, setOpenSnack] = useState(false);
  const [message, setMessage] = useState(null);
  const [typeAlert, setTypeAlert] = useState("success");

  return (
    <AlertContext.Provider
      value={{
        openSnack, 
        setOpenSnack, 
        message,
        setMessage,
        typeAlert,
        setTypeAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);