import { schemaAuthorityDoc } from "@/schema/solr";
import { array } from "zod";

export function UpdateForm(
  doc: schemaAuthorityDoc,
  setValue: Function,
  appendVariant: Function,
  appendExternalAuthority: Function,
  appendhasOccupation: Function,
  appendhasAffiliation: Function
) {
  setValue("fullNameElement", doc.authority[0]);
  doc.fullerName && setValue("fullerName", doc.fullerName[0]);
  doc.birthPlace && setValue("birthPlace", doc.birthPlace[0]);
  // doc.birthDate && setValue("birthDate", doc.birthDate[0]);
  doc.birthDayDate && setValue("birthDayDate", doc.birthDayDate);
  doc.birthMonthDate && setValue("birthMonthDate", doc.birthMonthDate);
  doc.birthYearDate && setValue("birthYearDate", doc.birthYearDate);
  doc.deathPlace && setValue("deathPlace", doc.deathPlace[0]);
  doc.deathDayDate && setValue("deathDayDate", doc.deathDayDate);
  doc.deathMonthDate && setValue("deathMonthDate", doc.deathMonthDate);
  doc.deathYearDate && setValue("deathYearDate", doc.deathYearDate);
  doc.imagem && setValue("imagem", doc.imagem);

  if (doc.variant.length > 0) {
    doc.variant.forEach(function (variant, index) {
      appendVariant({
        fullNameElement: variant,
        dateNameElement: "",
      });
    });
  }
 
  if (doc.hasCloseExternalAuthority) {
    if (Array.isArray(doc.hasCloseExternalAuthority)) {
      // console.log(doc.hasCloseExternalAuthority);
      doc.hasCloseExternalAuthority.forEach(function (authority, index) {
        // console.log(authority)
        appendExternalAuthority({
          uri: authority.uri,
          label: authority.label[0],
          base: authority.base,
        });
      });
    } else {
      appendExternalAuthority({
        uri: doc.hasCloseExternalAuthority.uri,
        label: doc.hasCloseExternalAuthority.label[0],
        base: doc.hasCloseExternalAuthority.base,
      });
    }
  }

  if (doc.occupation) {
    if (Array.isArray(doc.occupation)) {
      doc.occupation.forEach(function (authority, index) {
        // console.log(doc.occupation)
        appendhasOccupation({
          uri: authority.uri,
          label: authority.label[0],
          base: authority.base,
        });
      });
    } else {
      appendhasOccupation({
        value: doc.occupation.uri,
        label: doc.occupation.label[0],
        base: doc.occupation.base,
      });
    }
  } else {
    appendhasOccupation({
      value: "",
      label: "",
      base: "",
    });
  }
  // hasAffiliation
  if (doc.hasAffiliation) {
    
    if (Array.isArray(doc.hasAffiliation)) {
      doc.hasAffiliation.forEach(function (affiliation, index) {
        appendhasAffiliation({
          organization: {label: affiliation.organization},
          affiliationStart: affiliation.affiliationStart,
          affiliationEnd: affiliation.affiliationEnd
        })
        // console.log(affiliation)


      })
      
      
    } else {
      // console.log(doc.hasAffiliation)
      appendhasAffiliation({
        organization: {label: doc.hasAffiliation.organization},
        affiliationStart: doc.hasAffiliation.affiliationStart,
        affiliationEnd: doc.hasAffiliation.affiliationEnd
      })
    } 
  } else {
    appendhasAffiliation({
      organization: {label: ""},
      affiliationStart: "",
      affiliationEnd: ""
    })


  }
}
