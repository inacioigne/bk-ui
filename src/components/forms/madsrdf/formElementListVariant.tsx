// MUI
import { Box, Grid, TextField, IconButton } from "@mui/material";

import { useFieldArray } from "react-hook-form";

interface Props {
    nestIndex: number;
    control: any;
    register: any;
}

export default function FormElementListVariant({ nestIndex, control, register }: Props) {

    const { fields, remove, append } = useFieldArray({
        control,
        name: `hasVariant.${nestIndex}.elementList`
    });

    return (
        <div>
            {fields.map((field, index) => (
                <Box key={field.id} sx={{ display: 'flex' }}>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            disabled={true}
                            //   defaultValue={"FullNameElement"}
                            label="Tipo do Nome"
                            variant="outlined"
                            size="small"
                            {...register(`hasVariant.${nestIndex}.elementList.${index}.type`)}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            fullWidth
                            // disabled={true}
                            //   defaultValue={"FullNameElement"}
                            label="Nome"
                            variant="outlined"
                            size="small"
                            {...register(
                                `hasVariant.${nestIndex}.elementList.${index}.elementValue.value`
                            )}
                        />
                    </Grid>
                </Box>
            ))}

        </div>
    )

}