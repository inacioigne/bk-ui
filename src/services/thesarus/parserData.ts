function RemoveNull(obj: any) {
  const formData = Object.keys(obj).reduce((acc: any, key) => {
    if (obj[key] !== "") {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
  return formData;
}

export function ParserData(data: any) {
  // Parser Variant
  let variants = data["hasVariant"];
  let v = variants.filter(function (variant: any) {
    let value = variant.elementList[0].elementValue.value;
    if (value !== "") {
      return variant;
    }
  });
  if (v.length === 0) {
    delete data.hasVariant;
  } else {
    data["hasVariant"] = v;
  }

  let a = data.hasAffiliation;
  let hasAffiliation = a.filter((e: any) => {
    if (e.organization.label !== "") {
      return e;
    }
  });
  if (hasAffiliation.length === 0) {
    delete data.hasAffiliation;
  } else {
    data.hasAffiliation = hasAffiliation;
  }

  // Parser Uris
  let uris = [
    "hasCloseExternalAuthority",
    "identifiesRWO",
    "occupation",
    "fieldOfActivity",
  ];
  for (let [k, v] of Object.entries(data)) {
    if (uris.includes(k)) {
      let uri = v.filter((e: any) => {
        if (e.label !== "") {
          return e;
        }
      });
      if (uri.length === 0) {
        delete data[k];
      } else {
        data[k] = uri;
      }
    }
  }

  let formData = RemoveNull(data)

  return formData;
}
