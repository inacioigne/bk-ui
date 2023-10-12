"use client";
import {
  Container,
  Box,
  Divider,
  Typography,
  Grid,
  Button,
} from "@mui/material";

// BiblioKeia Components
import BreadcrumbsBK from "src/components/nav/breadcrumbs";
import FormLCSH from "@/components/forms/formImportLocAuthority";
import FormLoc from "@/components/forms/formLocCreate";
import CardLoc from "@/components/cards/cardLoc";

// react-icons
import { FcHome, FcCancel } from "react-icons/fc";
import { BsPersonPlus, BsPersonFillDown } from "react-icons/bs";
import { IoIosSave } from "react-icons/io";

import { useState } from "react";

const previousPaths = [
  {
    link: "/admin",
    label: "Início",
    icon: <FcHome fontSize="small" />,
  },
  {
    link: "/admin/authority",
    label: "Autoridades",
    icon: <BsPersonPlus fontSize="small" />,
  },
  {
    link: "/admin/authority/importation",
    label: "Importação",
    icon: <BsPersonFillDown fontSize="small" />,
  },
];

export default function LOC() {
  const [hit, setHit] = useState(null);
  const [form, setForm] = useState(false);
  return (
    <Container maxWidth="xl">
      <Box my={"1rem"}>
        <BreadcrumbsBK previousPaths={previousPaths} currentPath="LOC" />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" gutterBottom>
          Importar Autoridades - Library of Congress
        </Typography>
        {form && (
          <Box>
            <Button
              sx={{ textTransform: "none" }}
              variant="outlined"
              startIcon={<FcCancel />}
              onClick={() => {
                setForm(!form);
              }}
            >
              Cancelar
            </Button>
          </Box>
        )}
      </Box>

      <Divider />
      <Grid container spacing={2}>
        {!form ? (
          <>
            <Grid item xs={5} sx={{ mt: "15px" }}>
              <FormLCSH setHit={setHit} />
            </Grid>
            <Grid item xs={7} sx={{ mt: "15px" }}>
              {hit && <CardLoc hit={hit} setHit={setHit} setForm={setForm} />}
            </Grid>
          </>
        ) : (
          <FormLoc hit={hit} />
        )}
      </Grid>
    </Container>
  );
}
