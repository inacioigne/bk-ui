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
    organization: schemaUri|string
    affiliationStart?: string
    affiliationEnd?: string
}

export type schemaVariant = {
    type: string;
    elementList: element[];
    variantLabel: string;
}

type adminMetadata = {
    creationDate?: Date|string;
    changeDate?: Date|string;
    generationProcess: string
}
    
export interface schemaMads {
    type: string;
    identifiersLccn?: string;
    adminMetadata: adminMetadata;
    authoritativeLabel: string;
    elementList: element[];
    fullerName?: element;
    hasVariant?: schemaVariant[];
    identifiesRWO?: string[]
    birthPlace?: string;
    birthDayDate?: string;
    birthMonthDate?: string;
    birthYearDate?: string;
    birthDate?: string;
    deathPlace?: string;
    deathDate?: string; 
    deathDayDate?: string;
    deathMonthDate?: string;
    deathYearDate?: string;
    hasAffiliation?: schemaAffiliation[];
    fieldOfActivity?: schemaUri[];
    occupation?: schemaUri[];
    hasCloseExternalAuthority?: schemaUri[]
    hasExactExternalAuthority?: schemaUri[]
    // // fieldOfActivity?: uri[]
    // // 
    // 
    // isMemberOfMADSCollection: string;
    // imagem?: string;
  }