import axios from "axios";

import { schemaAuthority, schemaAffiliation } from "@/schema/authority";

const mads = "http://www.loc.gov/mads/rdf/v1#";

function ParserData(response: any, uri: string) {
  const data = response.data;
  const [a] = data.filter(function (elemento: any) {
    return elemento["@id"] === uri;
  });
  // Type
  const [type] = a["@type"].filter(function (elemento: any) {
    return elemento !== `${mads}Authority`;
  });

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
    const obj = { type: type, elementValue: { value: value["@value"] } };
    return obj;
  });

  const authority: schemaAuthority = {
    type: type.split("#")[1],
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
  
  if (a.hasOwnProperty(`${mads}hasVariant`)) {
    let hv = a[`${mads}hasVariant`];
    let fieldOfActivity = hv.map((e: any) => {
      let id = e["@id"];
      let [obj] = data.filter(function (e: any) {
        return e["@id"] === id;
      });
      let types = obj["@type"]
      let [type] = types.filter((e: string) => {return e !== "http://www.loc.gov/mads/rdf/v1#Variant"})
      let [elementList] = obj[`${mads}elementList`]
      let objV = {type: type}
      console.log(elementList);
      // let [label] = obj[`${mads}authoritativeLabel`];
      // let uri = { label: label["@value"], base: "loc", uri: obj["@id"] };
      // return uri;

    //   type: string;
    // elementList: element[];
    // variantLabel
    });
    



  }
  // identifiesRWO
  if (a.hasOwnProperty(`${mads}identifiesRWO`)) {
    let identifiesRWO = a[`${mads}identifiesRWO`];

    let identifies = identifiesRWO.map((rwo: any) => {
      return rwo["@id"];
    });

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
              let [label] = organization[
                "http://www.w3.org/2000/01/rdf-schema#label"
              ];
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
            let [label] = obj[`${mads}authoritativeLabel`];
            let uri = { label: label["@value"], base: "loc", uri: obj["@id"] };
            return uri;
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
