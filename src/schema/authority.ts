type label = {
    value: string
}

type element = {
    type: string
    elementValue: label
}

export type schemaUri = {
    label: string
    base?: string
    uri?: string
}


export type schemaAffiliation = {
    organization: schemaUri
    affiliationStart?: string
    affiliationEnd?: string
}

export type variant = {
    type: string;
    elementList: element[];
    variantLabel: string;
}
    
export interface schemaAuthority {
    type: string;
    // identifiersLocal: string | null;
    // adminMetadata: adminMetadata;
    authoritativeLabel: string;
    elementList: element[];
    fullerName?: element;
    hasVariant?: variant[];
    identifiesRWO?: string[]
    birthPlace?: string;
    birthDate?: string;
    deathPlace?: string;
    deathDate?: string; 
    hasAffiliation?: schemaAffiliation[];
    fieldOfActivity?: schemaUri[];
    occupation?: schemaUri[];
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
    // 
    // // fieldOfActivity?: uri[]
    // // 
    // hasExactExternalAuthority?: uri[]
    // isMemberOfMADSCollection: string;
    // imagem?: string;
  }