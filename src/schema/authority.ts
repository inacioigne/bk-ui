type label = {
    value: string
}

type element = {
    type: string
    elementValue: label
}

export interface Authority {
    // type: string;
    // identifiersLocal: string | null;
    // adminMetadata: adminMetadata;
    authoritativeLabel: string;
    elementList: element[];
    // fullerName?: element;
    // birthDayDate?: string;
    // birthMonthDate?: string;
    // birthYearDate?: string;
    // birthDate?: string;
    // birthPlace?: string;
    // deathPlace?: string;
    // deathDayDate?: string;
    // deathMonthDate?: string;
    // deathYearDate?: string;
    // deathDate?: string;    
    // hasVariant?: variant[];
    // // fieldOfActivity?: uri[]
    // // hasAffiliation
    // hasExactExternalAuthority?: uri[]
    // isMemberOfMADSCollection: string;
    // imagem?: string;
  }