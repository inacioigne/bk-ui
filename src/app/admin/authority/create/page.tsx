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
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

// BiblioKeia Components
import BreadcrumbsBK from "src/components/nav/breadcrumbs";
import FormElementList from "@/components/madsrdf/forms/formElementList"
import FormAffiliation from "@/components/madsrdf/forms/formAffiliation"
import FormVariant from "@/components/forms/madsrdf/formVariant"
import FormHCEA from "@/components/madsrdf/forms/formHCEA"
import FormRWO from "@/components/madsrdf/forms/formRWO"
import FormOccupation from "@/components/madsrdf/forms/formOccupation"
import FormFieldOfActivity from "@/components/madsrdf/forms/formFieldOfActivity"
import FormFullerName from "@/components/madsrdf/forms/formFullerName"
// teste
import  FieldArray from "@/app/admin/test/fieldArray"
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
        value: "", 
      }
    }],
    hasVariant: [{
      type: "PersonalName",
      elementList: [{type: "FullNameElement", elementValue: {value: ""}}],
    }],
    test: [
      {
          name: "useFieldArray1",
          nestedArray: [{ field1: "field1", field2: "field2" }]
      },
      {
          name: "useFieldArray2",
          nestedArray: [{ field1: "field1", field2: "field2" }]
      }
  ],
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
    getValues
  } = useForm<SchemaCreateAuthority>({
    resolver: zodResolver(MadsSchema),
    defaultValues: defaultValues,
  });

  console.log(errors)

  

  function createAuthority(data: any) {    
    console.log(data)

    // setProgress(true)
    let formData = ParserData(data)
    // 
    
       
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
            <FormVariant control={control} register={register} getValues={getValues} setValue={setValue} />
            <FieldArray
                {...{ control, register, defaultValues, getValues, setValue, errors }}
            />
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
        </Paper>
      </form>
    </Container>
  );
}
