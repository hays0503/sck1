"use client";
import { selectDataByLangCity } from "@/shared/tools/selectDataByLang";
import { iCity } from "@/shared/types/city";
import { Button, Form, Space } from "antd";
import { useLocale } from "next-intl"; 
import { usePathname, useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";
import { v4 as uuidv4 } from "uuid";

export default function ComponentSelectCityList({
  cities,
}: {
  cities: iCity[];
}) {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname()
  const [value, setValue] = useLocalStorage("uuid_id", uuidv4);
  return (
    <>
      <Space size={[8, 16]} wrap>
        {cities?.map((city: iCity) => (
          <Button
            key={city.id}
            data-testid="btn-city"
            onClick={(e) => {
              setValue(uuidv4());
              const url = `/${currentLocale}/${city.additional_data.EN}`; 
              window.location.replace(url);
            }}
          >
            {selectDataByLangCity(city, currentLocale)}
          </Button>
        ))}
      </Space>
    </>
  );
}
