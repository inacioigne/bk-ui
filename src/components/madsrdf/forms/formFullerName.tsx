// MUI
import { TextField } from "@mui/material";

interface Props {
    register: any
}

export default function FormFullerName({ register }: Props) {
    return (
        <TextField
            fullWidth
            size="small"
            label="Nome completo"
            variant="outlined"
            {...register("fullerName")}
        />
    )
}