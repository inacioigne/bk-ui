"use client";
// MUI Components
import { AppBar, Toolbar, IconButton } from "@mui/material/";

// MUI Styles
import { useTheme } from "@mui/material/styles";

// MUI Icons
import { MdFormatIndentIncrease, MdOutlineFormatIndentDecrease } from 'react-icons/md';


// MUI Colors
import { grey } from "@mui/material/colors";

// BiblioKeia Components
import DarkMode from "src/components/buttons/darkMode"


export default function NavBar({ open, setOpen }) {
  const theme = useTheme();

  const transWidthLeaving = theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  });

  const transMarginLeaving = theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  });

  const transWidthEntering = theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  });

  const transMarginEntering = theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  });

  const styleOpenHeader = {
    backgroundColor: "background.default",
    boxShadow: "none",
    color: "inherit",
    width: "calc(100% - 260px)",
    transition: `${transWidthEntering}, ${transMarginEntering}`,
  };

  const styleCloseHeader = {
    backgroundColor: "background.default",
    boxShadow: "none",
    color: "inherit",
    width: "calc(100% - 60px)",
    transition: `${transWidthLeaving}, ${transMarginLeaving}`,
  };

  return (
    <AppBar
      position="fixed"
      sx={open ? { ...styleOpenHeader } : { ...styleCloseHeader }}
    >
      <Toolbar
        sx={{
          position: "relative",
          p: "8px 16px",
          minHeight: "60px",
        }}
      >
        <IconButton
          sx={{
            borderRadius: "4px",
            color: grey[800],
            backgroundColor: grey[100],
          }}
          onClick={() => setOpen(!open)}
        >
          {open ? <MdOutlineFormatIndentDecrease /> : <MdFormatIndentIncrease />}
        </IconButton>
        <DarkMode />
      </Toolbar>
    </AppBar>
  );
}
