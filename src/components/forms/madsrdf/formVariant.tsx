// MUI
import { Box, Grid, TextField, IconButton } from "@mui/material";

// React-Hook-Form
import { useFieldArray } from "react-hook-form";

// React
import { Fragment } from "react";

// React Icons
import { IoRemove, IoAddOutline } from "react-icons/io5";

interface Props {
  control: any;
  register: any;
}

interface PropsElementList {
  nestIndex: number;
  control: any;
  register: any;
}

function ElementList({ nestIndex, control, register }: PropsElementList) {
  const {
    fields: fieldsElementList,
    append: appendElementList,
    remove: removeElementList,
  } = useFieldArray({
    control,
    name: `hasVariant.${nestIndex}.elementList`,
  });

  const addElement = () => {
    appendElementList({
      type: "",
      //   elementList: {type: "FullNameElement", elementValue: {value: ""}}
    });
  };
  return (
    <div>
      {fieldsElementList.map((field, index) => (
        <Box key={field.id} sx={{display: 'flex'}}>
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
              disabled={true}
              //   defaultValue={"FullNameElement"}
              label="Nome"
              variant="outlined"
              size="small"
              {...register(
                `hasVariant.${nestIndex}.elementList.${index}.elementValue.value`
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* <IconButton aria-label="add" onClick={addElement} color="primary">
                <IoAddOutline />
              </IconButton> */}
              <IconButton
                aria-label="add"
                onClick={() => {
                  //   removeVariant(index);
                }}
                color="primary"
              >
                <IoRemove />
              </IconButton>
            </Box>
          </Grid>
        </Box>
      ))}
      <IconButton aria-label="add" onClick={addElement} color="primary">
        <IoAddOutline />
      </IconButton>
    </div>
  );
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
      type: "PersonalName",
      elementList: { type: "FullNameElement", elementValue: { value: "" } },
    });
  };
  return (
    <>
      {fieldsVariant.map((field, index) => (
        <Fragment key={index}>
          <Grid item xs={10}>
            <TextField
              fullWidth
              disabled={true}
              label="Tipo de Variante"
              variant="outlined"
              size="small"
              {...register(`hasVariant.${index}.type`)}
            />
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
            <ElementList
              control={control}
              register={register}
              nestIndex={index}
            />
          </Grid>

          {/* <Grid item xs={2}>
            <TextField
              fullWidth
              disabled={true}
              defaultValue={"FullNameElement"}
              label="Tipo do Nome"
              variant="outlined"
              size="small"
              {...register(`hasVariant.${index}.elementList.${index}.type`)}
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              fullWidth
              //   disabled={true}
              label="Nome"
              variant="outlined"
              size="small"
              {...register(
                `hasVariant.${index}.elementList.${index}.elementValue.value`
              )}
            />
          </Grid> */}
        </Fragment>
      ))}
    </>
  );
}
