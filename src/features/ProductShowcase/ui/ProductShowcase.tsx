
import { CarouselShopSCK } from "@/entities/CarouselShopSCK";
import { ProductCard } from "@/entities/ProductCard";
import { useGetCityParams } from "@/shared/hook/useGetCityParams";
import useSelectCurrentCity from "@/shared/hook/useSelectCurrentCity";
import { Products } from "@/shared/types/products";
import { Flex } from "antd";


export default function ProductShowcase({
  params,
  products,
}: {
  params: any;
  products: Products[];
}) {
  const currentCityEN = useGetCityParams();
  const currentCityRU = useSelectCurrentCity("en", currentCityEN)?.name_city!;
  // Нам нечего демонстрировать 
  if (products.length === 0) {
    return null;
  }

  const filteredProductsCurrentCity = products.filter((i: Products) => {
    return i?.price?.hasOwnProperty(currentCityRU);
  });
  const {deviceType} = JSON.parse(params.mobile.value);
  return (
    <Flex
      gap={"15px"}
      style={{
        width: "80%",
        backgroundColor: "#fffffff6",
      }}
    >
        {filteredProductsCurrentCity.map((i: Products) => (
          <ProductCard key={i.id} product={i} currentCityRU={currentCityRU} params={params}/>
        ))}
    </Flex>
  );
}
