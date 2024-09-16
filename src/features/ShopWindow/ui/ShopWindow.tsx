import { ProductCard } from "@/entities/ProductCard";
import { Products } from "@/shared/types/products";
import { Flex } from "antd";

export default function ShopWindow({
  params,
  products,
}: {
  params: any;
  products: Products[];
}) {
  return (
    <Flex gap={"15px"} style={{
      width: "80%",
    }}>
      {products.map((i: Products) => (
        <ProductCard key={i.id} product={i} />
      ))}
    </Flex>
  );
}
