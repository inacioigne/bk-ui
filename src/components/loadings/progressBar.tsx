import { LinearProgress, Box, Skeleton, Grid } from "@mui/material/";
export default function ProgressBar() {
  return (

       <Box sx={{ position: "absolute", zIndex: 2200, width: '100%' }}>
        <LinearProgress />
      </Box>

  );
}
