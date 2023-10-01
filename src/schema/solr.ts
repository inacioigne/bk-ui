// import { uri } from "@/schema/authority/personalName"

type uri = {
    uri: string;
    label: string
    base?: string
}

export interface schemaAuthorityDoc {
    id: string;
    type: string;
    creationDate: Date;
    authority: string;
    imagem: string;
    fullerName: string;
    birthPlace: string;
    birthDate?: string;
    birthDayDate?: string;
    birthMonthDate?: string;
    birthYearDate?: string;
    deathPlace: string;
    deathDate: string;
    deathDayDate?: string;
    deathMonthDate?: string;
    deathYearDate?: string;
    hasAffiliation: string;
    variant: string[];
    occupation: string;
    hasExactExternalAuthority: uri[] 
    hasCloseExternalAuthority?: uri[]  
    hasOccupation?: uri[]    


}