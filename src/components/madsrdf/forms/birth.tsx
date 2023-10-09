"use client";
import {
    Box,
    Typography,
    Grid,
    FormControl,
    TextField,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";

// React-Hook-Form
import { Controller } from "react-hook-form";

// Share
import months from "@/share/months.json" assert { type: "json" };

interface Props {
    control: any;
    register: any
}

export default function FormBirth({ control, register }: Props) {
    return (
        <Grid item xs={6}>
            <Typography variant="subtitle1" gutterBottom>
                Nascimento:
            </Typography>
            <Box sx={{ display: "flex", gap: "10px" }}>
                <TextField
                    label="Local de Nascimento"
                    variant="outlined"
                    size="small"
                    // defaultValue={null}
                    {...register("birthPlace")}
                />
                <TextField
                    label="Dia"
                    variant="outlined"
                    size="small"
                    defaultValue={null}
                    sx={{ minWidth: 40, maxWidth: 50 }}
                    {...register("birthDayDate")}
                />
                <Controller
                    name="birthMonthDate"
                    control={control}
                    defaultValue={""}
                    // rules={{ required: true }}
                    render={({ field }) => (
                        <FormControl
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
                    {...register("birthYearDate")}
                />
            </Box>
        </Grid>

    )
}