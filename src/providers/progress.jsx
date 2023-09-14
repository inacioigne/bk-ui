"use client";
import { createContext, useContext, useState } from "react";

export const ProgressContext = createContext({});

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(false);

  const initProgress = () => setProgress(true) 

  return (
    <ProgressContext.Provider value={{ progress, setProgress, initProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);