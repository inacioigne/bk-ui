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


}