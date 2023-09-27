// "use client";
// MUI Components
import { Button } from "@mui/material";

interface Props {
  icon: React.ReactNode;
  label: string
}

export default function BtnIcon({ icon, label }: Props) {
  return (
    <Button
      variant="outlined"
      startIcon={icon}
      size="small"
      sx={{ textTransform: "none", cursor: "auto" }}
    >
      {label}
    </Button>
  );
}