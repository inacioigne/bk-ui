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

// Next
import Link from "next/link";

// React Icons
import { IoIosSave } from "react-icons/io";
import { FcCancel } from "react-icons/fc";
import { IoRemove, IoAddOutline } from "react-icons/io5";

// React-Hook-Form
import {
    useForm,
    useFieldArray,
    Controller,
    SubmitHandler,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
    doc: schemaAuthorityDoc;
}

export const MadsSchema = z.object({
    authority: z.string().nonempty("Nome é obrigatório"),
    fullerName: z.string(),
    // birthPlace: z.string(),
    // // birthDate: z.string(),
    // birthDayDate: z.string(),
    // birthMonthDate: z.string(),
    // birthYearDate: z.string(),
    // deathPlace: z.string(),
    // deathDayDate: z.string(),
    // deathMonthDate: z.string(),
    // deathYearDate: z.string(),
    // hasVariant: z.array(
    //     z.object({
    //         fullNameElement: z.string(),
    //         dateNameElement: z.string(),
    //     })
    // ),
    // hasAffiliation: z.array(
    //     z.object({
    //         organization: z.object({label: z.string(), uri: z.string(), base: z.string()}),
    //         affiliationStart: z.string(),
    //         affiliationEnd:  z.string(),
    //     })
    // ),
    // hasExactExternalAuthority: z.array(
    //     z.object({
    //         value: z.string(),
    //         label: z.string(),
    //         base: z.string()
    //     })
    // ),
    // hasCloseExternalAuthority: z.array(
    //     z.object({
    //         uri: z.string(),
    //         label: z.string(),
    //         base: z.string()
    //     })
    // ),
    // occupation: z.array(
    //     z.object({
    //         uri: z.string(),
    //         label: z.string(),
    //         base: z.string()
    //     })
    // ),
    // imagem: z.string()
    // fieldOfActivity: z.array(
    //     z.object({

    //     })
    // )

});

type EditAuthorityData = z.infer<typeof MadsSchema>;

export default function EditAuthority({ doc }: Props) {
    console.log(doc)

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<EditAuthorityData>({
        resolver: zodResolver(MadsSchema),
        defaultValues: doc,
    });

    // const {
    //     fields: fieldsVariant,
    //     append: appendVariant,
    //     remove: removeVariant,
    // } = useFieldArray({
    //     control,
    //     name: "elementList",
    // });

    function editAuthority(data: any) {
        console.log(data)
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
                    <Grid item xs={6}>
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
                    </Grid>
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
                </Grid>
            </Paper>
        </form>
    )
}