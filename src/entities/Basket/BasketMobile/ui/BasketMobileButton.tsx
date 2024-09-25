"use client";

import { useBasketView } from "@/shared/hook/useBasket";
import { Badge } from "antd";

export default function BasketMobileButton({ children }: any) {
  const basket = useBasketView().get.basketGet;

  const badgeCount = basket?.basket_items?.reduce(
    (acc: number, item: any) => acc + item.count,
    0
  );

  return (
    <Badge count={badgeCount} size="small">
      {children}
    </Badge>
  );
}
