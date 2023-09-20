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
    MenuItem
} from "@mui/material";

// BiblioKeia Components
import BreadcrumbsBK from "src/components/nav/breadcrumbs";

// BiblioKeia Services
import { bkapi } from "@/services/api";

// React Hooks
import { useEffect, useState, Fragment } from "react";

// Nextjs
import { useRouter } from 'next/navigation'

// MUI Icons
import { FcHome } from "react-icons/fc";
import { BsPersonPlus } from "react-icons/bs";
// import { GrAdd } from "react-icons/gr";
import { IoIosSave } from "react-icons/io";
import { IoRemove, IoAddOutline } from "react-icons/io5";

// Types
import { PersonalName } from "@/schema/authority/personalName"



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
    fullNameElement: z.string().nonempty("Nome é obrigatório"),
    fullerName: z.string(),
    birthPlace: z.string(),
    birthDayDate: z.string(),
    birthMonthDate: z.string(),
    birthYearDate: z.string(),
    deathPlace: z.string(),
    deathDayDate: z.string(),
    deathMonthDate: z.string(),
    deathYearDate: z.string(),
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

function transformDate(day: string, month: string, year: string) {
    const birthDayDate = day !== '' ? day.padStart(2, '0') : false
    const birthMonthDate = month !== '' ? month : false
    const birthYearDate = year !== '' ? year : false
    if (birthYearDate && birthMonthDate && birthDayDate) {
        const dateNameElement = `${birthDayDate}-${birthMonthDate}-${birthYearDate}`
        return dateNameElement
    }
    if (birthYearDate && birthMonthDate) {
        const dateNameElement = `${birthMonthDate}-${birthYearDate}`
        return dateNameElement
    }
    if (birthYearDate) {
        return birthYearDate
    } else {
        return false
    }

}

function transformAuthority(data: CreateAuthorityData, id: number | null) {

    const today = Today();
    const elementList: any = [
        {
            type: "FullNameElement",
            elementValue: {
                value: data.fullNameElement,
            },
        },
    ];

    const date = (data.birthYearDate !== '' || data.deathYearDate !== '') ? `${data?.birthYearDate} - ${data?.deathYearDate}` : false

    if (date) {
        elementList.push({
            type: "DateNameElement",
            elementValue: {
                value: date,
            },
        });
    }

    const personalName: PersonalName = {
        type: "PersonalName",
        identifiersLocal: id,
        adminMetadata: {
            creationDate: today,
        },
        authoritativeLabel: date ? `${data.fullNameElement}, ${date}` : data.fullNameElement,
        elementList: elementList,
        // hasVariant: hasVariant,
        isMemberOfMADSCollection: "https://bibliokeia.com/authorities/PersonalName/",
    };
    data.fullerName && (personalName['fullerName'] = {
        type: "PersonalName",
        elementValue: {
            value: data.fullerName,
        }
    }
    )
    const birthDate = transformDate(data.birthDayDate, data.birthMonthDate, data.birthYearDate)
    birthDate && (personalName['birthDate'] = birthDate)
    data.birthPlace && (personalName['birthPlace'] = data.birthPlace)

    data.deathPlace && (personalName['deathPlace'] = data.deathPlace)
    const deathDate = transformDate(data.deathDayDate, data.deathMonthDate, data.deathYearDate)
    deathDate && (personalName['deathDate'] = deathDate)

    if (data.variants.length > 0) {
        const hasVariant = Variants(data.variants);
        personalName['hasVariant'] = hasVariant
    }

    return personalName

}

const meses = [
    {
        value: '01',
        label: 'Jan.'
    },
    {
        value: '02',
        label: 'Fev.'
    }
]

export default function Create() {
    const [id, setId] = useState(null);
    const router = useRouter()

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateAuthorityData>({
        resolver: zodResolver(createAuthoritySchema),
        defaultValues: {
            variants: [{ fullNameElement: "", dateNameElement: "" }],
            birthMonthDate: ''

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
        append({
            fullNameElement: "",
            dateNameElement: "",
        });
    };

    function createAuthority(data: any) {

        const personalName = transformAuthority(data, id)
        console.log(personalName);

        bkapi
            .post("http://localhost:8000/authorities/agents/", personalName, {
                headers: headers,
            })
            .then(function (response) {

                if (response.status === 201) {
                    console.log(response);
                    // setMessage("Registro excluido com sucesso!")
                    router.push(`/admin/authority/${id}`)
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

    // console.log(errors)

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
                <Paper sx={{ p: '15px', mt: "10px" }}>
                    <Grid container spacing={2} >
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
                                <Typography variant="caption" display="block" gutterBottom color={'red'}>
                                    {errors.fullNameElement.message}
                                </Typography>

                            )}
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Nome completo"
                                variant="outlined"
                                {...register("fullerName")}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                Nascimento:
                            </Typography>
                            <Box sx={{ display: 'flex', gap: '10px' }}>
                                <TextField
                                    label="Local de Nascimento"
                                    variant="outlined"
                                    {...register("birthPlace")}
                                />
                                <TextField
                                    label="Dia"
                                    variant="outlined"
                                    sx={{ width: 100 }}
                                    {...register("birthDayDate")}
                                />
                                <Controller
                                    name="birthMonthDate"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <FormControl
                                            sx={{ minWidth: 100 }}
                                        >
                                            <InputLabel id="demo-simple-select-label">Mês</InputLabel>
                                            <Select {...field}
                                                labelId="demo-simple-select-label"
                                                label="Mês"
                                            >
                                                {meses.map((mes, index) => (
                                                    <MenuItem key={index} value={mes.value}>{mes.label}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                                <TextField
                                    label="Ano"
                                    variant="outlined"
                                    sx={{ width: 100 }}
                                    {...register("birthYearDate")}
                                />


                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                Falecimento:
                            </Typography>
                            <Box sx={{ display: 'flex', gap: '10px' }}>
                                <TextField
                                    label="Local de Falecimento"
                                    variant="outlined"
                                    {...register("deathPlace")}
                                />
                                <TextField
                                    label="Dia"
                                    variant="outlined"
                                    sx={{ width: 100 }}
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
                                        >
                                            <InputLabel id="demo-simple-select-label">Mês</InputLabel>
                                            <Select {...field}
                                                labelId="demo-simple-select-label"
                                                label="Mês"
                                            >
                                                {meses.map((mes, index) => (
                                                    <MenuItem key={index} value={mes.value}>{mes.label}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                                <TextField
                                    label="Ano"
                                    variant="outlined"
                                    sx={{ width: 100 }}
                                    {...register("deathYearDate")}
                                />

                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Variantes
                            </Typography>
                        </Grid>
                        {fields.map((field, index) => (
                            <Fragment key={index}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Nome"
                                        variant="outlined"
                                        {...register(`variants.${index}.fullNameElement`)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <TextField
                                            label="Data Associada ao Nome"
                                            variant="outlined"
                                            {...register(`variants.${index}.dateNameElement`)}
                                        />
                                        <IconButton aria-label="add" onClick={addVariant} color="primary">
                                            <IoAddOutline />
                                        </IconButton>
                                        <IconButton aria-label="add" onClick={() =>{
                                            remove(index)}} color="primary">
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
