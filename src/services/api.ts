import axios from "axios";

function Api() {
    
    const api = axios.create({
      baseURL: "http://localhost:8000/",
    });  
  
    return api;
  }
  
export const bkapi = Api()