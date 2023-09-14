export default interface Facet {
    name: string;
    count: number;
  }

export default  interface FacetProps {
    facets: Facet[];
    setRows: Function;
    setFacetType: Function;
    setFacetAffiliation: Function;
    setOccupation: Function;
    params: URLSearchParams
  }