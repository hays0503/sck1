import { ProductsDetail } from "@/shared/types/productsDetail";
import { CustomCarousel } from "../CustomCarousel";
import style from "./Body.module.scss";
import { Flex } from "antd";
import { CardParameters } from "../CardParameters";
import { ConstInfo } from "../ConstInfo";
import { useGetCityParams } from "@/shared/hook/useGetCityParams";
import useSelectCurrentCity from "@/shared/hook/useSelectCurrentCity";
import { Description } from "../Description";
import CardPresent from "../CardPresent/ui/CardPresent";
import { Specifications } from "../Specifications";
const Body = ({
  product,
  params,
}: {
  product: ProductsDetail;
  params: any;
}) => {
  const currentCityEN = useGetCityParams();
  const currentCityRU = useSelectCurrentCity("en", currentCityEN)?.name_city!;
  return (
    <>
      <div className={style.MainInfoBlock}>
        <div className={style.MainInfo}>
          {/* Кастомная карусель */}
          {product?.list_url_to_image && (
            <CustomCarousel
              images={
                product.list_url_to_image.length > 0
                  ? product.list_url_to_image
                  : ["/cat404.svg"]
              }
            />
          )}

          {/* Параметры */}
          {product?.configuration.length !== 0 && (
            <CardParameters params={params} product={product} />
          )}
        </div>

        {/* Описание цены*/}
        <div
          className={
            style.ContainerComponentProductPageMainContentCostAndPresent
          }
        >
          <ConstInfo product={product} currentCity={currentCityRU} />
        </div>
      </div>
      {/* Описание товара */}
      <div className={style.Info}>
        <Flex vertical={true} style={{ width: "100%" }}>
          {product && <Description productDescription={product?.description} />}
          {product && <Specifications productId={product?.id} />}
        </Flex>
      </div>{" "}
    </>
  );
};

export default Body;
