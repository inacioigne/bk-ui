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
// MUI Icons
import { FcHome } from "react-icons/fc";
import { BsPersonPlus } from "react-icons/bs";
import { IoIosSave } from "react-icons/io";

// BiblioKeia Components
import BreadcrumbsBK from "src/components/nav/breadcrumbs";
import FormElementList from "@/components/madsrdf/forms/formElementList"
import FormFullerName from "@/components/madsrdf/forms/formFullerName"
import FormAffiliation from "@/components/madsrdf/forms/formAffiliation"
import FormVariant from "@/components/forms/madsrdf/formVariant"
import FormHasVariant from "@/components/madsrdf/forms/formHasVariant"
import FormBirth from "@/components/madsrdf/forms/birth"
import FormDeath from "@/components/madsrdf/forms/death"
import FormOccupation from "@/components/madsrdf/forms/formOccupation"
import FormFieldOfActivity from "@/components/madsrdf/forms/formFieldOfActivity"
import FormHCEA from "@/components/madsrdf/forms/formHCEA"
import FormRWO from "@/components/madsrdf/forms/formRWO"


// React Hooks
import { useEffect, useState } from "react";

// BiblioKeia Services
import { bkapi } from "@/services/api";
import { ParserData } from "src/services/thesarus/parserData"

// React-Hook-Form
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema
import { MadsSchema } from "@/schema/authority/madsSchema"

// Share
import months from "@/share/months.json" assert { type: "json" };

// Providers BiblioKeia
import { useProgress } from "src/providers/progress";
import { useAlert } from "src/providers/alert";

// Nextjs
import { useRouter } from "next/navigation";


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

const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
};


type SchemaCreateAuthority = z.infer<typeof MadsSchema>;

const defaultValues = {
    elementList: [{
        type: 'FullNameElement', elementValue: {
            value: "",
            lang: null
        }
    }],
    hasVariant: [{
        type: "PersonalName",
        elementList: [{ type: "FullNameElement", elementValue: { value: "" } }],
    }],
    identifiesRWO: [{
        uri: null, label: "", base: null
    }],
    hasAffiliation: [{
        organization: { label: "", uri: null },
        affiliationStart: null,
        affiliationEnd: null
    }],
    occupation: [{
        uri: null, label: "", base: null
    }],
    fieldOfActivity: [{
        uri: null, label: "", base: null
    }],
    hasCloseExternalAuthority: [{
        uri: null, label: "", base: null
    }]
}



export default function CreatePersonalName() {
    const router = useRouter();
    const {
        openSnack,
        setOpenSnack,
        message,
        setMessage,
        typeAlert,
        setTypeAlert,
      } = useAlert();
    const [id, setId] = useState(null);
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

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues
    } = useForm<SchemaCreateAuthority>({
        resolver: zodResolver(MadsSchema),
        defaultValues
    });
    // console.log(errors)

    function createAuthority(data: any) {


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

        let formData = ParserData(data)

        const request = { ...obj, ...formData };
        console.log(request)


        bkapi
            .post("/thesarus/create", request, {
                headers: headers,
            })
            .then(function (response) {
                if (response.status === 201) {
                    console.log(response);
                      setMessage("Registro criado com sucesso!")
                      router.push(`/admin/authority/${response.data.id}`);
                }
            })
            .catch(function (error) {
                console.error(error);
            })
            .finally(function () {
                // setProgress(false)
                // setOpenSnack(true)
                //   setDoc(null)
            });
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
                        {/* FullerName */}
                        <Grid item xs={5}>
                            <FormFullerName register={register} />
                        </Grid>
                        {/* Nascimento */}
                        <FormBirth {...{ control, register }} />
                        {/* Falecimento */}
                        <FormDeath  {...{ control, register }} />
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Variantes do nome
                            </Typography>
                            <Divider />
                        </Grid>
                        <FormHasVariant
                            {...{ control, register, defaultValues, getValues, setValue, errors }}
                        />
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Identificadores
                            </Typography>
                            <Divider />
                        </Grid>
                        <FormRWO control={control} register={register} />
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Afiliação
                            </Typography>
                            <Divider />
                        </Grid>
                        <FormAffiliation  {...{ control, register }} />
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Ocupações
                            </Typography>
                            <Divider />
                        </Grid>
                        <FormOccupation {...{ control, register }} />
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Campos de atividade
                            </Typography>
                            <Divider />
                        </Grid>
                        <FormFieldOfActivity {...{ control, register }} />
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Ocorrências em outra bases
                            </Typography>
                            <Divider />
                        </Grid>
                        <FormHCEA {...{ control, register }} />
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
    )
}