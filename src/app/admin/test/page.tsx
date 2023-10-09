"use client"
import { useForm } from "react-hook-form";
import FieldArray from "./fieldArray";


const defaultValues = {
    test: [
        {
            name: "useFieldArray1",
            nestedArray: [{ field1: "field1", field2: "field2" }]
        },
        {
            name: "useFieldArray2",
            nestedArray: [{ field1: "field1", field2: "field2" }]
        }
    ]
};

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
    test: z.array(z.object(
        {
            name: z.string(),
            nestedArray: z.array(
                z.object(
                    { field1: z.string() }
                )
            )
        }
    ))

})

export default function TestPage() {
    const {
        control,
        register,
        handleSubmit,
        getValues,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues
    });
    const onSubmit = (data: any) => console.log("data", data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Array of Array Fields</h1>
            <FieldArray
                {...{ control, register, defaultValues, getValues, setValue, errors }}
            />
            <input type="submit" />

        </form>

    )
}