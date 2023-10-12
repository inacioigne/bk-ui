// MUI
import { Grid, TextField, Typography } from "@mui/material";

// React Icons
// import { IoRemove, IoAddOutline } from "react-icons/io5";

interface Props {
    control: any;
    register: any,
    error: any
    
}

// React-Hook-Form
import { useFieldArray } from "react-hook-form";

// React
import { Fragment } from "react";

export default function FormElementList({ control, register, error }: Props) {

    const {
        fields: fieldsElementList,
        append: appendElementList,
        remove: removeElementList,
    } = useFieldArray({
        control,
        name: "elementList",
    });

    return (
        <>
            {fieldsElementList.map((field, index) => (
                <Fragment key={index}>
                    <Grid item xs={2}>
                    <TextField
                            fullWidth
                            disabled={true}
                            label="Tipo"
                            variant="outlined"
                            size="small"
                            {...register(`elementList.${index}.type`)}
                        />
                        {error && (
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  color={"red"}
                >
                  {error[index].elementValue.value.message}
                </Typography>
              )}
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="Nome"
                            variant="outlined"
                            size="small"
                            {...register(`elementList.${index}.elementValue.value`)}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <TextField
                            fullWidth
                            label="Idioma"
                            variant="outlined"
                            size="small"
                            {...register(`elementList.${index}.elementValue.lang`)}
                        />
                    </Grid>
                </Fragment>
            ))}
        </>
    )

}