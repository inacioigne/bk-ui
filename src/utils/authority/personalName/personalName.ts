// Schema
import { createAuthoritySchema } from "@/schema/authority/personalName";
import { PersonalName, uri, variant } from "@/schema/authority/personalName";

import { z } from "zod";

type CreateAuthorityData = z.infer<typeof createAuthoritySchema>;

const Today = () => {
  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, "0");
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const ano = hoje.getFullYear();
  const minuto = hoje.getMinutes();
  const segundo = hoje.getSeconds();
  const milisegundo = hoje.getMilliseconds();

  const dataFormatada = `${ano}-${mes}-${dia}T${minuto}:${segundo}:${milisegundo}`;

  return dataFormatada;
};

function transformDate(day: string, month: string, year: string) {
  const birthDayDate = day !== "" ? day.padStart(2, "0") : false;
  const birthMonthDate = month !== "" ? month : false;
  const birthYearDate = year !== "" ? year : false;
  if (birthYearDate && birthMonthDate && birthDayDate) {
    const dateNameElement = `${birthDayDate}-${birthMonthDate}-${birthYearDate}`;
    return dateNameElement;
  }
  if (birthYearDate && birthMonthDate) {
    const dateNameElement = `${birthMonthDate}-${birthYearDate}`;
    return dateNameElement;
  }
  if (birthYearDate) {
    return birthYearDate;
  } else {
    return false;
  }
}

function Variants(variants: any) {
  const v = variants.map((variant: any) => {
    let variantLabel =
      variant.dateNameElement === ""
        ? variant.fullNameElement
        : `${variant.fullNameElement}, ${variant.dateNameElement}`;
    const elementList: any = [
      {
        type: "FullNameElement",
        elementValue: {
          value: variant.fullNameElement,
        },
      },
    ];
    variant.dateNameElement !== "" &&
      elementList.push({
        type: "DateNameElement",
        elementValue: {
          value: variant.dateNameElement,
        },
      });
    let obj = {
      type: "PersonalName",
      elementList: elementList,
      variantLabel: variantLabel,
    };
    return obj;
  });
  return v;
}

function ExternalAuthority(externalAuthority: uri[]) {
  externalAuthority.map((authority) => {
    console.log(authority);
  });
}

export function transformAuthority(
  data: CreateAuthorityData,
  id: string | null
) {
  const today = Today();
  const elementList: any = [
    {
      type: "FullNameElement",
      elementValue: {
        value: data.fullNameElement,
      },
    },
  ];

  const date =
    data.birthYearDate !== "" || data.deathYearDate !== ""
      ? `${data?.birthYearDate} - ${data?.deathYearDate}`
      : false;

  if (date) {
    elementList.push({
      type: "DateNameElement",
      elementValue: {
        value: date,
      },
    });
  }

  const personalName: PersonalName = {
    type: "PersonalName",
    identifiersLocal: id,
    adminMetadata: {
      generationProcess: "BiblioKeia",
    },
    authoritativeLabel: date
      ? `${data.fullNameElement}, ${date}`
      : data.fullNameElement,
    elementList: elementList,
    // hasVariant: hasVariant,
    isMemberOfMADSCollection:
      "https://bibliokeia.com/authorities/PersonalName/",
  };
  data.fullerName &&
    (personalName["fullerName"] = {
      type: "PersonalName",
      elementValue: {
        value: data.fullerName,
      },
    });
  data.birthPlace && (personalName["birthPlace"] = data.birthPlace);
  const birthDate = transformDate(
    data.birthDayDate,
    data.birthMonthDate,
    data.birthYearDate
  );
  birthDate && (personalName["birthDate"] = birthDate);
  data.birthDayDate &&
    (personalName["birthDayDate"] = data.birthDayDate.padStart(2, "0"));
  data.birthMonthDate && (personalName["birthMonthDate"] = data.birthMonthDate);
  data.birthYearDate && (personalName["birthYearDate"] = data.birthYearDate);

  data.deathPlace && (personalName["deathPlace"] = data.deathPlace);
  const deathDate = transformDate(
    data.deathDayDate,
    data.deathMonthDate,
    data.deathYearDate
  );
  deathDate && (personalName["deathDate"] = deathDate);
  data.deathDayDate &&
    (personalName["deathDayDate"] = data.deathDayDate.padStart(2, "0"));
  data.deathMonthDate && (personalName["deathMonthDate"] = data.deathMonthDate);
  data.deathYearDate && (personalName["deathYearDate"] = data.deathYearDate);
  data.imagem && (personalName["imagem"] = data.imagem);

  if (data.hasVariant[0].fullNameElement !== "") {
    const hasVariant = Variants(data.hasVariant);
    personalName["hasVariant"] = hasVariant;
  }
  

  // if (data.hasExactExternalAuthority[0].value !== "") {
  //   personalName["hasExactExternalAuthority"] = data.hasExactExternalAuthority;
  // }

  return personalName;
}

