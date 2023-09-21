// import { uri } from "@/schema/authority/personalName"

type uri = {
    value: string;
    label: string
    base?: string
}

export interface PersonalNameDoc {
    id: string;
    type: string;
    authority: string;
    imagem: string;
    fullerName: string;
    birthPlace: string;
    birthDate: string;
    deathPlace: string;
    deathDate: string;
    hasAffiliation: string;
    variant: string;
    occupation: string;
    hasExactExternalAuthority: uri[]
        // "isMemberOfMADSCollection":["https://bibliokeia.com/authorities/PersonalName/"],
        // "birthDate":["01-01-1980"],
        // "birthPlace":["Rio de Janeiro"],
        // "deathDate":["02-02-1990"],
        // "deathPlace":["Rio de Janeiro"],
        // "variant":["Maria Machado 1980-1990"],
        // "creationDate":"2023-09-21T00:00:00Z",
        


}