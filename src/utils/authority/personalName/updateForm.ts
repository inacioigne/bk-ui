import { PersonalNameDoc } from "@/schema/authority/solr";
import { array } from "zod";

export function UpdateForm(
  doc: PersonalNameDoc,
  setValue: Function,
  appendVariant: Function,
  appendExternalAuthority: Function
) {
  setValue("fullNameElement", doc.authority[0]);
  doc.fullerName && setValue("fullerName", doc.fullerName[0]);
  doc.birthPlace && setValue("birthPlace", doc.birthPlace[0]);
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
  if (doc.hasExactExternalAuthority) {
    if (Array.isArray(doc.hasExactExternalAuthority)) {
      // console.log(doc.hasExactExternalAuthority);
      doc.hasExactExternalAuthority.forEach(function (authority, index) {
        appendExternalAuthority({
          value: authority.uri,
          label: authority.label[0],
          base: authority.base,
        });
      });
    } else {
      appendExternalAuthority({
        value: doc.hasExactExternalAuthority.uri,
        label: doc.hasExactExternalAuthority.label[0],
        base: doc.hasExactExternalAuthority.base,
      });
    }
  }
}
