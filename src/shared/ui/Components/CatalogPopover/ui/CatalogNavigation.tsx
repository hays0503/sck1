import { Category } from "@/shared/types/category";
import { CSSProperties } from "react";
import CatalogHovered from "./CatalogHovered";

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
      <nav style={{...style,overflow:"auto"}}>
        <ul style={{ listStyleType: "none", height: "100dvh", width: "100%" }}>
          {CategoriesData.map((item, index) => (
            <CatalogHovered
              setHoveredElement={setHoveredElement}
              isHover={HoveredElement.id === item.id}
              key={index}
              Category={item}
            />
          ))}
          <li style={{ height: "100px" }}></li>
        </ul>
      </nav>
    </>
  );
};

export default CatalogNavigation;

