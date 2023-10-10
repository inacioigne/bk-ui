"use client";
import { createContext, useContext, useState, ReactNode  } from "react";


interface ContextType {
  openSnack: boolean;
  setOpenSnack: Function;
  message: string;
  setMessage: Function;
  typeAlert: string;
  setTypeAlert: Function
}

export const AlertContext = createContext<ContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {

  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [typeAlert, setTypeAlert] = useState<string>("success");


  const contextValue: ContextType = {
    openSnack, setOpenSnack, message, setMessage, typeAlert, setTypeAlert
  };

  return <AlertContext.Provider value={contextValue}>{children}</AlertContext.Provider>;
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert deve ser usado dentro de um MyContextProvider');
  }
  return context;
}
