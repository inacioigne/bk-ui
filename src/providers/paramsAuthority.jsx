"use client";
import { createContext, useContext, useState } from "react";

export const ParamsAuthorityContext = createContext();

export const ParamsAuthorityProvider = ({ children }) => {

  const params = new URLSearchParams();
  params.append("q", "search_general:*");
  params.append("facet", "true");
  params.append("facet.field", "type");
  params.append("facet.field", "affiliation_str");
  params.append("facet.field", "occupation_str");
  const [paramsAuthority, setSearchParams] = useState(params);

  
  // setSearchParams(params)

  const updateParamsAuthority = (newParams) => {
    setSearchParams(newParams);
  };

  return (
    <ParamsAuthorityContext.Provider
      value={{ paramsAuthority, updateParamsAuthority }}
    >
      {children}
    </ParamsAuthorityContext.Provider>
  );
};

export const useParmasAutority = () => useContext(ParamsAuthorityContext);
