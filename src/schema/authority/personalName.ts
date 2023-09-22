import { z } from "zod";

type adminMetadata = {
    creationDate: string;
}

type label = {
    value: string
}

type element = {
    type: string
    elementValue: label
}

type variant = {
    type: string;
    elementList: element[];
    variantLabel: string;
}

export type uri = {
    value: string;
    label: string
    base?: string
}

export interface PersonalName {
    type: string;
    identifiersLocal: number | null;
    adminMetadata: adminMetadata;
    authoritativeLabel: string;
    elementList: element[];
    fullerName?: element;
    birthDayDate: string;
    birthDate?: string;
    birthPlace?: string;
    deathPlace?: string;
    deathDate?: string;    
    hasVariant?: variant[];
    // fieldOfActivity?: uri[]
    // hasAffiliation
    hasExactExternalAuthority?: uri[]
    isMemberOfMADSCollection: string
  }

  export const createAuthoritySchema = z.object({
    fullNameElement: z.string().nonempty("Nome é obrigatório"),
    fullerName: z.string(),
    birthPlace: z.string(),
    birthDayDate: z.string().nullable(),
    birthMonthDate: z.string(),
    birthYearDate: z.string(),
    // birthDate: z.string(),
    deathPlace: z.string(),
    deathDayDate: z.string(),
    deathMonthDate: z.string(),
    deathYearDate: z.string(),
    hasVariant: z.array(
        z.object({
            fullNameElement: z.string(),
            dateNameElement: z.string(),
        })
    ),
    hasExactExternalAuthority: z.array(
        z.object({
            value: z.string(),
            label: z.string(),
            base: z.string()
        })
    )
    // fieldOfActivity: z.array(
    //     z.object({

    //     })
    // )

});

export const editAuthoritySchema = z.object({
    fullNameElement: z.string().nonempty("Nome é obrigatório"),
    fullerName: z.string(),
    birthPlace: z.string(),
    birthDayDate: z.string(),
    birthMonthDate: z.string(),
    birthYearDate: z.string(),
    // birthDate: z.string(),
    deathPlace: z.string(),
    deathDayDate: z.string(),
    deathMonthDate: z.string(),
    deathYearDate: z.string(),
    hasVariant: z.array(
        z.object({
            fullNameElement: z.string(),
            dateNameElement: z.string(),
        })
    ),
    hasExactExternalAuthority: z.array(
        z.object({
            value: z.string(),
            label: z.string(),
            base: z.string()
        })
    )
    // fieldOfActivity: z.array(
    //     z.object({

    //     })
    // )

});