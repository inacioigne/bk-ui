import axios from "axios";

import { schemaMads, schemaAffiliation } from "@/schema/authority";

const mads = "http://www.loc.gov/mads/rdf/v1#";

function possuiDiaDefinido(data: Date): boolean {
  // Obtém o dia da data
  const dia = data.getDate();

  // Verifica se o dia é um número válido (entre 1 e 31)
  return !isNaN(dia) && dia >= 1 && dia <= 31;
}

function ParserData(response: any, uri: string) {
  const data = response.data;

  const [a] = data.filter(function (elemento: any) {
    return elemento["@id"] === uri;
  });
  
  // Type
  const [type] = a["@type"].filter(function (elemento: any) {
    return elemento !== `${mads}Authority`;
  });

  // identifiersLccn
  let uriArray = uri.split("/")
  let identifiersLccn = uriArray[uriArray.length - 1]

  // authoritativeLabel
  let [authoritativeLabel] = a[`${mads}authoritativeLabel`];

  // elementList
  let [elementList] = a[`${mads}elementList`];
  let obj = elementList["@list"].map((e: any) => {
    let [metadado] = data.filter(function (elemento: any) {
      return elemento["@id"] === e["@id"];
    });
    const [type] = metadado["@type"];
    const [value] = metadado[`${mads}elementValue`];
    const obj = { type: type.split("#")[1], elementValue: { value: value["@value"] } };
    return obj;
  });

  const authority: schemaMads = {
    adminMetadata: {
      generationProcess: "BiblioKeia",
  },
    type: type.split("#")[1],
    identifiersLccn: identifiersLccn,
    authoritativeLabel: authoritativeLabel["@value"],
    elementList: obj,
  };
  // fullerName
  if (a.hasOwnProperty(`${mads}fullerName`)) {
    let [name] = a[`${mads}fullerName`];
    let [metadado] = data.filter(function (elemento: any) {
      return elemento["@id"] === name["@id"];
    });
    let [type] = metadado["@type"];
    let [value] = metadado["http://www.w3.org/2000/01/rdf-schema#label"];
    let obj = {
      type: type.split("#")[1],
      elementValue: { value: value["@value"] },
    };
    authority["fullerName"] = obj;
  }
  // hasVariant
  if (a.hasOwnProperty(`${mads}hasVariant`)) {
    let hv = a[`${mads}hasVariant`];
    let hasVariant = hv.map((e: any) => {
      let id = e["@id"];
      let [obj] = data.filter(function (e: any) {
        return e["@id"] === id;
      });
      let types = obj["@type"];
      let [type] = types.filter((e: string) => {
        return e !== `${mads}Variant`;
      });
      let [el] = obj[`${mads}elementList`];

      let elementList = el["@list"].map((e: any) => {
        let id = e["@id"];
        let [obj] = data.filter(function (e: any) {
          return e["@id"] === id;
        });
        let [type] = obj["@type"];
        let [elementValue] = obj[`${mads}elementValue`];
        let element = {
          type: type.split("#")[1],
          elementValue: { value: elementValue["@value"] },
        };
        return element;
      });
      let [variantLabel] = obj[`${mads}variantLabel`];
      let hasVariant = {
        type: type.split("#")[1],
        elementList: elementList,
        variantLabel: variantLabel["@value"],
      };
      // console.log(hasVariant)

      return hasVariant;
    });

    authority["hasVariant"] = hasVariant;
  }
  // hasCloseExternalAuthority
  if (a.hasOwnProperty(`${mads}hasCloseExternalAuthority`)) {
    let hca = a[`${mads}hasCloseExternalAuthority`];
    let hasCloseExternalAuthority = hca.map((e: any) => {
      let id = e["@id"]
      let [metadado] = data.filter(function (e: any) {
        return e["@id"] === id;
      });
      let [label] = metadado[`${mads}authoritativeLabel`]
      let uri = metadado["@id"]
      let base = uri.split("/")[2]
      let obj = {label: label['@value'], base: base, uri: uri}

      return obj
    })
    authority["hasCloseExternalAuthority"] = hasCloseExternalAuthority
  }
  // identifiesRWO
  if (a.hasOwnProperty(`${mads}identifiesRWO`)) {
    let identifiesRWO = a[`${mads}identifiesRWO`];

    let identifies = identifiesRWO.map((rwo: any) => {
      return rwo["@id"];
    });
    authority["identifiesRWO"] = identifies;

    identifies.forEach((identifier: string) => {
      if (identifier.split("/")[3] === "rwo") {
        let [metadado] = data.filter(function (e: any) {
          return e["@id"] === identifier;
        });

        // birthPlace
        if (metadado.hasOwnProperty(`${mads}birthPlace`)) {
          let [bp] = metadado[`${mads}birthPlace`];
          let [birthPlace] = data.filter(function (elemento: any) {
            return elemento["@id"] === bp["@id"];
          });
          let [label] =
            birthPlace["http://www.w3.org/2000/01/rdf-schema#label"];
          authority["birthPlace"] = label["@value"];
        }

        // birthDate
        if (metadado.hasOwnProperty(`${mads}birthDate`)) {
          let [bd] = metadado[`${mads}birthDate`];
          let date = bd["@value"].split("-")      
          if (date.length === 1) {
            let [year] = date
            authority["birthYearDate"] = year
            authority["birthDate"] = year   
          } else if (date.length === 3 ) {
            authority["birthYearDate"] = date[0]
            authority["birthMonthDate"] = date[1]
            authority["birthDayDate"] = date[2]
            authority["birthDate"] = `${date[2]}-${date[1]}-${date[0]}` 
          }
        }

        // deathPlace
        if (metadado.hasOwnProperty(`${mads}deathPlace`)) {
          let [dp] = metadado[`${mads}deathPlace`];
        }

        // deathDate
        if (metadado.hasOwnProperty(`${mads}deathDate`)) {
          let [dd] = metadado[`${mads}deathDate`];
          let date = dd["@value"].split("-")
          if (date.length === 1) {
            let [year] = date
            authority["deathYearDate"] = year
            authority["deathDate"] = year   
          } else if (date.length === 3 ) {
            authority["deathYearDate"] = date[0]
            authority["deathMonthDate"] = date[1]
            authority["deathDayDate"] = date[2]
            authority["deathDate"] = `${date[2]}-${date[1]}-${date[0]}` 
          }  
          // let date = new Date(dd["@value"])
          // let day = String(date.getUTCDate())
          // let month = String(date.getMonth() + 1).padStart(2, "0");
          // let year = String(date.getFullYear())
          // authority["deathDate"] = `${day}-${month}-${year}`;
          // authority["deathDayDate"] = day
          // authority["deathMonthDate"] = month
          // authority["deathYearDate"] = year
        }

        // hasAffiliation
        if (metadado.hasOwnProperty(`${mads}hasAffiliation`)) {
          let hasAffiliation = metadado[`${mads}hasAffiliation`];

          let affiliations = hasAffiliation.map((affiliation: any) => {
            let id = affiliation["@id"];
            let [metadado] = data.filter(function (elemento: any) {
              return elemento["@id"] === id;
            });

            let [org] = metadado[`${mads}organization`];
            let orgId = org["@id"];
            let [organization] = data.filter(function (elemento: any) {
              return elemento["@id"] === orgId;
            });
            let uri = organization["@id"];
            const objOrg: any = { base: "loc" };

            if (uri.includes("http://")) {
              let [label] = organization[`${mads}authoritativeLabel`];
              objOrg["uri"] = uri;
              objOrg["label"] = label["@value"];
            } else {
              let [label] =
                organization["http://www.w3.org/2000/01/rdf-schema#label"];
              objOrg["label"] = label["@value"];
            }

            let objA: schemaAffiliation = {
              organization: objOrg,
            };

            // affiliationStart
            if (metadado.hasOwnProperty(`${mads}affiliationStart`)) {
              let [start] = metadado[`${mads}affiliationStart`];
              objA["affiliationStart"] = start["@value"];
            }
            // affiliationEnd
            if (metadado.hasOwnProperty(`${mads}affiliationEnd`)) {
              let [end] = metadado[`${mads}affiliationEnd`];
              objA["affiliationEnd"] = end["@value"];
            }
            return objA;
          });

          authority["hasAffiliation"] = affiliations;
        }

        // Field of Activity
        if (metadado.hasOwnProperty(`${mads}fieldOfActivity`)) {
          let foa = metadado[`${mads}fieldOfActivity`];
          let fieldOfActivity = foa.map((e: any) => {
            let id = e["@id"];
            let [obj] = data.filter(function (e: any) {
              return e["@id"] === id;
            });
            let [label] = obj[`${mads}authoritativeLabel`];
            let uri = { label: label["@value"], base: "loc", uri: obj["@id"] };
            return uri;
          });
          authority["fieldOfActivity"] = fieldOfActivity;
        }

        // occupation
        if (metadado.hasOwnProperty(`${mads}occupation`)) {
          let occ = metadado[`${mads}occupation`];
          let occupation = occ.map((e: any) => {
            let id = e["@id"];
            let [obj] = data.filter(function (e: any) {
              return e["@id"] === id;
            });
            //
            //

            if (id.includes("http://")) {
              let [label] = obj[`${mads}authoritativeLabel`];
              let objOcc: any = {
                label: label["@value"],
                base: "loc",
                uri: obj["@id"],
              };
              return objOcc;
            } else {
              let [label] = obj["http://www.w3.org/2000/01/rdf-schema#label"];
              let objOcc: any = {
                label: label["@value"],
                base: "loc",
              };
              return objOcc;
            }
          });
          authority["occupation"] = occupation;
         
        }
      }
    });
  }

  return authority;
}
export function LocAuthority(setHit: Function, uri: string) {
  const url = `${uri}.json`;

  axios
    .get(url)
    .then(function (response) {
      const authority = ParserData(response, uri);
      setHit(authority);
    })
    .catch(function (error) {
      console.error(error);
    })
    .finally(function () {
      // sempre será executado
    });
}
