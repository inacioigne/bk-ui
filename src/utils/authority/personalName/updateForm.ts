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
  doc.birthDayDate && setValue("birthDayDate", doc.birthDayDate[0]);
  doc.birthMonthDate && setValue("birthMonthDate", doc.birthMonthDate[0]);
  doc.birthYearDate && setValue("birthYearDate", doc.birthYearDate[0]);
  doc.deathPlace && setValue("deathPlace", doc.deathPlace[0]);
  doc.deathDayDate && setValue("deathDayDate", doc.deathDayDate[0]);
  doc.deathMonthDate && setValue("deathMonthDate", doc.deathMonthDate[0]);
  doc.deathYearDate && setValue("deathYearDate", doc.deathYearDate[0]);

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
