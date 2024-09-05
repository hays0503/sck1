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
      <nav style={style}>
        <ul style={{ listStyleType: "none", height: "100%", widows: "100%" }}>
          {CategoriesData.map((Category, index) => (
            <CatalogHovered
              setHoveredElement={setHoveredElement}
              isHover={HoveredElement.id === Category.id}
              key={index}
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

