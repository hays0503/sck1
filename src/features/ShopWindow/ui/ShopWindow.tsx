import { CarouselShopSCK } from "@/entities/CarouselShopSCK";
import { ProductCard } from "@/entities/ProductCard";
import { useGetCityParams } from "@/shared/hook/useGetCityParams";
import useSelectCurrentCity from "@/shared/hook/useSelectCurrentCity";
import { Products } from "@/shared/types/products";
import { Flex } from "antd";

export default function ShopWindow({
  params,
  products,
}: {
  params: any;
  products: Products[];
}) {
  const currentCityEN = useGetCityParams();
  const currentCityRU = useSelectCurrentCity("en", currentCityEN)?.name_city!;
  const filteredProductsCurrentCity = products.filter((i: Products) => {
    return i?.price?.hasOwnProperty(currentCityRU);
  });
  const {deviceType} = JSON.parse(params.mobile.value);
  console.log("deviceType",deviceType)
  return (
    <Flex
      gap={"15px"}
      style={{
        width: "80%",
        backgroundColor: "#fffffff6",
      }}
    >
      <CarouselShopSCK deviceType={deviceType}>
        {filteredProductsCurrentCity.map((i: Products) => (
          <ProductCard key={i.id} product={i} currentCityRU={currentCityRU} />
        ))}
      </CarouselShopSCK>
    </Flex>
  );
}
