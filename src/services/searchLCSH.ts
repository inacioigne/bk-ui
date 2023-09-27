import { loc } from "@/services/loc"
export function SearchLCSH(
  params: URLSearchParams,
  setHits: Function
) {
  // console.log(params.toString())
    loc
      .get("authorities/suggest2/", {
        params: params,
      })
      .then((response) => {
        setHits(response.data.hits);
        // console.log(response)
      })
      .catch(function (error) {
        console.log("ERROOO!!", error);
      })
      .finally(function () {
        // setLoading(false);
      });

}
