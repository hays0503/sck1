import { Category } from "@/shared/types/category";
import { Flex, Space, Typography } from "antd";
import Link from "next/link";
import { CSSProperties, useEffect } from "react";
import { RightOutlined } from "@ant-design/icons";
import styles from "./CatalogNavigation.module.scss";
import Image from "next/image";
import { useHover } from "@uidotdev/usehooks";
const { Text } = Typography;
const CatalogNavigation = ({
  params,
  CategoriesData,
  HoveredElement,
  setHoveredElement,
  style,
}: {
  params: any;
  CategoriesData: Category[];
  HoveredElement: Category;
  setHoveredElement: (Category: Category) => void;
  style?: CSSProperties;
}) => {
  return (
    <>
      <nav style={style}>
        <ul style={{ listStyleType: "none", height: "100%", widows: "100%" }}>
          {CategoriesData.map((Category, index) => (
            <HoverdElement
              setHoveredElement={setHoveredElement}
              isHover={HoveredElement.id === Category.id}
              index={index}
              Category={Category}
            />
          ))}
          <li style={{ height: "100px" }}></li>
        </ul>
      </nav>
    </>
  );
};

export default CatalogNavigation;

const HoverdElement = ({
  setHoveredElement,
  index,
  Category,
  isHover,
}: {
  setHoveredElement: (Category: Category) => void;
  index: number;
  Category: Category;
  isHover: boolean;
}) => {
  const [ref, hovering] = useHover();
  useEffect(() => {
    setHoveredElement(Category);
  }, [hovering]);
  return (
    <li key={index} className={`${styles.navigationElement} ${styles.listElementHover}`} ref={ref} style={{
      color: isHover ? "#ffa600" : "#000000",
    }}>
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
          <Link href="#" style={{ color: "inherit" }}>
            <Text style={{ color: "inherit" }}>{Category.name_category}</Text>
          </Link>
        </Space>
        <RightOutlined />
      </Flex>
    </li>
  );
};
