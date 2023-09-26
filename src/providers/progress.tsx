"use client";
import { createContext, useContext, useState, ReactNode  } from "react";

type ContextType = {
  progress: boolean;
  setProgress: Function
};

export const ProgressContext = createContext<ContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {

  const [progress, setProgress] = useState<boolean>(false);


  const contextValue: ContextType = {
    progress, setProgress
  };

  return <ProgressContext.Provider value={contextValue}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress deve ser usado dentro de um MyContextProvider');
  }
  return context;
}