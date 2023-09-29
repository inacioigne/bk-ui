// import { loc } from "@/services/loc";
import axios from "axios";

import { schemaAuthority, schemaAffiliation } from "@/schema/authority";

const mads = "http://www.loc.gov/mads/rdf/v1#";

function ParserData(response: any, uri: string) {
  const data = response.data;

  const [a] = data.filter(function (elemento: any) {
    return elemento["@id"] === uri;
  });
  // Type
  const [tipo] = a["@type"].filter(function (elemento: any) {
    return elemento !== `${mads}Authority`;
  });

  // authoritativeLabel
  let [authoritativeLabel] = a[
    "http://www.loc.gov/mads/rdf/v1#authoritativeLabel"
  ];

  // elementList
  let [elementList] = a["http://www.loc.gov/mads/rdf/v1#elementList"];
  const obj = elementList["@list"].map((e: any) => {
    let [metadado] = data.filter(function (elemento: any) {
      return elemento["@id"] === e["@id"];
    });
    const [type] = metadado["@type"];
    const [value] = metadado["http://www.loc.gov/mads/rdf/v1#elementValue"];
    const obj = { type: type, elementValue: { value: value["@value"] } };
    return obj;
  });
  const authority: schemaAuthority = {
    type: tipo.split("#")[1],
    authoritativeLabel: authoritativeLabel["@value"],
    elementList: obj,
  };

  // fullerName
  const fullerName = a["http://www.loc.gov/mads/rdf/v1#fullerName"];
  if (typeof fullerName !== "undefined") {
    let [name] = fullerName;
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
  
  // identifiesRWO
  const identifiesRWO = a["http://www.loc.gov/mads/rdf/v1#identifiesRWO"];
  if (typeof identifiesRWO !== "undefined") {
    let identifies = identifiesRWO.map((rwo: any) => {
      return rwo["@id"];
    });
    identifies.forEach((identifier: string) => {
      // RWO
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
          let [label] = birthPlace[
            "http://www.w3.org/2000/01/rdf-schema#label"
          ];
          authority["birthPlace"] = label["@value"];
        }

        // birthDate
        if (metadado.hasOwnProperty(`${mads}birthDate`)) {
          let [bd] = metadado[`${mads}birthDate`];
          authority["birthDate"] = bd["@value"];
        }

        // deathPlace
        if (metadado.hasOwnProperty(`${mads}deathPlace`)) {
          let [dp] = metadado[`${mads}deathPlace`];
        }

        // deathDate
        if (metadado.hasOwnProperty(`${mads}deathDate`)) {
          let [dd] = metadado[`${mads}deathDate`];
          authority["deathDate"] = dd["@value"];
        }

        // hasAffiliation
        if (metadado.hasOwnProperty(`${mads}hasAffiliation`)) {
          let hasAffiliation = metadado[`${mads}hasAffiliation`];
          let affiliations = hasAffiliation.map((affiliation: any) => {
            let id = affiliation["@id"];
            let [metadado] = data.filter(function (elemento: any) {
              return elemento["@id"] === id;
            });
            let [org] = metadado["http://www.loc.gov/mads/rdf/v1#organization"];
            let orgId = org["@id"];
            let [organization] = data.filter(function (elemento: any) {
              return elemento["@id"] === orgId;
            });
            let [label] = organization[
              "http://www.w3.org/2000/01/rdf-schema#label"
            ];
            let objA: schemaAffiliation = {
              organization: {
                label: label["@value"].replace("(naf) ", ""),
                base: "loc",
              },
            };

            // affiliationStart
            if (
              metadado.hasOwnProperty(
                "http://www.loc.gov/mads/rdf/v1#affiliationStart"
              )
            ) {
              let [start] = metadado[
                "http://www.loc.gov/mads/rdf/v1#affiliationStart"
              ];
              objA["affiliationStart"] = start["@value"];
            }
            // affiliationEnd
            if (
              metadado.hasOwnProperty(
                "http://www.loc.gov/mads/rdf/v1#affiliationEnd"
              )
            ) {
              let [end] = metadado[
                "http://www.loc.gov/mads/rdf/v1#affiliationEnd"
              ];
              objA["affiliationEnd"] = end["@value"];
            }
            return objA;
          });
          authority["hasAffiliation"] = affiliations;
        }
        
        // fieldOfActivity
        if (metadado.hasOwnProperty(`${mads}fieldOfActivity`)) {
          let fa = metadado[`${mads}fieldOfActivity`];
          let fieldOfActivity = fa.map((e: any) => {
            let id = e["@id"];
            let [metadado] = data.filter(function (e: any) {
              return e["@id"] === id;
            });
            let [label] = metadado[
              "http://www.w3.org/2000/01/rdf-schema#label"
            ];
            let obj = {
              label: label["@value"],
              base: "loc",
            };
            return obj;
          });
          authority["fieldOfActivity"] = fieldOfActivity;
          console.log(authority);
        }
      }
    });

    authority["identifiesRWO"] = identifies;
  }

  return authority;
}

export function GetDataLoc(setHit: Function, uri: string) {
  const url = `${uri}.madsrdf_raw.jsonld`;
  //   console.log(url)
  axios
    .get(`${uri}.madsrdf_raw.jsonld`)
    .then(function (response) {
      const authority = ParserData(response, uri);

      setHit(authority); 
    })
    .catch(function (error) {
      // manipula erros da requisição
      console.error(error);
    })
    .finally(function () {
      // sempre será executado
    });
}
