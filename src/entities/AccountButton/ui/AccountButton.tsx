"use client";
import { useGetCityParams } from "@/shared/hook/useGetCityParams";
import { Button,Typography } from "antd";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

const { Text } = Typography

export default function AccountButton() {
  const t = useTranslations();
  const localeActive = useLocale();
  const currentCity = useGetCityParams(); 
  return (
    <Button
    icon={<Image src="/login.svg" width={32} height={32} alt="login" />}
    size="large"
    onClick={()=>{
      window.location.replace(`/${localeActive}/${currentCity}/account`)
    }}
  >
    <Text>{t('lichnyi-kabinet')}</Text>
  </Button>
  )
}
