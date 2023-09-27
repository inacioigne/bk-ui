type label = {
    value: string
}

type element = {
    type: string
    elementValue: label
}

type Uri = {
    label: string
    base?: string
    uri?: string
}


export type schemaAffiliation = {
    organization: Uri
    affiliationStart?: string
    affiliationEnd?: string
}
    
export interface schemaAuthority {
    type: string;
    // identifiersLocal: string | null;
    // adminMetadata: adminMetadata;
    authoritativeLabel: string;
    elementList: element[];
    fullerName?: element;
    identifiesRWO?: string[]
    birthPlace?: string;
    birthDate?: string;
    deathPlace?: string;
    deathDate?: string; 
    hasAffiliation?: schemaAffiliation[]
    fieldOfActivity?: Uri[]
    // birthDayDate?: string;
    // birthMonthDate?: string;
    // birthYearDate?: string;
    // 
    // 
    // 
    // deathDayDate?: string;
    // deathMonthDate?: string;
    // deathYearDate?: string;
    //    
    // hasVariant?: variant[];
    // // fieldOfActivity?: uri[]
    // // 
    // hasExactExternalAuthority?: uri[]
    // isMemberOfMADSCollection: string;
    // imagem?: string;
  }