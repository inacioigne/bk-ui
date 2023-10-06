// MUI
import {
    Box,
    Grid,
    TextField,
    IconButton
} from "@mui/material";

// React-Hook-Form
import { useFieldArray } from "react-hook-form";

// React
import { Fragment } from "react";

// React Icons
import { IoRemove, IoAddOutline } from "react-icons/io5";

interface Props {
    control: any;
    register: any
}

export default function FormVariant({ control, register }: Props) {
    const {
        fields: fieldsVariant,
        append: appendVariant,
        remove: removeVariant,
    } = useFieldArray({
        control,
        name: "hasVariant", 
    });

    const addVariant = () => {
        appendVariant({
            fullNameElement: "",
            //   dateNameElement: "",
        });
    };
    return (
        <>
            {fieldsVariant.map((field, index) => (
                <Fragment key={index}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Nome"
                            variant="outlined"
                            size="small"
                            {...register(`hasVariant.${index}.fullNameElement`)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>

                            <IconButton
                                aria-label="add"
                                onClick={addVariant}
                                color="primary"
                            >
                                <IoAddOutline />
                            </IconButton>
                            <IconButton
                                aria-label="add"
                                onClick={() => {
                                    removeVariant(index);
                                }}
                                color="primary"
                            >
                                <IoRemove />
                            </IconButton>
                        </Box>
                    </Grid>
                </Fragment>
            ))}
        </>
    )

}