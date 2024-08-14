
const ApiUrl = "http://pimenov.kz"

const UrlApi = {
    //Запрос всех городов    
    getCity: `/api/v1/citys/`,
}

const UrlApiWithDomain = {
    getCity: `${ApiUrl}${UrlApi.getCity}`,
}

export  {UrlApiWithDomain,UrlApi};