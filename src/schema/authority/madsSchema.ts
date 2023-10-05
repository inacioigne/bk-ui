import { z } from "zod";

export const MadsSchema = z.object({
    elementList: z.array(
        z.object({
            type: z.string(),
            elementValue: z.object({
                value: z.string(), lang: z.string()
            })
        })),
    fullerName: z.string(),
    birthPlace: z.string(),
    birthDayDate: z.string(),
    birthMonthDate: z.string(),
    birthYearDate: z.string(),
    deathPlace: z.string(),
    deathDayDate: z.string(),
    deathMonthDate: z.string(),
    deathYearDate: z.string(),
    variant: z.array(
        z.object({
            fullNameElement: z.string(),
            // dateNameElement: z.string(),
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