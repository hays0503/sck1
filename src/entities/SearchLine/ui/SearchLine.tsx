"use client";
import { Input } from "antd";
import { useTranslations } from "next-intl";

const { Search } = Input;

export default function SearchLine({ params }: { params: any }) {
  const t = useTranslations();
  const { isMobileDevice } = JSON.parse(params.mobile.value);
  if (!isMobileDevice) {
    return <Search
      placeholder={t("placeholder-search")}
      enterButton={t("search")}
      size="large"
      role="search"      
      disabled={true}
    />
  }
  return <Search
        placeholder={t("placeholder-search")}
        size="large"
        role="search"
        disabled={true}
      />
}
