import { loc } from "@/services/loc";
import axios from "axios";

import {Authority} from "@/schema/authority"

export function GetDataLoc(setHit: Function, uri: string) {
  
  const url = `${uri}.madsrdf_raw.jsonld`
//   console.log(url)
  axios
    .get(`${uri}.madsrdf_raw.jsonld`)
    .then(function (response) {
      const data = response.data;
      
      const [a] = data.filter(function (elemento: any) {
        return elemento["@id"] === uri;
      });
      // Type
      const [tipo] = a['@type'].filter(function (elemento: any) {
        return elemento !== "http://www.loc.gov/mads/rdf/v1#Authority"
      })
      

      
      // authoritativeLabel
      let [authoritativeLabel] = a[
        "http://www.loc.gov/mads/rdf/v1#authoritativeLabel"
      ];
      // console.log(authoritativeLabel);
      
      
      // elementList
      let [elementList] = a['http://www.loc.gov/mads/rdf/v1#elementList']
      const obj = elementList['@list'].map((e) => {
        const [metadado] = data.filter(function (elemento: any) {
            return elemento["@id"] === e['@id'];
          });
          const [type] =  metadado['@type']
          const [value] = metadado['http://www.loc.gov/mads/rdf/v1#elementValue']
        const obj = {type: type, 
            elementValue: {value: value['@value']}
        }
        return obj
    })
    const authority: Authority = {
      type: tipo.split("#")[1],
      authoritativeLabel: authoritativeLabel['@value'],
      elementList: obj
    };
    // authority['elementList'] = obj
    setHit(authority)
    console.log(authority);
    
    


    //   console.log(elementList['@list']);
    })
    .catch(function (error) {
      // manipula erros da requisição
      console.error(error);
    })
    .finally(function () {
      // sempre será executado
    });
 
}
