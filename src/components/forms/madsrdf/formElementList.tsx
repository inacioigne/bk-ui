// MUI
import {
    Box,
    Grid,
    TextField,
    IconButton
} from "@mui/material";

// React Icons
import { IoRemove, IoAddOutline } from "react-icons/io5";

interface Props {
    control: any;
    register: any
}

// React-Hook-Form
import { useFieldArray } from "react-hook-form";

// React
import { Fragment } from "react";

export default function FormElementList({ control, register }: Props) {

    const {
        fields: fieldsElementList,
        append: appendElementList,
        remove: removeElementList,
    } = useFieldArray({
        control,
        name: "elementList",
    });

    const addAffiliation = () => {
        appendElementList({
            organization: { label: "", uri: "" },
            affiliationStart: "",
            affiliationEnd: ""
        })
    };

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

                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Nome"
                            variant="outlined"
                            size="small"
                            {...register(`elementList.${index}.elementValue.value`)}
                        />
                    </Grid>

                    {/* <Grid item xs={2}>
                        <TextField
                            fullWidth
                            label="Início do vínculo"
                            variant="outlined"
                            size="small"
                            //sx={{ width: 100 }}
                            {...register(`hasAffiliation.${index}.affiliationStart`)}
                        />
                    </Grid> */}

                    {/* <Grid item xs={2}>
                        <TextField
                            fullWidth
                            label="Fim do vínculo"
                            variant="outlined"
                            size="small"
                            // sx={{ width: 100 }}
                            {...register(`hasAffiliation.${index}.affiliationEnd`)}
                        />
                    </Grid> */}

                    {/* <Grid item xs={2}>
                        <Box sx={{ display: "flex", alignItems: "flex-start" }}>

                            <IconButton
                                aria-label="add"
                                onClick={addAffiliation}
                                color="primary"
                            >
                                <IoAddOutline />
                            </IconButton>
                            <IconButton
                                aria-label="add"
                                onClick={() => {
                                    removehasAffiliation(index);
                                }}
                                color="primary"
                            >
                                <IoRemove />
                            </IconButton>
                        </Box>
                    </Grid> */}
                </Fragment>
            ))}
        </>
    )

}