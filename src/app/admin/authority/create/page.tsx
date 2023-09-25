"use client";
import {
  Container,
  Box,
  Divider,
  Typography,
  Grid,
  FormControl,
  Paper,
  TextField,
  IconButton,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

// BiblioKeia Components
import BreadcrumbsBK from "src/components/nav/breadcrumbs";

// BiblioKeia Services
import { bkapi } from "@/services/api";

// React Hooks
import { useEffect, useState, Fragment } from "react";

// Nextjs
import { useRouter } from "next/navigation";

// MUI Icons
import { FcHome } from "react-icons/fc";
import { BsPersonPlus } from "react-icons/bs";
import { IoIosSave } from "react-icons/io";
import { IoRemove, IoAddOutline } from "react-icons/io5";

// Schema
import { createAuthoritySchema } from "@/schema/authority/personalName";

// Utils
import { transformAuthority } from "@/utils/authority/personalName/personalName";

// Share
import months from "@/share/months.json" assert { type: "json" };

// React-Hook-Form
import {
  useForm,
  useFieldArray,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
];

type CreateAuthorityData = z.infer<typeof createAuthoritySchema>;

const headers = {
  accept: "application/json",
  "Content-Type": "application/json",
};

export default function Create() {
  const [id, setId] = useState(null);
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAuthorityData>({
    resolver: zodResolver(createAuthoritySchema),
    defaultValues: {
      hasVariant: [{ fullNameElement: "", dateNameElement: "" }],
      hasExactExternalAuthority: [{ value: "", label: "", base: "" }],
    },
  });

  const {
    fields: fieldsVariant,
    append: appendVariant,
    remove: removeVariant,
    swap,
    move,
    insert,
  } = useFieldArray({
    control,
    name: "hasVariant",
  });

  const {
    fields: fieldsExternalAuthority,
    append: appendExternalAuthority,
    remove: removeExternalAuthority,
  } = useFieldArray({
    control,
    name: "hasExactExternalAuthority",
  });

  useEffect(() => {
    bkapi
      .get(`/authority/next`)
      .then(function (response) {
        setId(response.data.id);

        // console.log(response.data.id);
      })
      .catch(function (error) {
        // manipula erros da requisição
        console.error(error);
      })
      .finally(function () {
        // setProgress(false)
      });
  }, [String(id)]);

  const addVariant = () => {
    appendVariant({
      fullNameElement: "",
      dateNameElement: "",
    });
  };
  const addOcorrences = () => {
    appendExternalAuthority({
      value: "",
      label: "",
      base: "",
    });
  };

  // console.log(errors)

  function createAuthority(data: any) {
    const personalName = transformAuthority(data, id);
    console.log(personalName);
    // console.log(data);

    bkapi
      .post("http://localhost:8000/authority/personalName/", personalName, {
        headers: headers,
      })
      .then(function (response) {
        if (response.status === 201) {
          console.log(response);
          // setMessage("Registro excluido com sucesso!")
          router.push(`/admin/authority/${id}`);
        }
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(function () {
        //   setProgress(false)
        //   setOpenSnack(true)
        //   setDoc(null)
      });
  }

  return (
    <Container maxWidth="xl">
      <Box my={"1rem"}>
        <BreadcrumbsBK previousPaths={previousPaths} currentPath={id && id} />
      </Box>
      <form onSubmit={handleSubmit(createAuthority)}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" gutterBottom>
            Criar Autoridades - Nome Pessoal
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
              <TextField
                fullWidth
                size="small"
                label="Nome Autorizado"
                variant="outlined"
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
                  {...register("birthPlace")}
                />
                <TextField
                  label="Dia"
                  variant="outlined"
                  size="small"
                  sx={{ width: 100 }}
                  {...register("birthDayDate")}
                />
                <Controller
                  name="birthMonthDate"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl sx={{ minWidth: 100 }} size="small">
                      <InputLabel id="demo-simple-select-label">Mês</InputLabel>
                      <Select
                        {...field}
                        size="small"
                        labelId="demo-simple-select-label"
                        label="Mês"
                      >
                        {months.map((mes, index) => (
                          <MenuItem key={index} value={mes.value}>
                            {mes.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
                <TextField
                  label="Ano"
                  variant="outlined"
                  sx={{ width: 100 }}
                  size="small"
                  {...register("birthYearDate")}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" gutterBottom>
                Falecimento:
              </Typography>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <TextField
                  label="Local de Falecimento"
                  variant="outlined"
                  size="small"
                  {...register("deathPlace")}
                />
                <TextField
                  label="Dia"
                  variant="outlined"
                  sx={{ width: 100 }}
                  size="small"
                  {...register("deathDayDate")}
                />
                <Controller
                  name="deathMonthDate"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl sx={{ width: 100 }} size="small">
                      <InputLabel id="demo-simple-select-label">Mês</InputLabel>
                      <Select
                        {...field}
                        labelId="demo-simple-select-label"
                        label="Mês"
                      >
                        {months.map((mes, index) => (
                          <MenuItem key={index} value={mes.value}>
                            {mes.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
                <TextField
                  label="Ano"
                  variant="outlined"
                  sx={{ width: 100 }}
                  size="small"
                  {...register("deathYearDate")}
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
                    // sx={{minWidth: 500}}
                  />
                  
                </Grid>
                <Grid item xs={6}>
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
                </Grid>
                {/* <Grid item xs={6}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <TextField
                                            label="Data Associada ao Nome"
                                            variant="outlined"
                                            size="small"
                                            {...register(`hasVariant.${index}.dateNameElement`)}
                                        />
                                        <IconButton aria-label="add" onClick={addVariant} color="primary">
                                            <IoAddOutline />
                                        </IconButton>
                                        <IconButton aria-label="add" onClick={() => {
                                            removeVariant(index)
                                        }} color="primary">
                                            <IoRemove />
                                        </IconButton>
                                    </Box>
                                </Grid> */}
              </Fragment>
            ))}
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                Campos de Atividades
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                Ocupações
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Afiliação
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Ocorrência em outras bases
              </Typography>
            </Grid>
            {fieldsExternalAuthority.map((field, index) => (
              <Fragment key={index}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="URL"
                    variant="outlined"
                    size="small"
                    {...register(`hasExactExternalAuthority.${index}.value`)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Nome"
                    variant="outlined"
                    size="small"
                    {...register(`hasExactExternalAuthority.${index}.label`)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Base"
                    variant="outlined"
                    size="small"
                    {...register(`hasExactExternalAuthority.${index}.base`)}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    aria-label="add"
                    onClick={addOcorrences}
                    color="primary"
                  >
                    <IoAddOutline />
                  </IconButton>
                  <IconButton
                    aria-label="add"
                    onClick={() => {
                      removeExternalAuthority(index);
                    }}
                    color="primary"
                  >
                    <IoRemove />
                  </IconButton>
                </Grid>
              </Fragment>
            ))}
          </Grid>
        </Paper>
      </form>
    </Container>
  );
}
