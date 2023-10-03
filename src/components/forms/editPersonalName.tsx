"use client";
import {
  Box,
  Grid,
  Divider,
  Button,
  Typography,
  Paper,
  TextField,
  InputLabel,
  IconButton,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

// React Icons
import { IoIosSave } from "react-icons/io";
import { FcCancel } from "react-icons/fc";
import { IoRemove, IoAddOutline } from "react-icons/io5";


// React-Hook-Form
import {
  useForm,
  useFieldArray,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState, Fragment, useMemo } from "react";

// Schema
import {
  // editAuthoritySchema,
  createAuthoritySchema,
} from "@/schema/authority/personalName";

type EditAuthorityData = z.infer<typeof createAuthoritySchema>;

import { schemaAuthorityDoc } from "@/schema/solr";

// Utils
import { UpdateForm } from "@/utils/authority/personalName/updateForm";
import { transformAuthority, transformEditAuthority } from "@/utils/authority/personalName/personalName"

// Share
import months from "@/share/months.json" assert { type: "json" };

// BiblioKeia Services
import { bkapi } from "@/services/api";

// Providers BiblioKeia
import { useProgress } from "src/providers/progress";
import { useAlert } from "src/providers/alert";

// Nextjs
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Link from "next/link";

interface Props {
  doc: schemaAuthorityDoc;
  id: string
}



const headers = {
  accept: "application/json",
  "Content-Type": "application/json",
};

export default function EditPersonaName(props: Props) {
  var contador = 0;
  const { doc } = props;
  // console.log(doc)
  const { id } = props;
  const router = useRouter()
  const { progress, setProgress } = useProgress();
  const {
    openSnack,
    setOpenSnack,
    message,
    setMessage,
    typeAlert,
    setTypeAlert,
  } = useAlert();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditAuthorityData>({
    resolver: zodResolver(createAuthoritySchema),
    defaultValues: {
      fullNameElement: "",
      // hasOccupation: [{ value: "", label: "", base: "" }],
      // hasExactExternalAuthority: [{ value: "", label: "", base: "" }],
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

  const {
    fields: fieldsExternalAuthority,
    append: appendExternalAuthority,
    remove: removeExternalAuthority,
  } = useFieldArray({
    control,
    name: "hasCloseExternalAuthority",
  });

  const {
    fields: fieldshasOccupation,
    append: appendhasOccupation,
    remove: removehasOccupation,
  } = useFieldArray({
    control,
    name: "occupation",
  });

  const {
    fields: fieldshasAffiliation,
    append: appendhasAffiliation,
    remove: removehasAffiliation,
  } = useFieldArray({
    control,
    name: "hasAffiliation",
  });

  useEffect(() => {


    contador++;
    if (contador === 1) {
      // console.log(doc)
      UpdateForm(doc, setValue, appendVariant, appendExternalAuthority, appendhasOccupation, appendhasAffiliation);
    }

    // console.log(contador)
  }, []);

  const addVariant = () => {
    appendVariant({
      fullNameElement: "",
      dateNameElement: "",
    });
  };

  const addOcorrences = () => {
    appendExternalAuthority({
      uri: "",
      label: "",
      base: "",
    });
  };

  const addAffiliation = () => {
    appendhasAffiliation({
      organization: { label: "", uri: "", base: "" },
      affiliationStart: "",
      affiliationEnd: ""
    })
  };

  function editAuthority(data: any) {
    // setProgress(true)
    const authority = transformEditAuthority(data, id, doc.creationDate)
    doc.identifiersLccn && (authority['identifiersLccn'] = doc.identifiersLccn)
    console.log(authority)
    // bkapi
    //   .put("thesarus/edit", authority, {
    //     headers: headers,
    //   })
    //   .then(function (response) {
    //     if (response.status === 200) {
    //       console.log(response);
    //       // setTypeAlert("error");
    //       setMessage("Registro salvo com sucesso!")
    //       setOpenSnack(true);
    //       router.push(`/admin/authority/${id}`);
    //     }
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   })
    //   .finally(function () {
    //     setProgress(false)
    //     //   setOpenSnack(true)
    //     //   setDoc(null)
    //   });

  }
  // console.log(errors)

  return (
    <form onSubmit={handleSubmit(editAuthority)}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" gutterBottom>
          Editar - Nome Pessoal
        </Typography>
        <Box>


          <Box sx={{ display: "flex", gap: "5px" }}>
            <Link href="/admin/authority/">
              <Button
                sx={{ textTransform: "none" }}
                variant="outlined"
                startIcon={<FcCancel />}
              >
                Cancelar
              </Button>
            </Link>


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
                label="Dia"
                variant="outlined"
                size="small"
                sx={{ minWidth: 40, maxWidth: 50 }}
                focused={doc?.birthDayDate ? true : false}
                {...register("birthDayDate")}
              />
              <Controller
                name="birthMonthDate"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl
                    focused={doc?.birthMonthDate ? true : false}
                    sx={{ minWidth: 80 }}
                    size="small"
                  >
                    <InputLabel id="label-month">Mês</InputLabel>
                    <Select
                      {...field}
                      size="small"
                      labelId="label-month"
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
                focused={doc?.birthYearDate ? true : false}
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
                focused={doc?.deathPlace ? true : false}
                {...register("deathPlace")}
              />
              <TextField
                label="Dia"
                variant="outlined"
                sx={{ width: 100 }}
                size="small"
                focused={doc?.deathDayDate ? true : false}
                {...register("deathDayDate")}
              />
              <Controller
                name="deathMonthDate"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl
                    sx={{ width: 100 }}
                    size="small"
                    focused={doc?.deathMonthDate ? true : false}
                  >
                    <InputLabel id="label-month">Mês</InputLabel>
                    <Select {...field} labelId="label-month" label="Mês">
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
                focused={doc?.deathMonthDate ? true : false}
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
                />
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: "flex", alignItems: "center" }}>

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
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Afiliação
            </Typography>
          </Grid>
          {fieldshasAffiliation.map((field, index) => (
            <Fragment key={index}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Organização"
                  variant="outlined"
                  size="small"
                  {...register(`hasAffiliation.${index}.organization.label`)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Início"
                  variant="outlined"
                  size="small"
                  sx={{ width: 100 }}
                  {...register(`hasAffiliation.${index}.affiliationStart`)}
                />
                <TextField
                  fullWidth
                  label="Fim"
                  variant="outlined"
                  size="small"
                  sx={{ width: 100 }}
                  {...register(`hasAffiliation.${index}.affiliationEnd`)}
                />
              </Grid>
              <Grid item xs={5}>
                <Box sx={{ display: "flex", alignItems: "center" }}>

                  <IconButton
                    aria-label="add"
                    onClick={addAffiliation}
                    color="primary"
                  >
                    <IoAddOutline />
                  </IconButton>
                  <IconButton
                    aria-label="add"
                    onClick={() => {
                      removehasAffiliation(index);
                    }}
                    color="primary"
                  >
                    <IoRemove />
                  </IconButton>
                </Box>
              </Grid>


            </Fragment>


          ))}

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
                  {...register(`hasCloseExternalAuthority.${index}.uri`)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Nome"
                  variant="outlined"
                  size="small"
                  {...register(`hasCloseExternalAuthority.${index}.label`)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Base"
                  variant="outlined"
                  size="small"
                  {...register(`hasCloseExternalAuthority.${index}.base`)}
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

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Ocupações
            </Typography>
          </Grid>
          {fieldshasOccupation.map((field, index) => (
            <Fragment key={index}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="URL"
                  variant="outlined"
                  size="small"
                  {...register(`occupation.${index}.uri`)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Nome"
                  variant="outlined"
                  size="small"
                  {...register(`occupation.${index}.label`)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Base"
                  variant="outlined"
                  size="small"
                  {...register(`occupation.${index}.base`)}
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
                    removehasOccupation(index);
                  }}
                  color="primary"
                >
                  <IoRemove />
                </IconButton>
              </Grid>
            </Fragment>
          ))}

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Imagem
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="URL"
              variant="outlined"
              size="small"
              focused={doc?.imagem ? true : false}
              {...register(`imagem`)}
            />
          </Grid>

        </Grid>
      </Paper>
    </form>
  );
}
