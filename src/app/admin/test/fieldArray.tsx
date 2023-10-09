"use client"
import { useFieldArray } from "react-hook-form";
import NestedArray from "./nestedFieldArray";

export default function Fields({ control, register, setValue, getValues }) {
    const { fields, append, remove, prepend } = useFieldArray({
        control,
        name: "test"
      });

    return (
        <>
        <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <input {...register(`test.${index}.name`)} />

              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
              <NestedArray nestIndex={index} {...{ control, register }} />
            </li>
          );
        })}

        </ul>
        </>
    )
}