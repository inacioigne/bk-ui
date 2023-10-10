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
import { MadsSchema } from "@/schema/authority/madsSchema"

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
import FormElementList from "@/components/madsrdf/forms/formElementList"
import FormAffiliation from "@/components/madsrdf/forms/formAffiliation"
import FormVariant from "@/components/forms/madsrdf/formVariant"
import FormHCEA from "@/components/madsrdf/forms/formHCEA"
import FormRWO from "@/components/madsrdf/forms/formRWO"
import FormOccupation from "@/components/madsrdf/forms/formOccupation"
import FormFieldOfActivity from "@/components/madsrdf/forms/formFieldOfActivity"
import FormFullerName from "@/components/madsrdf/forms/formFullerName"
import FormBirth from "@/components/madsrdf/forms/birth"
import FormDeath from "@/components/madsrdf/forms/death"
import FormHasVariant from "@/components/madsrdf/forms/formHasVariant"

interface Props {
    doc: schemaAuthorityDoc;
}

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

// interface affialiationType {
//     organization: organizationType;
//     affiliationStart?: string;
//     affiliationEnd?: string;
// }

// interface DocType {
//     authority: string;
//     fullerName?: string;
//     birthPlace?: string;
//     birthDayDate: string;
//     birthMonthDate: string;
//     birthYearDate: string;
//     deathPlace: string;
//     deathDayDate: string;
//     deathMonthDate: string;
//     deathYearDate: string;
//     variant: variantType[]
//     hasAffiliation: affialiationType[]
// }

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
        let arr = [{ label: "", uri: "", base: "" }]
        return arr
    }
}

function ParserAffiliation(affiliation: any) {
    if (affiliation) {
        if (Array.isArray(affiliation)) {
            let arr = affiliation.map((hasAffiliation: any) => {
                let obj = {
                    organization: { label: hasAffiliation.organization[0], uri: hasAffiliation.uri },
                    affiliationStart: hasAffiliation.affiliationStart, affiliationEnd: hasAffiliation.affiliationEnd
                }
                return obj
            })
            return arr
        } else {
            let obj = {
                organization: { label: affiliation.organization[0], uri: affiliation.uri },
                affiliationStart: affiliation.affiliationStart, affiliationEnd: affiliation.affiliationEnd
            }
            return [obj]
        }
    } else {
        let arr = [{
            organization: { label: "", uri: "" },
            affiliationStart: "", affiliationEnd: ""
        }]
        return arr
    }
}

function ParserVariant(variant: any) {
    if (variant) {

        let arr = variant.map((e: string) => {
            let obj = {
                type: "PersonalName",
                elementList: [{ type: "FullNameElement", elementValue: { value: e } }],
            }
            return obj
        })
        return arr
    } else {
        let arr = [{
            type: "PersonalName",
            elementList: [{ type: "FullNameElement", elementValue: { value: "" } }],
        }]
        return arr
    }

}

function TransForm(doc: schemaAuthorityDoc) {
    // let rwo = ParserUri(doc.identifiesRWO)
    // console.log("rwo: ", doc.identifiesRWO)

    const obj: any = {
        elementList: [{
            type: 'FullNameElement', elementValue: {
                value: doc.authority[0],
            }
        }],
        identifiersLccn: doc.identifiersLccn && doc.identifiersLccn,
        fullerName: doc.fullerName && doc.fullerName[0],
        birthPlace: doc.birthPlace && doc.birthPlace[0],
        birthDayDate: doc.birthDayDate,
        birthMonthDate: doc.birthMonthDate,
        birthYearDate: doc.birthYearDate,
        deathPlace: doc.deathPlace && doc.deathPlace[0],
        deathDayDate: doc.deathDayDate,
        deathMonthDate: doc.deathMonthDate,
        deathYearDate: doc.deathYearDate,
        hasVariant: ParserVariant(doc.variant),
        hasAffiliation: ParserAffiliation(doc.hasAffiliation),
        hasCloseExternalAuthority: ParserUri(doc.hasCloseExternalAuthority),
        identifiesRWO: ParserUri(doc.identifiesRWO),
        occupation: ParserUri(doc.occupation),
        fieldOfActivity: ParserUri(doc.fieldOfActivity),
        imagem: doc.imagem
    }
    return obj
}

// Providers BiblioKeia
import { useProgress } from "src/providers/progress";
import { useAlert } from "src/providers/alert";

// Nextjs
import { useRouter } from "next/navigation";

// Services BiblioKeia
import { ParserData } from "src/services/thesarus/parserData"

export default function EditAuthority({ doc }: Props) {

    const router = useRouter();
    const { setProgress } = useProgress();

    const { setMessage } = useAlert();

    const defaultValues = TransForm(doc)

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues
    } = useForm<EditAuthorityData>({
        resolver: zodResolver(MadsSchema),
        defaultValues
    });
    // console.log(errors)


    function editAuthority(data: any) {
        setProgress(true)
        const headers = {
            accept: "application/json",
            "Content-Type": "application/json",
        };

        let obj = {
            type: doc.type,

            identifiersLocal: doc.id,
            adminMetadata: {
                //   "assigner": "http://id.loc.gov/vocabulary/organizations/brmninpa",
                //   "descriptionModifier": "http://id.loc.gov/vocabulary/organizations/brmninpa",
                //   "changeDate": "2023-10-04",
                creationDate: doc.creationDate,
                //   "descriptionLanguage": "http://id.loc.gov/vocabulary/languages/por",
                //   "generationProcess": "BiblioKeia v.1",
                //   "generationDate": "2023-10-04T08:13:08",
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
        // console.log(request)

        bkapi.put("thesarus/edit/", request, {
            headers: headers,
        })
            .then(function (response) {
                // console.log(response);
                if (response.status === 200) {
                    console.log(response);
                    setMessage("Registro criado com sucesso!")
                    router.push(`/admin/authority/${doc.id}`);
                }
            })
            .catch(function (error) {
                console.error(error);
            })
            .finally(function () {
                setProgress(false)
                //   setOpenSnack(true)
                //   setDoc(null)
            });
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
                    <FormElementList control={control} register={register} error={errors.elementList} />
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
                    {/* hasVariant */}
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
    )
}