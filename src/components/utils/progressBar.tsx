"use client";
// MUI Components
import { Box, LinearProgress, Alert, Snackbar } from "@mui/material/";
import { useEffect, useState } from "react";
import NextTopLoader from 'nextjs-toploader';

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 600);
    return () => {
        clearInterval(interval)
    }
  }, []);
  return (
    <Box sx={{ position: "absolute", zIndex: 2200, width: "100%" }}>
         <NextTopLoader color="red" />
      Progress Bar {progress}
    </Box>
  );
};

export default ProgressBar;
