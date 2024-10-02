import { Category } from "@/shared/types/category";
import styles from "./CatalogSubMenu.module.scss";
import Link from "next/link";
import { Space, Typography } from "antd";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { selectDataByLangCategory } from "@/shared/tools/selectDataByLang";
import { useGetCityParams } from "@/shared/hook/useGetCityParams";

const { Text } = Typography;
export const CatalogSubMenu = ({ Categories }: { Categories: Category[] }) => {
  const localActive = useLocale();
  const currentCity = useGetCityParams();
  return (
    <>
      <div className={styles.CatalogSubMenuRoot}>
        <div className={styles.CatalogSubMenuMain}>
          {Categories.map((Category: Category) => (
            <div className={styles.CatalogSubMenuContainer} key={Category.id}>
              <Space>
                {Category.list_url_to_image[0] && (
                  <Image
                    alt="image icon"
                    priority={true}
                    width={32}
                    height={32}
                    src={Category.list_url_to_image[0]}
                  />
                )}
                <div className={styles.listElementHover}>
                  <Link
                    href={`/${localActive}/${currentCity}/catalog/${Category.slug}`}
                    style={{ color: "inherit" }}
                  >
                    <Text underline style={{ color: "inherit" }}>
                      {selectDataByLangCategory(Category, localActive)}
                    </Text>
                  </Link>
                </div>
              </Space>
              <ul role="navigation-list">
                {Category.children.map((SubCategory: Category) => (
                  <li
                    role="navigation-element"
                    key={SubCategory.id}
                    className={styles.listElementHover}
                  >
                    <Link 
                    style={{ color: "inherit" }}
                    href={`/${localActive}/${currentCity}/catalog/${SubCategory.slug}`}>
                      {selectDataByLangCategory(SubCategory, localActive)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
