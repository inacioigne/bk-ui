import {
  Container,
  Box,
  Divider,
  Typography,
  Grid,
  FormControl,
  Paper,
  TextField,
  Button,
} from "@mui/material";

import FormElementList from "@/components/madsrdf/forms/formElementList";

// React-Hook-Form
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema
import { MadsSchema } from "@/schema/authority/madsSchema";
import { schemaMads } from "@/schema/authority";

type SchemaCreateAuthority = z.infer<typeof MadsSchema>;

interface Props {
  hit: schemaMads;
  setForm: Function;
}

function GetValue(hit: any) {
    
    let elementList = hit.elementList[0]   

    const obj: any = {
        elementList: [{
            type: elementList.type, elementValue: {
                value: elementList.elementValue.value,
                lang: elementList.elementValue.lang
            }
        }],
        // identifiersLccn: doc.identifiersLccn && doc.identifiersLccn,
        // fullerName: doc.fullerName && doc.fullerName[0],
        // birthPlace: doc.birthPlace && doc.birthPlace[0],
        // birthDayDate: doc.birthDayDate,
        // birthMonthDate: doc.birthMonthDate,
        // birthYearDate: doc.birthYearDate,
        // deathPlace: doc.deathPlace && doc.deathPlace[0],
        // deathDayDate: doc.deathDayDate,
        // deathMonthDate: doc.deathMonthDate,
        // deathYearDate: doc.deathYearDate,
        // hasVariant: ParserVariant(doc.variant),
        // hasAffiliation: ParserAffiliation(doc.hasAffiliation),
        // hasCloseExternalAuthority: ParserUri(doc.hasCloseExternalAuthority),
        // identifiesRWO: ParserUri(doc.identifiesRWO),
        // occupation: ParserUri(doc.occupation),
        // fieldOfActivity: ParserUri(doc.fieldOfActivity),
        // imagem: doc.imagem
    }
    console.log("loc", elementList);
    return obj
}

export default function FormLoc({ hit, setForm }: Props) {

    let defaultValues = GetValue(hit)
  
//   const defaultValues = {
//     elementList: [
//       {
//         type: "FullNameElement",
//         elementValue: {
//           value: "",
//           lang: null,
//         },
//       },
//     ],
//   };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<SchemaCreateAuthority>({
    resolver: zodResolver(MadsSchema),
    defaultValues,
  });
  // console.log(errors)

  return (
    <Box sx={{ width: "100%" }}>
      <form>
        <Paper sx={{ p: "15px", ml: "20px", mt: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Autoridade
              </Typography>
            </Grid>
            <FormElementList
              control={control}
              register={register}
              error={errors.elementList}
            />
          </Grid>
        </Paper>
      </form>
    </Box>
  );
}
