"use client";

import { Flex, Typography } from "antd";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ComponentSelectCity } from "@/entities/ComponentSelectCity";
import { CSSProperties } from "react";
const { Text } = Typography;

export default function HeaderNavigation({ params, style }: { params: any,style?:CSSProperties }) {
  const mobile = { flex: "100%" };
  const tablet = { flex: "50%" };
  const t = useTranslations();
  const {isMobileDevice} = JSON.parse(params.mobile.value);
  return (
    <>
    <Flex justify="space-between" align="center" style={style}>
      <Flex justify="flex-start" align="center" gap={"10px"}>
        <ComponentSelectCity params={params} />
        <Text>8888 888 88 88</Text>
      </Flex>
      {
      isMobileDevice !== "true" &&
      <Flex justify="center" align="center" gap={"10px"}>
        <Link href={`/`}><Text>{t("o-nas")}</Text></Link>

        <Link href={`/`}><Text>{t("dostavka")}</Text></Link>

        <Link href={`/`}><Text>{t("oplata")}</Text></Link>

        <Link href={`/`}><Text>{t("nashi-garantii")}</Text></Link>

        <Link href={`/`}><Text>{t("kontakty")}</Text></Link>
      </Flex>
      }
    </Flex>
    </>
  );
}
