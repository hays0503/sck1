
const ApiUrl = "http://pimenov.kz"

const UrlApi = {
    //Запрос всех городов    
    getCity: `/api/v1/citys/`,
    getCategory: `/api/v1/category/`,
}

const UrlApiWithDomain = {
    getCity: `${ApiUrl}${UrlApi.getCity}`,
    getCategory: `${ApiUrl}${UrlApi.getCategory}`,
}

const revalidateDefault = 3600

const UrlRevalidate = {
    getCity:{next:{
        tags:[`/api/v1/citys/`],revalidate:revalidateDefault
    }},
    getCategory:{next:{
        tags:[`/api/v1/category/`],revalidate:revalidateDefault
    }},
}

export  {UrlApiWithDomain,UrlApi,UrlRevalidate};