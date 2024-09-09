"use client";
import { Menu } from "antd";
import { useLocale } from "next-intl";
import { Category } from "@/shared/types/category";
import { selectDataByLangCategory } from "@/shared/tools/selectDataByLang";
import { ButtonNavigation } from "@/shared/ui/Components/ButtonNavigation";
const MenuComponent = ({ Categories }: { Categories: Category[] }) => {
    const localActive = useLocale();
    if (Categories.length === 0) return [];
    return Categories.map((item) => {
      if (!item) return {};
      const data: string = selectDataByLangCategory(item, localActive)!;
      return {
        key: item.id,
        label: (
            <ButtonNavigation
              item={data}
              style={{ width: "100%", height: "100%", padding: "0" }}
            />
        ),
      };
    });
  };
export default MenuComponent;