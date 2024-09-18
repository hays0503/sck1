"use client";
import { Category } from "@/shared/types/category";
import { selectDataByLangCategory } from "@/shared/tools/selectDataByLang";
import { ButtonNavigation } from "@/shared/ui/Components/ButtonNavigation";
import { MenuProps } from "antd"; // Используем MenuProps для типов элементов

const MenuComponent = ({ Categories, localActive }: { Categories: Category[], localActive: string }): MenuProps['items'] => {
  if (Categories.length === 0) return []; // Возвращаем пустой массив

  return Categories.map((item) => {
    if (!item) return null; // Если элемент не существует, возвращаем null

    const data: string | null = selectDataByLangCategory(item, localActive) ?? null;
    if (!data) return null; // Если данные не найдены, возвращаем null

    return {
      key: item.id.toString(), // Преобразуем ключ в строку
      label: (
        <ButtonNavigation
          item={data}
          style={{ width: "100%", height: "100%", padding: "0" }}
        />
      ),
    };
  }).filter(Boolean); // Убираем все null значения
};

export default MenuComponent;
