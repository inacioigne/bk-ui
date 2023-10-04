"use client";
// MUI
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

// Schema
import { schemaAuthorityDoc } from "@/schema/solr";

// Share
import months from "@/share/months.json" assert { type: "json" };

// Next
import Link from "next/link";

// React Icons
import { IoIosSave } from "react-icons/io";
import { FcCancel } from "react-icons/fc";
// import { IoRemove, IoAddOutline } from "react-icons/io5";

// BiblioKeia Services
import { bkapi } from "@/services/api";

// import { useEffect, useState, Fragment, useMemo } from "react";

// React-Hook-Form
import {
    useForm,
    useFieldArray,
    Controller,
    SubmitHandler,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// BiblioKea Components
import FormElementList from "@/components/forms/madsrdf/formElementList"
import FormAffiliation from "@/components/forms/madsrdf/formAffiliation"
import FormVariant from "@/components/forms/madsrdf/formVariant"
import FormHCEA from "@/components/forms/madsrdf/formHCEA"
import FormRWO from "@/components/forms/madsrdf/formRWO"
import FormOccupation from "@/components/forms/madsrdf/formOccupation"
import FormFieldOfActivity from "@/components/forms/madsrdf/formFieldOfActivity"



interface Props {
    doc: schemaAuthorityDoc;
}

export const MadsSchema = z.object({
    authority: z.string().nonempty("Nome é obrigatório"),
    elementList: z.array(
        z.object({ type: z.string(),
            elementValue: z.object({ value: z.string(), lang: z.string()})
    })),
    fullerName: z.string(),
    birthPlace: z.string(),
    birthDayDate: z.string(),
    birthMonthDate: z.string(),
    birthYearDate: z.string(),
    deathPlace: z.string(),
    deathDayDate: z.string(),
    deathMonthDate: z.string(),
    deathYearDate: z.string(),
    variant: z.array(
        z.object({
            fullNameElement: z.string().nonempty("Nome é obrigatório"),
            // dateNameElement: z.string(),
        })
    ),
    hasAffiliation: z.array(
        z.object({
            organization: z.object({ label: z.string(), uri: z.string() }),
            affiliationStart: z.string(),
            affiliationEnd: z.string(),
        })
    ),
    hasCloseExternalAuthority: z.array(
        z.object({
            uri: z.string(),
            label: z.string(),
            base: z.string()
        })
    ),
    identifiesRWO: z.array(
        z.object({
            uri: z.string(),
            label: z.string(),
            base: z.string()
        })
    ),
    occupation: z.array(
        z.object({
            uri: z.string(),
            label: z.string(),
            base: z.string()
        })
    ),
    fieldOfActivity: z.array(
        z.object({
            uri: z.string(),
            label: z.string(),
            base: z.string()
        })
    ),
    imagem: z.string()
});

type EditAuthorityData = z.infer<typeof MadsSchema>;

interface variantType {
    fullNameElement: string;
    dateNameElement?: string
}

interface organizationType {
    label: string;
    uri?: string;
    //base?: string;
}

interface affialiationType {
    organization: organizationType;
    affiliationStart?: string;
    affiliationEnd?: string;
}

interface DocType {
    authority: string;
    fullerName?: string;
    birthPlace?: string;
    birthDayDate: string;
    birthMonthDate: string;
    birthYearDate: string;
    deathPlace: string;
    deathDayDate: string;
    deathMonthDate: string;
    deathYearDate: string;
    variant: variantType[]
    hasAffiliation: affialiationType[]
}
function ParserUri(uri: any) {
    if (uri) {
        if (Array.isArray(uri)) {
            let arr = uri.map((e: any) => {
                let obj = { uri: e.uri, label: e.label[0], base: e.base }
                return obj
            })
            return arr
        } else {
            let arr = [{ label: uri.label[0], uri: uri.uri, base: uri.base }]
            return arr
        }
    } else {
        return null
    }
}

function TransForm(doc: any) {
    const obj = {
        elementList: [ {type: 'FullNameElement',  elementValue: {value: doc.authority[0], lang: ""}} ],
        fullerName: doc.fullerName && doc.fullerName[0],
        birthPlace: doc.birthPlace && doc.birthPlace[0],
        birthDayDate: doc.birthDayDate,
        birthMonthDate: doc.birthMonthDate,
        birthYearDate: doc.birthYearDate,
        deathPlace: doc.deathPlace,
        deathDayDate: doc.deathDayDate,
        deathMonthDate: doc.deathMonthDate,
        deathYearDate: doc.deathYearDate,
        variant: doc.variant && doc.variant.map((variant: string) => {
            let obj = { fullNameElement: variant, dateNameElement: "" }
            return obj
        }),
        hasAffiliation: doc.hasAffiliation && doc.hasAffiliation.map((hasAffiliation: any) => {
            let obj = {
                organization: { label: hasAffiliation.organization[0], uri: hasAffiliation.uri },
                affiliationStart: hasAffiliation.affiliationStart, affiliationEnd: hasAffiliation.affiliationEnd
            }
            return obj
        }),
        hasCloseExternalAuthority: doc.hasCloseExternalAuthority && doc.hasCloseExternalAuthority.map((e: any) => {
            let obj = { uri: e.uri, label: e.label[0], base: e.base }
            return obj
        }),
        identifiesRWO: ParserUri(doc.identifiesRWO),
        occupation: ParserUri(doc.occupation),
        fieldOfActivity: ParserUri(doc.fieldOfActivity),

    }

    return obj

}

export default function EditAuthority({ doc }: Props) {

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<EditAuthorityData>({
        resolver: zodResolver(MadsSchema),
        defaultValues: TransForm(doc),
    });
    console.log(errors)


    function editAuthority(data: any) {
        const headers = {
            accept: "application/json",
            "Content-Type": "application/json",
        };
        console.log('edit:', data)

        // let obj = {
        //     type: doc.type,
        //     identifiersLccn: doc.identifiersLccn,
        //     identifiersLocal: doc.id,
        //     adminMetadata: {
        //         //   "assigner": "http://id.loc.gov/vocabulary/organizations/brmninpa",
        //         //   "descriptionModifier": "http://id.loc.gov/vocabulary/organizations/brmninpa",
        //         //   "changeDate": "2023-10-04",
        //         creationDate: doc.creationDate,
        //         //   "descriptionLanguage": "http://id.loc.gov/vocabulary/languages/por",
        //         //   "generationProcess": "BiblioKeia v.1",
        //         //   "generationDate": "2023-10-04T08:13:08",
        //         status: {
        //             label: "novo",
        //             value: "n"
        //         },
        //     },
        //     authoritativeLabel: data.birthYearDate ?  `${data.authority}, ${data.birthYearDate}` : data.authority,
        //     elementList: [
        //       {
        //         type: "FullNameElement",
        //         elementValue: {
        //             value: data.authority,
        //         }
        //       }
        //     ],
        //     // "fullerName": {
        //     //   "type": "string",
        //     //   "elementValue": {
        //     //     "value": "string",
        //     //     "lang": "string"
        //     //   }
        //     // },
        //     // "hasVariant": [
        //     //   {
        //     //     "type": "string",
        //     //     "elementList": [
        //     //       {
        //     //         "type": "string",
        //     //         "elementValue": {
        //     //           "value": "string",
        //     //           "lang": "string"
        //     //         }
        //     //       }
        //     //     ],
        //     //     "variantLabel": "string"
        //     //   }
        //     // ],
        //     // "identifiesRWO": [
        //     //   "string"
        //     // ],
        //     // "birthPlace": "string",
        //     // "birthDate": "string",
        //     // "birthDayDate": "string",
        //     // "birthMonthDate": "string",
        //     // "birthYearDate": "string",
        //     // "hasAffiliation": [
        //     //   {
        //     //     "organization": {
        //     //       "uri": "string",
        //     //       "label": "string",
        //     //       "base": "string"
        //     //     },
        //     //     "affiliationStart": "string",
        //     //     "affiliationEnd": "string"
        //     //   }
        //     // ],
        //     // "fieldOfActivity": [
        //     //   {
        //     //     "uri": "string",
        //     //     "label": "string",
        //     //     "base": "string"
        //     //   }
        //     // ],
        //     // "deathPlace": "string",
        //     // "deathDate": "string",
        //     // "deathDayDate": "string",
        //     // "deathMonthDate": "string",
        //     // "deathYearDate": "string",
        //     // "occupation": [
        //     //   {
        //     //     "uri": "string",
        //     //     "label": "string",
        //     //     "base": "string"
        //     //   }
        //     // ],
        //     // "hasCloseExternalAuthority": [
        //     //   {
        //     //     "uri": "string",
        //     //     "label": "string",
        //     //     "base": "string"
        //     //   }
        //     // ],
        //     // "hasExactExternalAuthority": [
        //     //   {
        //     //     "uri": "string",
        //     //     "label": "string",
        //     //     "base": "string"
        //     //   }
        //     // ],
        //     // "imagem": "string"
        // }

        // const request = { ...obj, ...data };
        // bkapi.put("thesarus/edit/", request, {
        //     headers: headers,
        // })
        //     .then(function (response) {
        //         console.log(response);
        //         // if (response.status === 201) {
        //         //   // console.log(response);
        //         //   setMessage("Registro criado com sucesso!")
        //         //   router.push(`/admin/authority/${id}`);
        //         // }
        //     })
        //     .catch(function (error) {
        //         console.error(error);
        //     })
        //     .finally(function () {
        //         //   setProgress(false)
        //         //   setOpenSnack(true)
        //         //   setDoc(null)
        //     });
        // 
    }

    

return (
    <form onSubmit={handleSubmit(editAuthority)}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5" gutterBottom>
                Editar - Nome Pessoal
            </Typography>

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
        </Box>
        <Divider />
        <Paper sx={{ p: "15px", mt: "10px" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Autoridade
                    </Typography>
                </Grid>
                <FormElementList control={control} register={register}/>
                {/* <Grid item xs={6}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Nome Autorizado"
                        variant="outlined"
                        focused={true}
                        {...register("authority")}
                    />
                    {errors.authority && (
                        <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                            color={"red"}
                        >
                            {errors.authority.message}
                        </Typography>
                    )}
                </Grid> */}
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
                        // focused={true}
                        {...register("imagem")}
                    />
                </Grid>

            </Grid>
        </Paper>
    </form>
)
}