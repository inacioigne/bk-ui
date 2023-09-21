"use client"
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
    InputLabel
} from "@mui/material";

// BiblioKeia Components
import BreadcrumbsBK from "src/components/nav/breadcrumbs";

// React Icons
import { FcHome, FcCalendar } from "react-icons/fc";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { IoIosSave } from "react-icons/io";

// React-Hook-Form
import {
    useForm,
    useFieldArray,
    Controller,
    SubmitHandler,
} from "react-hook-form";

// Schema
import { createAuthoritySchema } from "@/schema/authority/personalName"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

// BiblioKeia Services
import { solr } from "@/services/solr";

import { PersonalNameDoc } from "@/schema/authority/solr"


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
    }
];

type CreateAuthorityData = z.infer<typeof createAuthoritySchema>;

export default function Edit(
    { params }: { params: { id: string } }
) {

    const [doc, setDoc] = useState<PersonalNameDoc|null>(null)

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<CreateAuthorityData>({
        resolver: zodResolver(createAuthoritySchema),
        defaultValues: {
            fullNameElement: "",
            hasVariant: [{ fullNameElement: "", dateNameElement: "" }],
            hasExactExternalAuthority: [{ value: "", label: "", base: "" }]
        },
    });

    useEffect(() => {
        solr.get(`authority/select?fl=*,[child]&q=id:${params.id}`)
      .then(function (response) {
        const [doc] = response.data.response.docs
        setDoc(doc)
        setValue("fullNameElement", doc.authority)
        console.log(doc)
      })
      .catch(function (error) {
        // manipula erros da requisição
        console.error(error);
      })
      .finally(function () {
        // setProgress(false)
      });

    }, [] )

    function editAuthority(data: any) {
        console.log(data)

    }
    return (
        <Container maxWidth="xl">
            <Box my={"1rem"}>
                <BreadcrumbsBK previousPaths={previousPaths} currentPath={`edit/${params.id}`} />
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
                <Paper sx={{ p: '15px', mt: "10px" }}>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Autoridade
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                        <InputLabel id="demo-simple-select-label">Nome Autorizado</InputLabel>
                            <TextField
                                fullWidth
                                size="small"
                                // labelId="demo-simple-select-label"
                                // label="Nome Autorizado"
                                variant="outlined"
                                // defaultValue={doc?.authority}
                                {...register("fullNameElement")}
                            />
                            {errors.fullNameElement && (
                                <Typography variant="caption" display="block" gutterBottom color={'red'}>
                                    {errors.fullNameElement.message}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>

                </Paper>
            </form>

        </Container>
    )
}
