// Schema
import { schemaMads } from "@/schema/authority";


// BiblioKeia Services
import { bkapi } from "src/services/api";

export function CreateAuthority(
  authority: schemaMads,
  setProgress: Function,
  setTypeAlert: Function,
  setMessage: Function,
  setOpenSnack: Function,
  router: any,
  setHit: Function
) {

  setProgress(true);
  bkapi
    .post("/thesarus/create", authority)
    .then((response) => {
      console.log(response);
      setTypeAlert("success");
      setMessage("Registro criado com sucesso!");
      setOpenSnack(true);
      router.replace(`/admin/authority/${response.data.id}`);
    })
    .catch(function (error) {
      if (error.response.status == 409) {
        setHit(null)
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
