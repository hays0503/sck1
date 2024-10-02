import { ProductCard } from "@/entities/ProductCard";
import { useGetCityParams } from "@/shared/hook/useGetCityParams";
import useSelectCurrentCity from "@/shared/hook/useSelectCurrentCity";
import { Products } from "@/shared/types/products";
import { Col, Divider, Flex, Pagination, Row, Select } from "antd";

import { useLocale, useTranslations } from "next-intl";
import { FilterOutlined } from "@ant-design/icons";
import { useState } from "react";
const SortMenu: React.FC<{
  value: string;
  setValue: (value: string) => void;
}> = ({ value, setValue }) => {
  const localeActive = useLocale();
  const t = useTranslations();

  const items = [
    {
      value: "min_price",
      label: t("po-ubyvaniyu-ceny"),
    },
    {
      value: "max_price",
      label: t("po-vozrastaniyu-ceny"),
    },
    // {
    //   value: "3",
    //   label: t("bolee-populyarnye"),
    // },
    // {
    //   value: "4",
    //   label: t("menee-populyarnye"),
    // },
  ];
  return (
    <>
      <Flex justify="space-between" align="center" gap={"10px"}>
        <FilterOutlined style={{ fontSize: "20px" }} />
        <Select
          style={{ width: "200px" }}
          options={items}
          placement="bottomRight"
          defaultValue={"min_price"}
          onChange={(value: string) => setValue(value)}
        />
      </Flex>
    </>
  );
};

export default function ProductShowcase({
  params,
  products,
}: {
  params: any;
  products: Products[];
}) {
  const [sort, setSort] = useState<string>("min_price");
  const [pagination, setPagination] = useState<number>(1);
  const currentCityEN = useGetCityParams();
  const currentCityRU = useSelectCurrentCity("en", currentCityEN)?.name_city!;
  // Нам нечего демонстрировать
  if (products.length === 0) {
    return null;
  }

  const filteredProductsCurrentCity = products.filter((i: Products) => {
    return i?.price?.hasOwnProperty(currentCityRU);
  });

  const sortProductsMinFunc = (a: Products, b: Products) => {
    return (a?.price?.[currentCityRU] ?? 0) - (b?.price?.[currentCityRU] ?? 0);
  };

  const sortProductsMaxFunc = (a: Products, b: Products) => {
    return sortProductsMinFunc(b, a);
  };

  const sortFunc: { [key: string]: (a: Products, b: Products) => number } = {
    "min_price": sortProductsMinFunc,
    "max_price": sortProductsMaxFunc,
  };

  const sortData = filteredProductsCurrentCity.sort(sortFunc[sort]);

  const productsPerPage = 12;

  const productsAfterPagination = sortData.slice(
    (pagination - 1) * productsPerPage,
    pagination * productsPerPage
  );

  return (
    <Flex
      vertical={true}
      gap={"15px"}
      style={{
        width: "80%",
        minHeight: "500px",
        marginBottom: "25px"
      }}
      justify="space-between"
    >
      <Flex justify="flex-end" style={{ width: "100%", height: "35px" }}>
        <SortMenu value={sort} setValue={setSort} />
      </Flex>
      <Row gutter={[8, 8]}>
        {productsAfterPagination.map((i: Products) => (
          <Col span={6} key={i.id}>
            <ProductCard
              key={i.id}
              product={i}
              currentCityRU={currentCityRU}
              params={params}
            />
          </Col>
        ))}
      </Row>
      <Pagination

      align="center"
      defaultCurrent={1}
      total={filteredProductsCurrentCity.length}
      onChange={(page: number) => setPagination(page)}
      />
    </Flex>
  );
}
