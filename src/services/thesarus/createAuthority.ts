// Schema
import { schemaAuthority } from "@/schema/authority";
import { MetadataRoute } from "next/types";
import  AppRouterInstance from 'next'
import { NextRouter } from 'next/router';
import { useRouter  } from 'next/navigation'

// BiblioKeia Services
import { bkapi } from "src/services/api";

export function CreateAuthority(
  authority: schemaAuthority,
  setProgress: Function,
  setTypeAlert: Function,
  setMessage: Function,
  setOpenSnack: Function,
  router: any
) {
    setProgress(true);
    bkapi
      .post('/thesarus/create', authority)
      .then((response) => {
        console.log(response)
        setTypeAlert("success");
        setMessage("Registro criado com sucesso!");
        setOpenSnack(true);
        // router.replace(`/admin/authority?id=${response.data.id}`)
      })
      .catch(function (error) {
        if (error.response.status == 409) {
          setTypeAlert("error");
          setMessage(error.response.data.detail);
          setOpenSnack(true);
        } else {
          console.log("ERROOO!!", error);
        }
      })
      .finally(function () {
        setProgress(false);
      });

  
}
