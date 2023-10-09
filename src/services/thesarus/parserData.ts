function RemoveNull(obj: any) {
    const formData = Object.keys(obj).reduce((acc:any, key) => {
      if (obj[key] !== "") {
       
        acc[key] = obj[key];
      }
      return acc;
    }, {});
    return formData
  }

export function ParserData(data: any) {

  let variants = data['hasVariant']
  if (variants[0].elementList[0].elementValue.value === '') {
    delete data.hasVariant
  } else {
    let arr = variants.map((e: any) => {
      e['variantLabel'] = e.elementList[0].elementValue.value
      return e
    })
    data['hasVariant'] = arr
  }

    for (const [chave, valor] of Object.entries(data)) {
      if (Array.isArray(valor)) {
        let arr = valor.map((e:any) => {
          for (let [chave, valor] of Object.entries(e)) {
            if (valor instanceof Object) {
              let obj = RemoveNull(valor)
              Object.keys(obj).length === 0 ? e[chave] = "" : e[chave] = obj
            } 
          }
          let obj = RemoveNull(e)
          if (Object.keys(obj).length === 0 ) {
            return null
          } else {
            return obj
          }          
        })
        if (arr[0] === null) {
          data[chave] = ""
        } else {
          data[chave] = arr
        }
      }
    }
  
    let formData = RemoveNull(data)


    return formData
  }