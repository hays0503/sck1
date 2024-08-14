import useFetcherCity from "@/shared/api/fetch/city";
import { selectDataByLangCity } from "@/shared/tools/selectDataByLang";
import { iCity } from "@/shared/types/city";
import { Button, Space, Tag } from "antd";
import { useLocale } from "next-intl";

export default function ComponentSelectCityList({cities}: {cities: iCity[]}) {
  const currentLocale = useLocale();
  return (
    <>
      <Space size={[8, 16]} wrap>
        {cities?.map((city: iCity) => (
          <Button key={city.id}>
              {selectDataByLangCity(city, currentLocale)}
          </Button>
        ))}
      </Space>
    </>
  );
}
