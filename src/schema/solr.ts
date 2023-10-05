// import { uri } from "@/schema/authority/personalName"

type uri = {
    uri: string;
    label: string
    base?: string
}

export interface schemaAuthorityDoc {
    id: string;
    identifiersLccn?: string;
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
    hasAffiliation: any;
    variant: string[];
    occupation: any;
    hasExactExternalAuthority: uri[] 
    hasCloseExternalAuthority?: uri[]  
    hasOccupation?: uri[]  
    identifiesRWO?: uri[]  
    fieldOfActivity?: uri[]


}