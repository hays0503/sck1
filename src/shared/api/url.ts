
const ApiUrl = "http://pimenov.kz"

const UrlApi = {
    //Запрос всех городов    
    getCity: `/api/v1/citys/`,
    getCategory: `/api/v1/category/`,
    getPopulates: `/api/v1/populates/`,
    getProducts: `/api/v1/products/`,

    getBasketApi: `/basket_api/v1/bascket`,
}

const UrlApiWithDomain = {
    getCity: `${ApiUrl}${UrlApi.getCity}`,
    getCategory: `${ApiUrl}${UrlApi.getCategory}`,
    getPopulates: `${ApiUrl}${UrlApi.getPopulates}`,
    getProducts: `${ApiUrl}${UrlApi.getProducts}`,

    getBasketApi: `${ApiUrl}${UrlApi.getBasketApi}`,
}

const revalidateDefault = 3600

const UrlRevalidate = {
    getCity:{next:{
        tags:[`/api/v1/citys/`],revalidate:revalidateDefault
    }},
    getCategory:{next:{
        tags:[`/api/v1/category/`],revalidate:revalidateDefault
    }},
    getPopulates:{next:{
        tags:[`/api/v1/populates/`],revalidate:revalidateDefault
    }},
    getProducts:{next:{
        tags:[`/api/v1/product/`],revalidate:revalidateDefault
    }},
}

export  {UrlApiWithDomain,UrlApi,UrlRevalidate};