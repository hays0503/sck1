"use client";
import { selectDataByLangCategory } from "@/shared/tools/selectDataByLang";
import { Category } from "@/shared/types/category";
import { ButtonNavigation } from "@/shared/ui/Components/ButtonNavigation";
import { Button, Tooltip, Typography } from "antd";
import { useLocale } from "next-intl";
const { Text } = Typography;

const RenderMenu = ({ Categories, role }: { Categories: Category[], role?: string }) => {
  const localActive = useLocale();
  if (Categories.length === 0) return null;
  return (
    <>
      {Categories.map((item, index) => {
        const data: string = selectDataByLangCategory(item, localActive)!;
        return (
          <Tooltip title={data} placement="bottomLeft" key={index} style={{
            width: "100%",
            height: "100%",
            backgroundColor: "red",
          }}>
            <>
            <ButtonNavigation item={data} role={role} slug={item.slug}/>
            </>
          </Tooltip>
        );
      })}
    </>
  );
};

export default RenderMenu;
