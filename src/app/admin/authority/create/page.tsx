"use client"
import {
    Container,
    Box,
    Divider,
    Typography,
    Grid,
    Card,
    CardContent,
    TextField
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

import { useForm, Controller, SubmitHandler } from "react-hook-form"

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

interface IFormInput {
    FullNameElement: string;
    DateNameElement: string;
}

export default function Create() {
    const { control, handleSubmit } = useForm<IFormInput>();
    const [id, setId] = useState(null)

    useEffect(() => { 

        bkapi.get(`/items/next_id`)
          .then(function (response) {
            setId(response.data.id)
 
            console.log(response.data.id)
          })
          .catch(function (error) {
            // manipula erros da requisição
            console.error(error);
          })
          .finally(function () {
            // setProgress(false)
          });
    
      }, [])

    const onSubmit: SubmitHandler<IFormInput> = (d) => {
        const hoje = new Date();
        const dia = String(hoje.getDate()).padStart(2, '0'); // Dia com zero à esquerda se for necessário
        const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // Mês com zero à esquerda se for necessário (lembrando que janeiro é 0)
        const ano = hoje.getFullYear();
        const dataFormatada = `${ano}-${mes}-${dia}`;


        const headers = {
            'Content-Type': 'application/json',
        };

        //   bkapi.post("authorities/agents/", { data, headers })
        //     .then(function (response) {
        //       console.log(response)
        //     //   if (response.status === 200) {
        //     //     setMessage("Registro excluido com sucesso!")
        //     //     router.push(`/admin/authority/`)
        //     //   }
        //     })
        //     .catch(function (error) {
        //       console.error(error);
        //     })
        //     .finally(function () {
        //     //   setProgress(false)
        //     //   setOpenSnack(true)
        //     //   setDoc(null)
        //     });

        // console.log(personalName)

        const data = {
            'type': 'PersonalName',
            'adminMetadata': {
                'creationDate': '2023-09-18',
                'identifiedBy': [
                    {
                        'type': 'Local',
                        'assigner': 'http://id.loc.gov/vocabulary/organizations/brmninpa',
                        'value': 'bka-4'
                    }
                ]
            },
            'authoritativeLabel': 'Machado de Assis',
            'elementList': [
                {
                    'type': 'FullNameElement',
                    'elementValue': {
                        'value': 'Machado de Assis'
                    }
                },
                {
                    'type': 'DateNameElement',
                    'elementValue': {
                        'value': '1839-1908'
                    }
                }
            ],
            'isMemberOfMADSCollection': 'http://bibliokeia.com/authorities/PersonalName/'
        }

        bkapi.post(
            'http://localhost:8000/authorities/agents/', data,
            {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        ).then(function (response) {
                  console.log(response)
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
            <Typography variant="h4" gutterBottom>
                Criar Autoridades
            </Typography>
            <Divider />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} sx={{ mt: "5px" }}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Autoridade
                        </Typography>
                        <Controller
                            name="FullNameElement"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField
                                {...field}
                                label="Nome"
                                variant="outlined"
                            />}
                        />
                        <Controller
                            name="DateNameElement"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField
                                {...field}
                                label="Data"
                                variant="outlined"
                            />}
                        />
                    </Grid>
                    <button>SALVAR</button>
                </Grid>
            </form>

        </Container>
    )
}