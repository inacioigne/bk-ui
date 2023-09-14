// React Hooks
// import { useState, useEffect } from "react";

// BiblioKeia Services
import { solr } from "@/services/solr";
// Types BiblioKeia
import Facet from "@/utils/types"


function TransformFacet(facets: Facet[]) { 
  const listFacets = [];
  for (let i = 0; i < facets.length; i += 2) {
    const chave = facets[i];
    const valor = facets[i + 1];
    if (valor > 0) {
      listFacets.push({ name: chave, count: valor });
    }
  }
  return listFacets;
}

export function SearchNames(
  params: URLSearchParams,
  setRows: Function,
  setRowCount:Function,
  setFacetType: Function,
  setFacetAffiliation: Function,
  setOccupation: Function
) {


  solr.get("authority/query?", {params: params})
    .then(function (response) { 
      const docs = response.data.response.docs;
      setRowCount(response.data.response.numFound)
      // console.log(response)
      const r = docs.map((doc: any, index: number) => {
        return { id: doc.id, authority: doc.authority[0], type: doc.type[0] };
      });
      setRows(r);
      // Facets
      const fType = TransformFacet(
        response.data.facet_counts.facet_fields.type
      );
      setFacetType(fType);
      const fAffiliation = TransformFacet(
        response.data.facet_counts.facet_fields.affiliation_str
      );
      setFacetAffiliation(fAffiliation);
      const fOccupation = TransformFacet(
        response.data.facet_counts.facet_fields.occupation_str
      );
      setOccupation(fOccupation)
    })
    .catch(function (error) {
      // manipula erros da requisição
      console.error(error);
    })
    .finally(function () {
      // sempre será executado
    });
}
