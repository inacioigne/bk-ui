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


export interface PersonalName {
    type: string;
    identifiersLocal: number | null;
    adminMetadata: adminMetadata;
    authoritativeLabel: string;
    elementList: element[];
    fullerName?: element;
    birthDate?: string;
    birthPlace?: string;
    deathPlace?: string;
    deathDate?: string;    
    hasVariant: variant[];
    isMemberOfMADSCollection: string

  }