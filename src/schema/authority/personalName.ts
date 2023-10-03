import { z } from "zod";

type adminMetadata = {
    creationDate?: Date|string;
    changeDate?: Date|string;
    generationProcess: string
}

type label = {
    value: string
}

type element = {
    type: string
    elementValue: label
}

export type variant = {
    type: string;
    elementList: element[];
    variantLabel: string;
}

export type uri = {
    uri: string;
    label: string
    base?: string
}


export interface PersonalName {
    type: string;
    identifiersLocal: string | null;
    identifiersLccn?: string;
    adminMetadata: adminMetadata;
    authoritativeLabel: string;
    elementList: element[];
    fullerName?: element;
    birthDayDate?: string;
    birthMonthDate?: string;
    birthYearDate?: string;
    birthDate?: string;
    birthPlace?: string;
    deathPlace?: string;
    deathDayDate?: string;
    deathMonthDate?: string;
    deathYearDate?: string;
    deathDate?: string;    
    hasVariant?: variant[];
    occupation?: uri[]
    // fieldOfActivity?: uri[]
    hasAffiliation?: any
    hasExactExternalAuthority?: uri[];
    hasCloseExternalAuthority?: uri[];
    isMemberOfMADSCollection: string;
    imagem?: string;
  }

  export const createAuthoritySchema = z.object({
    fullNameElement: z.string().nonempty("Nome é obrigatório"),
    fullerName: z.string(),
    birthPlace: z.string(),
    // birthDate: z.string(),
    birthDayDate: z.string(),
    birthMonthDate: z.string(),
    birthYearDate: z.string(),
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
    hasAffiliation: z.array(
        z.object({
            organization: z.object({label: z.string(), uri: z.string(), base: z.string()}),
            affiliationStart: z.string(),
            affiliationEnd:  z.string(),
        })
    ),
    // hasExactExternalAuthority: z.array(
    //     z.object({
    //         value: z.string(),
    //         label: z.string(),
    //         base: z.string()
    //     })
    // ),
    hasCloseExternalAuthority: z.array(
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
    imagem: z.string()
    // fieldOfActivity: z.array(
    //     z.object({

    //     })
    // )

});

export const editAuthoritySchema = z.object({
    fullNameElement: z.string().nonempty("Nome é obrigatório"),
    fullerName: z.string(),
    birthPlace: z.string(),
    // birthDayDate: z.string(),
    // birthMonthDate: z.string(),
    // birthYearDate: z.string(),
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
    hasCloseExternalAuthority: z.array(
        z.object({
            value: z.string(),
            label: z.string(),
            base: z.string()
        })
    ),
    
    imagem: z.string()
    // fieldOfActivity: z.array(
    //     z.object({

    //     })
    // )

});