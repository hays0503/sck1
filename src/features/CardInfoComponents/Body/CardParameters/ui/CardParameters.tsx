import style from "./CardParameters.module.scss";
import { Tooltip, Typography } from "antd";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ProductsDetail } from "@/shared/types/productsDetail";
import { Products } from "@/shared/types/products";
import { selectDataByLangProducts } from "@/shared/tools/selectDataByLang";

const { Text, Title } = Typography;

const CardParameters = ({params,product }: {params:any,product: ProductsDetail | null }) => {
  const t = useTranslations();
  const localActive = useLocale();

  return (
    <>
      <div className={style.Container}>
          <div className={style.ColorHeader}>
            <Text strong>{t("varianty-ispolneniya-komplektacii")}</Text>
          </div>
          <div className={style.ColorImageContainer}>
            <ul className={style.ListUl}>
              {product?.configuration.map((item: Products, index: number) => (
                <li key={index} className={style.Item}>
                  <Tooltip
                    placement="bottomLeft"
                    title={selectDataByLangProducts(item, localActive)}
                    arrow={true}
                  >
                    <a href={`/${localActive}/${params.city}/products/${item.slug}`}>
                      <Image
                        className={style.ColorImage}
                        src={item.list_url_to_image[0]}
                        alt={item.name_product}
                        width={54}
                        height={54}
                      />
                    </a>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </div>
      </div>
    </>
  );
};

export default CardParameters;
