"use client";
import {
  Container,
  Box,
  Divider,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  IconButton,
  Button,
} from "@mui/material";

// BiblioKeia Components
import BreadcrumbsBK from "src/components/nav/breadcrumbs";

// BiblioKeia Services
import { bkapi } from "@/services/api";

// React Hooks
import { useEffect, useState } from "react";

// MUI Icons
import { FcHome } from "react-icons/fc";
import { BsPersonPlus } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import { IoIosSave } from "react-icons/io";

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

const createAuthoritySchema = z.object({
  fullNameElement: z.string().nonempty("Nome obrigatório"),
  dateNameElement: z.string().nullable(),
  variants: z.array(
    z.object({
      fullNameElement: z.string(),
      dateNameElement: z.string(),
    })
  ),
});
type CreateAuthorityData = z.infer<typeof createAuthoritySchema>;

const Today = () => {
  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, "0");
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const ano = hoje.getFullYear();
  const dataFormatada = `${ano}-${mes}-${dia}`;

  return dataFormatada;
};

const headers = {
  accept: "application/json",
  "Content-Type": "application/json",
};

function Variants(variants) {
  const v = variants.map((variant) => {
    let variantLabel =
      variant.dateNameElement === ""
        ? variant.fullNameElement
        : `${variant.fullNameElement}, ${variant.dateNameElement}`;
    const elementList: any = [
      {
        type: "FullNameElement",
        elementValue: {
          value: variant.fullNameElement,
        },
      },
    ];
    variant.dateNameElement !== "" &&
      elementList.push({
        type: "DateNameElement",
        elementValue: {
          value: variant.dateNameElement,
        },
      });
    let obj = {
      type: "PersonalName",
      elementList: elementList,
      variantLabel: variantLabel,
    };
    return obj;
  });
  return v;
}

export default function Create() {
  const [id, setId] = useState(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAuthorityData>({
    resolver: zodResolver(createAuthoritySchema),
    defaultValues: {
      variants: [{ fullNameElement: "", dateNameElement: "" }],
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "variants",
    }
  );

  useEffect(() => {
    bkapi
      .get(`/items/next_id`)
      .then(function (response) {
        setId(response.data.id);

        console.log(response.data.id);
      })
      .catch(function (error) {
        // manipula erros da requisição
        console.error(error);
      })
      .finally(function () {
        // setProgress(false)
      });
  }, [String(id)]);

  //   const onSubmit: SubmitHandler<IFormInput> = (formData) => {

  //     console.log(formData);
  //   };

  const addVariant = () => {
    append({
      fullNameElement: "",
      dateNameElement: "",
    });
  };
  function createAuthority(data: any) {
    const today = Today();
    const elementList: any = [
      {
        type: "FullNameElement",
        elementValue: {
          value: data.fullNameElement,
        },
      },
    ];
    data.dateNameElement !== "" &&
      elementList.push({
        type: "DateNameElement",
        elementValue: {
          value: data.dateNameElement,
        },
      });

    const hasVariant = Variants(data.variants);

    const d = {
      type: "PersonalName",
      identifiersLocal: id,
      adminMetadata: {
        creationDate: today,
      },
      authoritativeLabel: "Machado",
      elementList: elementList,
      hasVariant: hasVariant,
      isMemberOfMADSCollection: "string",
    };
    console.log(d);

    bkapi
      .post("http://localhost:8000/authorities/agents/", d, {
        headers: headers,
      })
      .then(function (response) {
        console.log(response);
        //   if (response.status === 200) {
        //     setMessage("Registro excluido com sucesso!")
        //     router.push(`/admin/authority/`)
        //   }
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
            Criar Autoridades
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

        <Grid container spacing={2} sx={{ mt: "5px" }}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Autoridade
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Nome Autorizado"
              variant="outlined"
              {...register("fullNameElement")}
            />
            {errors.fullNameElement && (
              <span>{errors.fullNameElement.message}</span>
            )}
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Data Associada ao Nome"
              variant="outlined"
              {...register("dateNameElement")}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Variantes
            </Typography>
          </Grid>
          {/* <Grid item xs={6}>
            <Box sx={{ display: "flex", gap: "5px", flexDirection: "column" }}> */}
          {fields.map((field, index) => (
            <>
              <Grid item xs={6}>
                <TextField
                    fullWidth
                  label="Nome"
                  variant="outlined"
                  {...register(`variants.${index}.fullNameElement`)}
                />
              </Grid>
              <Grid item xs={6}>
              <TextField
                label="Data Associada ao Nome"
                variant="outlined"
                {...register(`variants.${index}.dateNameElement`)}
              />
              <IconButton aria-label="add" onClick={addVariant}>
                <GrAdd />
              </IconButton>

              </Grid>

              
            </>
          ))}
          {/* </Box>
          </Grid> */}
        </Grid>
      </form>
    </Container>
  );
}
