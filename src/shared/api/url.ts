const ApiUrl = "http://pimenov.kz";

const UrlApi = {
  //Запрос всех городов
  getCity: `/api/v1/citys/`,
  getCategory: `/api/v1/category/`,
  getPopulates: `/api/v1/populates/`,
  getProducts: `/api/v1/products/`,

  getBasketApi: `/basket_api/v1/bascket`,

  getUserInfoApi: `/auth_api/v1/user/info`,
  getUserRefreshTokenApi: `/auth_api/v1/token/refresh`,

  getUserUrlGoogle: `/auth_api/v1/auth_user/login/google`,
  getUserAuthGoogle: `/auth_api/v1/auth_user/auth/google`,

  getUserSmsUrl: `/auth_api/v1/auth_user/login/phone`,
  getUserSmsAuth: `/auth_api/v1/auth_user/auth/phone`,

};

const UrlApiWithDomain = {
  getCity: `${ApiUrl}${UrlApi.getCity}`,
  getCategory: `${ApiUrl}${UrlApi.getCategory}`,
  getPopulates: `${ApiUrl}${UrlApi.getPopulates}`,
  getProducts: `${ApiUrl}${UrlApi.getProducts}`,

  getBasketApi: `${ApiUrl}${UrlApi.getBasketApi}`,

  getUserInfoApi: `${ApiUrl}${UrlApi.getUserInfoApi}`,

  getUserUrlGoogle: `${ApiUrl}${UrlApi.getUserUrlGoogle}`,
  getUserAuthGoogle: `${ApiUrl}${UrlApi.getUserAuthGoogle}`,

  getUserSmsUrl: `${ApiUrl}${UrlApi.getUserSmsUrl}`,
  getUserSmsAuth: `${ApiUrl}${UrlApi.getUserSmsAuth}`,

  getUserRefreshTokenApi: `${ApiUrl}${UrlApi.getUserRefreshTokenApi}`,
};

const revalidateDefault = 3600;

const UrlRevalidate = {
  getCity: {
    next: {
      tags: [`/api/v1/citys/`],
      revalidate: revalidateDefault,
    },
  },
  getCategory: {
    next: {
      tags: [`/api/v1/category/`],
      revalidate: revalidateDefault,
    },
  },
  getPopulates: {
    next: {
      tags: [`/api/v1/populates/`],
      revalidate: revalidateDefault,
    },
  },
  getProducts: {
    next: {
      tags: [`/api/v1/product/`],
      revalidate: revalidateDefault,
    },
  },
};

export { UrlApiWithDomain, UrlApi, UrlRevalidate };