export function transformEditAuthority(
  data: CreateAuthorityData,
  id: string | null,
  creationDate: Date
) {
  console.log(data.hasAffiliation)

  const elementList: any = [
    {
      type: "FullNameElement",
      elementValue: {
        value: data.fullNameElement,
      },
    },
  ];

  const date =
    data.birthYearDate !== "" || data.deathYearDate !== ""
      ? `${data?.birthYearDate} - ${data?.deathYearDate}`
      : false;

  if (date) {
    elementList.push({
      type: "DateNameElement",
      elementValue: {
        value: date,
      },
    });
  }

  const personalName: PersonalName = {
    type: "PersonalName",
    identifiersLocal: id,
    adminMetadata: {
      creationDate: creationDate,
      // changeDate: today,
      generationProcess: "BiblioKeia",
    },
    authoritativeLabel: date
      ? `${data.fullNameElement}, ${date}`
      : data.fullNameElement,
    elementList: elementList,
    // hasVariant: hasVariant,
    isMemberOfMADSCollection:
      "https://bibliokeia.com/authorities/PersonalName/",
  };

  data.fullerName &&
    (personalName["fullerName"] = {
      type: "PersonalName",
      elementValue: {
        value: data.fullerName,
      },
    });

  data.birthPlace && (personalName["birthPlace"] = data.birthPlace);
  const birthDate = transformDate(
    data.birthDayDate,
    data.birthMonthDate,
    data.birthYearDate
  );

  birthDate && (personalName["birthDate"] = birthDate);
  data.birthDayDate &&
    (personalName["birthDayDate"] = data.birthDayDate.padStart(2, "0"));
  data.birthMonthDate && (personalName["birthMonthDate"] = data.birthMonthDate);
  data.birthYearDate && (personalName["birthYearDate"] = data.birthYearDate);

  data.deathPlace && (personalName["deathPlace"] = data.deathPlace);
  const deathDate = transformDate(
    data.deathDayDate,
    data.deathMonthDate,
    data.deathYearDate
  );

  deathDate && (personalName["deathDate"] = deathDate);
  data.deathDayDate &&
    (personalName["deathDayDate"] = data.deathDayDate.padStart(2, "0"));
  data.deathMonthDate && (personalName["deathMonthDate"] = data.deathMonthDate);
  data.deathYearDate && (personalName["deathYearDate"] = data.deathYearDate);
  data.imagem && (personalName["imagem"] = data.imagem);

  if (data.hasVariant[0].fullNameElement !== "") {
    const hasVariant = Variants(data.hasVariant);
    personalName["hasVariant"] = hasVariant;
  }
  if (data.occupation[0].uri !== "") {
    personalName["occupation"] = data.occupation
  }
  if (data.hasCloseExternalAuthority[0].uri !== "") {
    personalName["hasCloseExternalAuthority"] = data.hasCloseExternalAuthority
  }
  if (data.hasAffiliation[0].organization.label !== "") {
    // uri: Optional[str] = None
    // label: str
    // base: 
    
    // let affiliations = data.hasAffiliation.map((element) => {
    //   let organization = {'label' : element.organization}
    //   console.log(data.hasAffiliation)

    // })
    personalName["hasAffiliation"] = data.hasAffiliation
  }

  // if (data.hasExactExternalAuthority[0].value !== "") {
  //   personalName["hasExactExternalAuthority"] = data.hasExactExternalAuthority;

    // ExternalAuthority(data.hasExactExternalAuthority)

    // console.log(data.hasExactExternalAuthority)
    // const hasVariant = Variants(data.hasVariant);
    //
  // }

  return personalName;
}
