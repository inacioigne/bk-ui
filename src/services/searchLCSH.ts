import { loc } from "@/services/loc"
export function SearchLCSH(
  params: URLSearchParams,
  setHits: Function
) {


    loc
      .get("authorities/subjects/suggest2/", {
        params: params,
      })
      .then((response) => {
        setHits(response.data.hits);
        console.log(response)
      })
      .catch(function (error) {
        console.log("ERROOO!!", error);
      })
      .finally(function () {
        // setLoading(false);
      });

}
