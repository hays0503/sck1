import { Category } from "@/shared/types/category";
import styles from "./CatalogSubMenu.module.scss";
import Link from "next/link";
import { Flex, Space, Typography } from "antd";
import Image from "next/image";

const { Text } = Typography;
export const CatalogSubMenu = ({ Categories }: { Categories: Category[] }) => {
  return (
    <>
      <div className={styles.CatalogSubMenuRoot}>
        <div className={styles.CatalogSubMenuMain}>
          {Categories.map((Category: Category) => (
            <div className={styles.CatalogSubMenuContainer} >
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
                  <Link href="#" style={{ color: "inherit" }}>
                    <Text underline style={{ color: "inherit" }}>
                      {Category.name_category}
                    </Text>
                  </Link>
                  </div>
                </Space>
              {Category.children.map((SubCategory: Category) => (
                <ul >
                  <li className={styles.listElementHover}>
                    <Link style={{ color: "inherit" }} href={"#"}>{SubCategory.name_category}</Link>
                  </li>
                </ul>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
