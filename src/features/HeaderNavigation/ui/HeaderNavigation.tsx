"use client";

import { Flex, Typography } from "antd";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ComponentSelectCity } from "@/entities/ComponentSelectCity";
const { Text } = Typography;

export default function HeaderNavigation({ params }: { params: any }) {
  const mobile = { flex: "100%" };
  const tablet = { flex: "50%" };

  const t = useTranslations();
  return (
    <>
    <Flex justify="space-between" align="center">
      <Flex justify="center" align="center" gap={"10px"}>
        <ComponentSelectCity params={params} />
        <Text>8888 888 88 88</Text>
      </Flex>
      {
      params?.mobile?.value !== "true" &&
      <Flex justify="center" align="center" gap={"10px"}>
        <Link href={`/`}>{t("o-nas")}</Link>

        <Link href={`/`}>{t("dostavka")}</Link>

        <Link href={`/`}>{t("oplata")}</Link>

        <Link href={`/`}>{t("nashi-garantii")}</Link>

        <Link href={`/`}>{t("kontakty")}</Link>
      </Flex>
      }
    </Flex>
    </>
  );
}
