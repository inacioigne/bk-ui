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
  // IconButton,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

// BiblioKeia Components
import BreadcrumbsBK from "src/components/nav/breadcrumbs";
import FormElementList from "@/components/forms/madsrdf/formElementList"
import FormAffiliation from "@/components/forms/madsrdf/formAffiliation"
import FormVariant from "@/components/forms/madsrdf/formVariant"
import FormHCEA from "@/components/forms/madsrdf/formHCEA"
import FormRWO from "@/components/forms/madsrdf/formRWO"
import FormOccupation from "@/components/forms/madsrdf/formOccupation"
import FormFieldOfActivity from "@/components/forms/madsrdf/formFieldOfActivity"
import FormFullerName from "@/components/forms/madsrdf/formFullerName"

// BiblioKeia Services
import { bkapi } from "@/services/api";

// React Hooks
import { useEffect, useState } from "react";

// Nextjs
import { useRouter } from "next/navigation";

// MUI Icons
import { FcHome } from "react-icons/fc";
import { BsPersonPlus } from "react-icons/bs";
import { IoIosSave } from "react-icons/io";
// import { IoRemove, IoAddOutline } from "react-icons/io5";

// Schema
import { MadsSchema } from "@/schema/authority/madsSchema"

// Utils
// import { transformAuthority } from "@/utils/authority/personalName/personalName";

// Share
import months from "@/share/months.json" assert { type: "json" };

// React-Hook-Form
import {
  useForm,
  // useFieldArray,
  Controller,
  // SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Providers BiblioKeia
import { useProgress } from "src/providers/progress";
import { useAlert } from "src/providers/alert";
import { ParserData } from "src/services/thesarus/parserData"


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

type SchemaCreateAuthority = z.infer<typeof MadsSchema>;

const headers = {
  accept: "application/json",
  "Content-Type": "application/json",
};

export default function Create() {
  const [id, setId] = useState(null);
  const router = useRouter();
  const { progress, setProgress } = useProgress();
  const {
    openSnack,
    setOpenSnack,
    message,
    setMessage,
    typeAlert,
    setTypeAlert,
  } = useAlert();



  // const {
  //   fields: fieldsVariant,
  //   append: appendVariant,
  //   remove: removeVariant,
  //   swap,
  //   move,
  //   insert,
  // } = useFieldArray({
  //   control,
  //   name: "hasVariant",
  // });

  // const {
  //   fields: fieldsExternalAuthority,
  //   append: appendExternalAuthority,
  //   remove: removeExternalAuthority,
  // } = useFieldArray({
  //   control,
  //   name: "hasExactExternalAuthority",
  // });

  useEffect(() => {
    bkapi
      .get(`/thesarus/next_id`)
      .then(function (response) {
        setId(response.data);

        console.log(response.data);
      })
      .catch(function (error) {
        // manipula erros da requisição
        console.error(error);
      })
      .finally(function () {
        // setProgress(false)
      });
  }, [String(id)]);

  const defaultValues = {
    elementList: [{
      type: 'FullNameElement', elementValue: {
        value: "",// lang: "" 
      }
    }],
    hasVariant: [{
      type: "PersonalName",
      elementList: [{type: "", elementValue: {value: ""}}],
      fullNameElement: "",
      //   dateNameElement: "",
    }],
    hasAffiliation: [{
      organization: { label: "", uri: "" },
      affiliationStart: "",
      affiliationEnd: ""
    }],
    occupation: [{
      uri: "",
      label: "",
      base: ""
    }],
    hasCloseExternalAuthority: [{
      uri: "",
      label: "",
      base: ""
    }],
    identifiesRWO: [{
      uri: "",
      label: "",
      base: ""
    }],
    fieldOfActivity: [{
      uri: "",
      label: "",
      base: ""
    }]
  }

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SchemaCreateAuthority>({
    resolver: zodResolver(MadsSchema),
    defaultValues: defaultValues,
  });

  // console.log(errors)

  

  function createAuthority(data: any) {

    // setProgress(true)
    let formData = ParserData(data)
    
       
    let obj = {
      type: "PersonalName",
      identifiersLocal: String(id),
      adminMetadata: {
        status: {
          label: "novo",
          value: "n"
        },
      },
      authoritativeLabel: data.birthYearDate ?
        `${data.elementList[0].elementValue.value}, ${data.birthYearDate}` : data.elementList[0].elementValue.value,
    }

    const request = { ...obj, ...formData };
    // console.log(request)

    // bkapi
    //   .post("/thesarus/create", request, {
    //     headers: headers,
    //   })
    //   .then(function (response) {
    //     if (response.status === 201) {
    //       console.log(response);
    //       setMessage("Registro criado com sucesso!")
    //       router.push(`/admin/authority/${response.data.id}`);
    //     }
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   })
    //   .finally(function () {
    //     setProgress(false)
    //     setOpenSnack(true)
    //     //   setDoc(null)
    //   });
      
  }




  return (
    <Container maxWidth="xl">
      <Box my={"1rem"}>
        <BreadcrumbsBK previousPaths={previousPaths} currentPath={id ? id : "1"} />
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
            <FormElementList control={control} register={register} error={errors.elementList} />
            <Grid item xs={5}>
              {/* FullerName */}
              <FormFullerName register={register} />
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
                  defaultValue=""
                  {...register("birthPlace")}
                />
                <TextField
                  label="Dia"
                  variant="outlined"
                  size="small"
                  sx={{ minWidth: 40, maxWidth: 50 }}
                  // focused={doc?.birthDayDate ? true : false}
                  {...register("birthDayDate")}
                />
                <Controller
                  name="birthMonthDate"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl
                      // focused={doc?.birthMonthDate ? true : false}
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
                  // focused={doc?.birthYearDate ? true : false}
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
                  // focused={doc?.deathPlace ? true : false}
                  {...register("deathPlace")}
                />
                <TextField
                  label="Dia"
                  variant="outlined"
                  sx={{ width: 100 }}
                  size="small"
                  // focused={doc?.deathDayDate ? true : false}
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
                    // focused={doc?.deathMonthDate ? true : false}
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
                  // focused={doc?.deathMonthDate ? true : false}
                  {...register("deathYearDate")}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Variantes do nome
              </Typography>
              <Divider />
            </Grid>
            <FormVariant control={control} register={register} />
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Afiliação
              </Typography>
              <Divider />
            </Grid>
            <FormAffiliation control={control} register={register} />
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Ocupações
              </Typography>
              <Divider />
            </Grid>
            <FormOccupation control={control} register={register} />
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Campos de atividade
              </Typography>
              <Divider />
            </Grid>
            <FormFieldOfActivity control={control} register={register} />
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Identificadores
              </Typography>
              <Divider />
            </Grid>
            <FormRWO control={control} register={register} />
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Ocorrências em outra bases
              </Typography>
              <Divider />
            </Grid>
            <FormHCEA control={control} register={register} />
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Imagem
              </Typography>
              <Divider />
              <TextField
                fullWidth
                size="small"
                label="Imagem"
                variant="outlined"
                {...register("imagem")}
              />
            </Grid>


          </Grid>

          {/* <Grid container spacing={2}>
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
             <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
             Imagem
            </Typography>
          </Grid>
          <Grid item xs={6}>
          <TextField
                  fullWidth
                  label="URL"
                  variant="outlined"
                  size="small"
                  {...register(`imagem`)}
                />

          </Grid>
          </Grid> */}
        </Paper>
      </form>
    </Container>
  );
}
