"use client";
import { ConfigProvider, Input } from "antd";
import { useTranslations } from "next-intl";

const { Search } = Input;

export default function SearchLine({ params }: { params: any }) {
  const t = useTranslations();
  return (
    <ConfigProvider theme={{ cssVar: true}}>
      <Search
        placeholder={t("placeholder-search")}
        enterButton={t("search")}
        size="large"
        disabled={true}
      />
    </ConfigProvider>
  );
}
