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

import { useForm, useFieldArray, Controller, SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

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

const createAuthoritySchema = z.object({
    fullNameElement: z.string().nonempty("Nome obrigatório"),
    dateNameElement: z.string(),
    variants: z.array(z.object({
        variantLabel: z.string()
    }))

})
type CreateAuthorityData = z.infer<typeof createAuthoritySchema>

export default function Create() {

    const [id, setId] = useState(null)

    const { 
        control, 
        register, 
        handleSubmit, 
        formState: { errors} 
    } = useForm<CreateAuthorityData>({
        resolver: zodResolver(createAuthoritySchema)
    });
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, 
        name: "variants", 
    });

   

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

    }, [String(id)])

    const onSubmit: SubmitHandler<IFormInput> = (formData) => {
        const hoje = new Date();
        const dia = String(hoje.getDate()).padStart(2, '0'); // Dia com zero à esquerda se for necessário
        const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // Mês com zero à esquerda se for necessário (lembrando que janeiro é 0)
        const ano = hoje.getFullYear();
        const dataFormatada = `${ano}-${mes}-${dia}`;


        const headers = {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        };

        const data = {
            "type": "PersonalName",
            "identifiersLocal": id,
            "adminMetadata": {
                "creationDate": "2023-09-19"
            },
            "authoritativeLabel": "Machado",
            "elementList": [
                {
                    "type": "FullNameElement",
                    "elementValue": {
                        "value": "Machado de Assis"
                    }
                }
            ],
            "isMemberOfMADSCollection": "string"
        }

        bkapi.post(
            'http://localhost:8000/authorities/agents/', data,
            {
                headers: headers
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

    const addVariant = () => {
        append({
            'variantLabel': ''

        })
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
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" {...register("fullNameElement")} />
                        {errors.fullNameElement && <span>{errors.fullNameElement.message}</span>}
                        <button type="button" onClick={addVariant}>ADD</button>

                     
                        {fields.map((field, index) => (
                  
                            <input
                                key={field.id} 
                                {...register(`variants.${index}.variantLabel`)}
                            />
                        ))} 
                    </Grid>
                    <button>SALVAR</button>
                </Grid>
            </form>

        </Container>
    )
}