import { Category } from "@/shared/types/category";
import { Flex, Space, Typography } from "antd";
import Link from "next/link";
import { RightOutlined } from "@ant-design/icons";
import styles from "./CatalogNavigation.module.scss";
import Image from "next/image";
import { selectDataByLangCategory } from "@/shared/tools/selectDataByLang";
import { useLocale } from "next-intl";
import React from "react";
const { Text } = Typography;

interface CatalogHoveredProps {
  setHoveredElement: (Category: Category) => void;
  Category: Category;
  isHover: boolean;
}

const CatalogHovered: React.FC<React.HTMLAttributes<HTMLLIElement> & CatalogHoveredProps> = (props) => {
  const { setHoveredElement, Category, isHover } = props;
  const localActive = useLocale();
   return (
    <li
      onMouseEnter={() => {
        setHoveredElement(Category);
      }}
      role="hover-element"
      className={`${styles.navigationElement} ${styles.listElementHover}`}
      style={{
        color: isHover ? "#ffa600" : "#000000",
      }}
    >
      <Flex justify="space-between" align="baseline">
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
          <Link
            href="#"
            style={{
              color: isHover ? "#ffa600" : "#000000",
            }}
          >
            <Text
              style={{
                color: isHover ? "#ffa600" : "#000000",
              }}
              role="navigation-item"
            >
              {selectDataByLangCategory(Category, localActive)}
            </Text>
          </Link>
        </Space>
        <RightOutlined />
      </Flex>
    </li>
  );
};

export default CatalogHovered;
