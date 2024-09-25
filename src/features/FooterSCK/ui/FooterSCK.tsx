"use client";
import React from "react";
import { Row, Col, Typography, Flex } from "antd";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import style from "./FooterSCK.module.scss";
import { LogoSCK } from "@/entities/LogoSCK";
const { Title, Text } = Typography;

export default function FooterSCK({ params }: { params: any }) {
  
  const t = useTranslations();

  const localActive = useLocale();
  return (
    <div className={style.footer}>
      <Flex justify="center" align="center" style={{padding:"20px"}}>
        <LogoSCK params={params} />
      </Flex>
      <div style={{ width: "95%" }}>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={6} className={style.column}>
            <Title level={5}>{t("kompaniya")}</Title>
            <ul>
              <li>
                <Link href={`/${localActive}/${params.city}/about`}>
                  {t("o-nas-0")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${localActive}/${params.city}/about-our-guarantees`}
                >
                  {t("nashi-garantii")}
                </Link>
              </li>
              <li>
                <Link href={`/${localActive}/${params.city}/contact`}>
                  {t("kontakty-0")}
                </Link>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6} className={style.column}>
            <Title level={5}>{t("pomosh")}</Title>
            <ul>
              <li>
                <Link href={`/${localActive}/${params.city}/about-pays`}>
                  {t("oplata")}
                </Link>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6} className={style.column}>
            <Title level={5}>{t("internet-magazin")}</Title>
            <ul>
              <li>
                <Text>{t("svyazhites-s-nami")}</Text>
              </li>
              <li>
                <Text>+7 705 655 00 00</Text>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6} className={style.column}>
            <Title level={5}>
              TOO «SCK» (ЭсСиКей) Sales Center of Kazakhstan
            </Title>
            <p>
              <Text>БИН 160 440 027 443</Text>
            </p>
            <p>
              <Link href={`/${localActive}/${params.city}/user-agreement`}>
                {t("polzovatelskoe-soglashenie")}
              </Link>
            </p>
            <p>
              <Link href={`/${localActive}/${params.city}/privacy-policy`}>
                {t("politika-konfidencialnosti")}
              </Link>
            </p>
          </Col>
        </Row>
      </div>
      <div className={style.footerBottom}>
        <Text> {t("c-2024-sck-essikei-zona-unikalnykh-cen")}</Text>
      </div>
    </div>
  );
}
