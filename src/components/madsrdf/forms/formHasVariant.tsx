"use client"
// MUI
import { Box, Grid, TextField, IconButton } from "@mui/material";
import { useFieldArray } from "react-hook-form";
// import NestedArray from "@/app/admin/test/nestedFieldArray";
import FieldArray from "@/app/admin/test//fieldArray";
// React Icons
import { IoRemove, IoAddOutline } from "react-icons/io5";

import FormElementListVariant from "@/components/forms/madsrdf/formElementListVariant"
// React
import { Fragment } from "react";
interface Props {
    control: any;
    register: any;
    getValues: any;
    setValue: any;
}

export default function FormHasVariant({ control, register, setValue, getValues }: Props) {
    const { fields, append, remove, prepend } = useFieldArray({
        control,
        name: "hasVariant"
    });

    const addVariant = () => {
        setValue("hasVariant", [
            ...(getValues().hasVariant || []),
            {
                type: "PersonalName",
                elementList: [{ type: 'FullNameElement', elementValue: { value: "" } }]

            }
        ])
    };

    return (
        <>
            {fields.map((item, index) => {
                return (
                    <Fragment key={item.id}>
                        <Grid item xs={10}>
                            <TextField
                                fullWidth
                                disabled={true}
                                label="Tipo de Variante"
                                variant="outlined"
                                size="small"
                                {...register(`hasVariant.${index}.type`)}
                            />
                            {/* <input {...register(`hasVariant.${index}.type`)} /> */}

                            {/* <button type="button" onClick={() => remove(index)}>
                                Delete
                            </button> */}
                        </Grid>
                        <Grid item xs={2}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <IconButton aria-label="add" onClick={addVariant} color="primary">
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
                        <Grid item xs={12}>
                            <FormElementListVariant nestIndex={index} {...{ control, register }} />
                            
                        </Grid>
                    </Fragment>
                );
            })}
        </>
    )
}