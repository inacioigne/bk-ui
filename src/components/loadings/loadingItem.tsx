import { Stack, Box, Skeleton, Grid } from "@mui/material/";
export default function LoadingItem() {
  return (
    <>
      <Stack spacing={1} sx={{ pl: "2rem", pt: "1rem", pr: "2rem" }}>
        <Skeleton variant="text" width={"40%"} sx={{ fontSize: "1rem" }} />
        <Skeleton variant="rectangular" width={"100%"} height={60} />
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Skeleton variant="rounded" width={"35%"} height={60} />
          <Skeleton variant="rounded" width={"35%"} height={60} />
          <Skeleton variant="rounded" width={"35%"} height={60} />
        </Box>
      </Stack>
    </>
  );
}
