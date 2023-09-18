import { loc } from "@/services/loc"
export function SearchLCNAF(
  params: URLSearchParams,
  setHits: Function
) {


    loc
      .get("authorities/names/suggest2/", {
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
  // console.log(params)
  // if (type != "all") {
  //   params["rdftype"] = type;
  // }
  // if (search) {
  //   setLoading(true);
  //   loc
  //     .get("authorities/names/suggest2/", {
  //       params: params,
  //     })
  //     .then((response) => {
  //       setHits(response.data.hits);
  //     })
  //     .catch(function (error) {
  //       console.log("ERROOO!!", error);
  //     })
  //     .finally(function () {
  //       setLoading(false);
  //     });
  // } else {
  //   setHits([]);
  //   setAgent(null);
  // }
}


