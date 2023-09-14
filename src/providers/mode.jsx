"use client";
// MUI Styles
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey, blue, indigo } from "@mui/material/colors";

// React Hooks
import { createContext, useContext, useState, useMemo } from "react";


export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const modeLight = {
    palette: {
      mode: "light",
      background: {
        bgBk: grey[100]
      },
      hover: {
        background: blue[100]
      }
    },
  };

  const modeDark = {
    palette: {
      mode: "dark",
      hover: {
        background: indigo[600]
      }
    },
  };

  const theme = useMemo(
    () =>
      createTheme({
        ...(mode === "light" ? modeLight : modeDark),
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={{setMode, mode}}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => useContext(ColorModeContext);
