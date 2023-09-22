import { PersonalNameDoc } from "@/schema/authority/solr"

export function UpdateForm(doc:PersonalNameDoc, setValue: Function) {
    setValue("fullNameElement", doc.authority[0])
    doc.fullerName && setValue("fullerName", doc.fullerName[0])
    doc.birthPlace && setValue("birthPlace", doc.birthPlace[0])
    doc.birthDate && setValue("birthDate", doc.birthDate[0])
    console.log(doc.variant)
    // setValue(`items[${index}].${fieldName}`, value);


}