"use client";
import {
  Container,
  Box,
  Grid,
  Skeleton,
  DialogActions,
  DialogContentText,
  DialogContent,
  Dialog,
  ButtonGroup,
  Divider,
  Button,
  Typography,
  Paper,
  TextField,
  InputLabel,
  IconButton,
} from "@mui/material";

// BiblioKeia Components
import BreadcrumbsBK from "src/components/nav/breadcrumbs";

// React Icons
import { FcHome, FcCalendar } from "react-icons/fc";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { IoIosSave } from "react-icons/io";
import { IoRemove, IoAddOutline } from "react-icons/io5";

// React-Hook-Form
import {
  useForm,
  useFieldArray,
  Controller,
  SubmitHandler,
} from "react-hook-form";

// Schema
import { createAuthoritySchema } from "@/schema/authority/personalName";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, Fragment } from "react";

// BiblioKeia Services
import { solr } from "@/services/solr";

import { PersonalNameDoc } from "@/schema/authority/solr";

const previousPaths = [
  {
    link: "/admin",
    label: "Início",
    icon: <FcHome fontSize="small" />,
  },
  {
    link: "/admin/Authority",
    label: "Autoridades",
    icon: <BsFillPersonLinesFill fontSize="small" />,
  },
];

type CreateAuthorityData = z.infer<typeof createAuthoritySchema>;

// Utils
import { UpdateForm } from "@/utils/authority/personalName/updateForm";

export default function Edit({ params }: { params: { id: string } }) {
  const [doc, setDoc] = useState<PersonalNameDoc | null>(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateAuthorityData>({
    resolver: zodResolver(createAuthoritySchema),
    defaultValues: {
      fullNameElement: "",
      hasVariant: [{ fullNameElement: "", dateNameElement: "" }],
      hasExactExternalAuthority: [{ value: "", label: "", base: "" }],
    },
  });

  const {
    fields: fieldsVariant,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "hasVariant",
  });

  const addVariant = () => {
    appendVariant({
      fullNameElement: "",
      dateNameElement: "",
    });
  };

  useEffect(() => {
    solr
      .get(`authority/select?fl=*,[child]&q=id:${params.id}`)
      .then(function (response) {
        const [doc] = response.data.response.docs;
        setDoc(doc);
        UpdateForm(doc, setValue);

        console.log(doc);
      })
      .catch(function (error) {
        // manipula erros da requisição
        console.error(error);
      })
      .finally(function () {
        // setProgress(false)
      });
  }, []);

  function editAuthority(data: any) {
    console.log(data);
  }

  console.log(errors);

  return (
    <Container maxWidth="xl">
      <Box my={"1rem"}>
        <BreadcrumbsBK
          previousPaths={previousPaths}
          currentPath={`edit/${params.id}`}
        />
      </Box>
      <form onSubmit={handleSubmit(editAuthority)}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" gutterBottom>
            Editar - Nome Pessoal
          </Typography>
          <Box>
            <Button
              type="submit"
              sx={{ textTransform: "none" }}
              variant="outlined"
              startIcon={<IoIosSave />}
            >
              Salvar
            </Button>
          </Box>
        </Box>
        <Divider />
        <Paper sx={{ p: "15px", mt: "10px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Autoridade
              </Typography>
            </Grid>
            <Grid item xs={6}>
              {/* <InputLabel htmlFor="component-simple" focused={true}>Nome Autorizado</InputLabel> */}
              <TextField
                fullWidth
                size="small"
                // id="component-simple"
                // labelId="demo-simple-select-label"
                label="Nome Autorizado"
                variant="outlined"
                focused={true}
                {...register("fullNameElement")}
              />
              {errors.fullNameElement && (
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  color={"red"}
                >
                  {errors.fullNameElement.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                size="small"
                label="Nome completo"
                variant="outlined"
                focused={doc?.fullerName ? true : false}
                {...register("fullerName")}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" gutterBottom>
                Nascimento:
              </Typography>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <TextField
                  label="Local de Nascimento"
                  variant="outlined"
                  size="small"
                  focused={doc?.birthPlace ? true : false}
                  {...register("birthPlace")}
                />
                <TextField
                  label="Data"
                  variant="outlined"
                  size="small"
                  sx={{ width: 150 }}
                  focused={doc?.birthDate ? true : false}
                  {...register("birthDate")}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Divider />
              <Typography variant="h6" gutterBottom>
                Variantes do nome
              </Typography>
            </Grid>
            {fieldsVariant.map((field, index) => (
              <Fragment key={index}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Nome"
                    variant="outlined"
                    size="small"
                    {...register(`hasVariant.${index}.fullNameElement`)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      label="Data Associada ao Nome"
                      variant="outlined"
                      size="small"
                      {...register(`hasVariant.${index}.dateNameElement`)}
                    />
                    <IconButton
                      aria-label="add"
                      onClick={addVariant}
                      color="primary"
                    >
                      <IoAddOutline />
                    </IconButton>
                    <IconButton
                      aria-label="add"
                      onClick={() => {
                        removeVariant(index);
                      }}
                      color="primary"
                    >
                      <IoRemove />
                    </IconButton>
                  </Box>
                </Grid>
              </Fragment>
            ))}
          </Grid>
        </Paper>
      </form>
    </Container>
  );
}
