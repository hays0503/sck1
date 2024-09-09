"use client";
import { Button,Typography } from "antd";
import { useTranslations } from "next-intl";
import Image from "next/image";

const { Text } = Typography

export default function AccountButton() {
  const t = useTranslations();
  return (
    <Button
    icon={<Image src="/login.svg" width={32} height={32} alt="login" />}
    size="large"
  >
    <Text>{t('lichnyi-kabinet')}</Text>
  </Button>
  )
}
