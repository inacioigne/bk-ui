import { Container, Box, Skeleton, Grid } from "@mui/material/";
export default function Loading() {
  return (

      <Container maxWidth="xl">
        <Skeleton variant="text" width={"40%"} sx={{ fontSize: "1rem" }} />
      </Container>
  );

  // return (
  //   <Container maxWidth="xl">
  //     <Box my={"1rem"}>
  //       <Skeleton variant="text" width={"40%"} sx={{ fontSize: "1rem" }} />
  //       <Skeleton variant="rectangular" width={"100%"} height={40} />
  //     </Box>
  //     <Grid
  //       container
  //       spacing={2}
  //       sx={{ alignItems: "flex-start", alignContent: "flex-start" }}
  //     >
  //       <Grid item xs={4}>
  //         <Skeleton variant="rounded" height={60} />
  //       </Grid>
  //       <Grid item xs={4}>
  //         <Skeleton variant="rounded" height={60} />
  //       </Grid>
  //       <Grid item xs={4}>
  //         <Skeleton variant="rounded" height={60} />
  //       </Grid>
  //     </Grid>
  //   </Container>
  // );
}
