import axios from "axios";

function search() {
    
    const api = axios.create({
      baseURL: "https://id.loc.gov/",
    });  
  
   
    return api;
  }
  
export const loc = search()