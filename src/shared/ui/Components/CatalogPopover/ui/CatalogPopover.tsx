import { Category } from "@/shared/types/category";
import { Popover } from "antd";
import CatalogNavigation from "./CatalogNavigation";
import { CatalogSubMenu } from "./CatalogSubMenu";

export default function CatalogPopover({
  params,
  children,
  isOpen,
  setIsOpen,
  CategoriesData,
  selectCategory,
  setSelectCategory,
}: {
  params: any;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  CategoriesData: Category[];
  selectCategory: Category;
  setSelectCategory: (data: Category) => void;
}) {

  return (
    <Popover
      trigger="click"
      placement="topLeft"
      overlayStyle={{
        left: "0px",
        width: "100dvw",
        height: "100dvh",
        overflow: "auto",
        position: "fixed"
      }}
      content={
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100dvh",
          }}
        >
          <CatalogNavigation
            params={params}
            CategoriesData={CategoriesData}
            HoveredElement={selectCategory}
            setHoveredElement={setSelectCategory}
            style={{
              width: "30%"
            }}
          />
          <CatalogSubMenu Categories={selectCategory.children} />
        </div>
      }
      arrow={false}
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}
    >
      {children}
    </Popover>
  );
}
