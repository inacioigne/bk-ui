"use client";
import { createContext, useContext, useState, FC } from "react";

interface ContextType {
  openSnack: boolean;
  setOpenSnack: Function;
  message: string;
  setMessage: Function;
  typeAlert: string;
  setTypeAlert: Function
}

export const AlertContext = createContext<ContextType|undefined>(undefined);

export const AlertProvider: FC = ({ children }) => {
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