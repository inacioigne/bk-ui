import { z } from "zod";

export const MadsSchema = z.object({
    elementList: z.array(
        z.object({
            type: z.string(),
            elementValue: z.object({
                value: z.string().nonempty("Nome é obrigatório"), lang: z.string().nullable()
            })
        })),
    fullerName: z.string().nullable(),
    birthPlace: z.string().nullable(),
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
            elementList: z.array(
                z.object({ type: z.string(), elementValue: z.object({ value: z.string() }) })
            )
        })
    ),
    hasAffiliation: z.array(
        z.object({
            organization: z.object({ label: z.string(), uri: z.string().nullable() }),
            affiliationStart: z.string().nullable(),
            affiliationEnd: z.string().nullable(),
        })
    ),
    hasCloseExternalAuthority: z.array(
        z.object({
            uri: z.string().nullable(),
            label: z.string(),
            base: z.string().nullable()
        })
    ),
    identifiesRWO: z.array(
        z.object({
            uri: z.string().nullable(),
            label: z.string(),
            base: z.string().nullable()
        })
    ),
    occupation: z.array(
        z.object({
            uri: z.string().nullable(),
            label: z.string(),
            base: z.string().nullable()
        })
    ),
    fieldOfActivity: z.array(
        z.object({
            uri: z.string().nullable(),
            label: z.string(),
            base: z.string().nullable()
        })
    ),
    imagem: z.string().nullable()
});