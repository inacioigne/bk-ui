"use client";
// MUI Components
import { Box } from "@mui/material/";

// BiblioKeia Components
import NavBar from "../../components/nav/navBar";
import SideBar from "../../components/nav/sideBar";

// React Hooks
import { useState } from "react";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ display: "flex" }}>
      {/* NAVBAR */}
      <NavBar open={open} setOpen={setOpen} />
      <Box component="nav" sx={{ zIndex: 1200 }}>
        <SideBar open={open} />
      </Box>
      <Box
        component="main"
        sx={{
          mt: "60px",
          width: "calc(100% - 260px)",
          height: "calc(100vh - 60px)",
          overflow: "auto",
          flexGrow: 1,
          backgroundColor: "background.bgBk",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
