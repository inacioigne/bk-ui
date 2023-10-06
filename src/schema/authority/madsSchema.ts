import { z } from "zod";

export const MadsSchema = z.object({
    elementList: z.array(
        z.object({
            type: z.string(),
            elementValue: z.object({
                value: z.string().nonempty("Nome é obrigatório"), lang: z.string()
            })
        })),
    fullerName: z.string().nullable(),
    birthPlace: z.nullable(z.string()),
    birthDayDate: z.string().nullable(),
    birthMonthDate: z.string().nullable(),
    birthYearDate: z.string().nullable(),
    deathPlace: z.string().nullable(),
    deathDayDate: z.string().nullable(),
    deathMonthDate: z.string().nullable(),
    deathYearDate: z.string().nullable(),
    hasVariant: z.array(
        z.object({
            type: z.string(),
            elementList: z.array(z.object({type: z.string(), elementValue: z.object({value: z.string()})})),
            variantLabel: z.string()
        })
    ),
    hasAffiliation: z.array(
        z.object({
            organization: z.object({ label: z.string(), uri: z.string() }),
            affiliationStart: z.string(),
            affiliationEnd: z.string(),
        })
    ),
    hasCloseExternalAuthority: z.array(
        z.object({
            uri: z.string(),
            label: z.string(),
            base: z.string()
        })
    ),
    identifiesRWO: z.array(
        z.object({
            uri: z.string(),
            label: z.string(),
            base: z.string()
        })
    ),
    occupation: z.array(
        z.object({
            uri: z.string(),
            label: z.string(),
            base: z.string()
        })
    ),
    fieldOfActivity: z.array(
        z.object({
            uri: z.string(),
            label: z.string(),
            base: z.string()
        })
    ),
    imagem: z.string()
});