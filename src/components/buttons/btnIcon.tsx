"use client";
// MUI Components
import { Button } from "@mui/material";

export default function BtnIcon({ icon, label }) {
  return (
    <Button
      variant="outlined"
      startIcon={icon}
      sx={{ textTransform: "none", cursor: "auto" }}
    >
      {label}
    </Button>
  );
}