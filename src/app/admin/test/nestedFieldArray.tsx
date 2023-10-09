"use client"
import { useFieldArray } from "react-hook-form";

export default ({ nestIndex, control, register }) => {
    const { fields, remove, append } = useFieldArray({
        control,
        name: `test.${nestIndex}.nestedArray`
      });

      return (
        <div>
            {fields.map((item, k) => {
        return (
          <div key={item.id} style={{ marginLeft: 20 }}>
            <label>Nested Array:</label>
            <input
              {...register(`test.${nestIndex}.nestedArray.${k}.field1`, {
                required: true
              })}
              style={{ marginRight: "25px" }}
            />

            <input {...register(`test.${nestIndex}.nestedArray.${k}.field2`)} />
            <button type="button" onClick={() => remove(k)}>
              Delete Nested
            </button>
          </div>
        );
      })}


        </div>

      )
}