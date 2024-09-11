"use client";

import { Dropdown, Button, Divider } from "antd";
import { DownOutlined } from "@ant-design/icons";
import React, {
  CSSProperties,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

import { Category } from "@/shared/types/category";
import RenderMenu from "./RenderMenu";
import MenuComponent from "./MenuComponent";
import { useLocale } from "next-intl";

const MenuWithOverflow = ({ selectCategory }: { selectCategory: Category }) => {
  const localActive = useLocale();
  const [visibleItems, setVisibleItems] = useState<Category[]>([]);
  const [hiddenItems, setHiddenItems] = useState<Category[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);

  const Categories = selectCategory?.children;

  // Функция для проверки переполнения
  const checkOverflow = useCallback(() => {
    if (Categories) {
      requestAnimationFrame(() => {
        const containerWidth = menuRef.current?.offsetWidth || 0;
        if (containerWidth === 0) return; // Если ширина 0, не продолжаем.

        let totalWidth = 0;
        const visible: Category[] = [];
        const hidden: Category[] = [];

        Array.from(menuRef.current?.childNodes || []).forEach(
          (child, index) => {
            const childElement = child as HTMLElement;
            const childWidth = childElement.offsetWidth;

            if (childWidth === 0) {
              console.error(
                `Item ${Categories[index]} не отображается или имеет ширину 0`
              );
              return;
            }

            if (totalWidth + childWidth <= containerWidth) {
              totalWidth += childWidth;
              visible.push(Categories[index]);
            } else {
              hidden.push(Categories[index]);
            }
          }
        );

        setVisibleItems(visible);
        setHiddenItems(hidden);
      });
    }
  }, [Categories]);

  useEffect(() => {
    if (Categories) {
      const observer = new ResizeObserver(checkOverflow);
      if (menuRef.current) {
        observer.observe(menuRef.current);
      }

      // Проверяем переполнение при первой загрузке с небольшой задержкой
      const timeoutId = setTimeout(() => {
        checkOverflow();
      }, 100);

      return () => {
        observer.disconnect();
        clearTimeout(timeoutId);
      };
    }
  }, [Categories, checkOverflow]);

  const ListStyle: CSSProperties = {
    position:"absolute",
    display: "flex",
    flexWrap: "nowrap",
    overflow: "hidden",
    width: "100%",
  };

  if (!Categories) return null;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden",
        width: "100%",
        height: 32,
      }}
    >
      <div style={{ ...ListStyle, zIndex: 0, height: 32 }} data-testid="final-menu">
        <RenderMenu Categories={visibleItems} role="navigation-element" />
      </div>
      <div ref={menuRef} style={{ ...ListStyle, height: 0,zIndex: 999 }} data-testid="prerender-menu">
        <RenderMenu Categories={Categories} role="prerender-navigation-element"/>
      </div>

      <Divider type="vertical" style={{ margin: "0 8px" }} />
      {hiddenItems.length > 0 && (
       <Dropdown menu={{ items: MenuComponent({ Categories: hiddenItems,localActive:localActive }) }}>
          <Button
            type="text"
            style={{
              backgroundColor: "#F5F5F5BF",
              border: "1px solid #AAABAD",
              zIndex: 2,
            }}
          >
            Ещё <DownOutlined />
          </Button>
        </Dropdown>
      )}
    </div>
  );
};

export default React.memo(MenuWithOverflow);
