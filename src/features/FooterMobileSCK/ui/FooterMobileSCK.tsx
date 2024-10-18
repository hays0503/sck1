"use client";
import { Flex, List, Tabs, Typography } from "antd";
import Image from "next/image";
import { useState, CSSProperties } from "react";
import style from "./FooterMobileSCK.module.scss";
import { CatalogMobile } from "@/entities/CatalogMobile";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { LangSwitcher } from "@/entities/LangSwitcher";
import BasketMobileButton from "@/entities/Basket/BasketMobile/ui/BasketMobileButton";
import { BasketBody } from "@/entities/Basket/BasketBody";

const { Text } = Typography;

export default function FooterMobileSCK({ params }: { params: any }) {

  const { isMobileDevice } = JSON.parse(params.mobile.value);

  const t = useTranslations();
  const [current, setCurrent] = useState<string>("1");
  const localActive = useLocale();

  if (!isMobileDevice) {
    return <></>;
  }

  const returnStyleActive = (key: string): CSSProperties => {
    return {
      color: key === current ? "#3F54CF" : "#8E8E8E",
    };
  };

  const returnStyleActiveAccent = (key: string): string => {
    return key === current ? "#3F54CF" : "#8E8E8E";
  };

  const returnStyleActiveBg = (key: string): string => {
    return key === current ? "#A53594" : "#8E8E8E";
  };

  const accountItems = [
    <Link key={"account"} href={`/${localActive}/${params.city}/account`}>{t("akkaunt")}</Link>,
    <LangSwitcher key={"lang"} params={params} />,
    <List.Item key="requisites">
      <Text strong>{t("rekvizity")}</Text>
      <Text>
        ТОО «SCK»<br />
        БИН 160440027443<br />
        Республика Казахстан, г. Петропавловск, ул. Букетова 31А, БЦ «Алем», офис 5<br />
        Тел. +7 705 655 00 00, +7 705 552 21 57<br />
        www.sck-1.kz<br />
        АО "Народный Банк Казахстана"<br />
        БИК HSBKKZKX<br />
        ИИК KZ93601A251001294031
      </Text>
    </List.Item>,
  ];

  const styleContainer: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#FFFFFF",
    zIndex: 1000,
  };

  return (
    <div      
      id={style.mobile}
      style={{...styleContainer}}
    >
      <Tabs
        style={{ "--ant-tabs-horizontal-item-gutter": "3.5dvw" } as CSSProperties}
        accessKey={current}
        onTabClick={(key) => setCurrent(key)}
        size="small"
        centered
        tabPosition="bottom"
        items={[
          {
            label: (
              <Flex vertical={true} gap={"10px"} align="center">
                <Image src="/logo.svg" alt="logo" height={24} width={43} />
                <Text style={returnStyleActive("1")}>{t('glavnaya')}</Text>
              </Flex>
            ),
            key: "1",
          },
          {
            label: (
              <Flex vertical={true} gap={"10px"} align="center">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.75 13V13.12C3.68 13.12 4.25 13.61 4.25 14.66V15H6.25V13H2.75ZM10.25 9H18.25V7H10.25V9ZM22.25 5H10.25V3H22.25V5ZM2.25 12C2.25 11.45 2.7 11 3.25 11H7.25C7.8 11 8.25 11.45 8.25 12V16C8.25 16.55 7.8 17 7.25 17H3.25C2.7 17 2.25 16.55 2.25 16V12ZM2.75 5V5.12C3.68 5.12 4.25 5.61 4.25 6.66V7H6.25V5H2.75ZM2.25 4C2.25 3.45 2.7 3 3.25 3H7.25C7.8 3 8.25 3.45 8.25 4V8C8.25 8.55 7.8 9 7.25 9H3.25C2.7 9 2.25 8.55 2.25 8V4Z"
                    fill={returnStyleActiveBg("2")}
                  />
                  <path
                    d="M12.9901 17.8502L12.4001 13.1502L17.1001 13.7402L16.5401 14.2902C16.1501 14.6802 16.1501 15.3202 16.5401 15.7102L18.8401 18.0002L17.2501 19.5902L14.9601 17.2902C14.5701 16.9002 13.9401 16.9002 13.5401 17.2902L12.9901 17.8502ZM11.3801 11.0102C10.6701 10.9202 10.1801 11.4702 10.2601 12.1202L11.2601 20.1202C11.3701 20.9902 12.3701 21.3002 12.9601 20.7102L14.2501 19.4102L16.5401 21.7102C16.9401 22.1002 17.5701 22.1002 17.9601 21.7102L20.9601 18.7102C21.3501 18.3202 21.3501 17.6802 20.9601 17.2902L18.6701 15.0002L19.9601 13.7102C20.5701 13.1002 20.2201 12.1102 19.3801 12.0102L11.3801 11.0102Z"
                    fill={returnStyleActiveAccent("2")}
                  />
                </svg>
                <Text style={returnStyleActive("2")}>{t('katalog')}</Text>
              </Flex>
            ),
            key: "2",
            children: <CatalogMobile params={params} />,
          },
          {
            label: (
              <BasketMobileButton>
                <Flex vertical={true} gap={"10px"} align="center">
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.30847 18.71L4.70847 10.71H20.2685L18.6685 18.71H6.30847ZM5.48847 20.71H19.4885C20.0285 20.71 20.3685 20.42 20.4685 19.91L22.4285 10.11C22.5385 9.58 22.4385 9.24 22.0485 8.85L15.1985 2L13.7785 3.42L18.1085 7.74C18.8285 8.46 19.5085 8.59 20.5285 8.59V8.71H4.45847V8.59C5.47847 8.59 6.15847 8.46 6.87847 7.74L11.1985 3.42L9.77847 2L2.90847 8.82C2.49847 9.23 2.43847 9.57 2.54847 10.11L4.50847 19.91C4.60847 20.42 4.94847 20.71 5.48847 20.71Z"
                      fill={returnStyleActiveBg("3")}
                    />
                    <path
                      d="M9.49847 23C10.3289 23 10.9985 22.3284 10.9985 21.5C10.9985 20.6716 10.3289 20 9.49847 20C8.67006 20 7.99847 20.6716 7.99847 21.5C7.99847 22.3284 8.67006 23 9.49847 23Z"
                      fill={returnStyleActiveAccent("3")}
                    />
                    <path
                      d="M16.9985 23C17.8289 23 18.4985 22.3284 18.4985 21.5C18.4985 20.6716 17.8289 20 16.9985 20C16.1701 20 15.4985 20.6716 15.4985 21.5C15.4985 22.3284 16.1701 23 16.9985 23Z"
                      fill={returnStyleActiveAccent("3")}
                    />
                  </svg>
                  <Text style={returnStyleActive("3")}>{t('korzina')}</Text>
                </Flex>
              </BasketMobileButton>
            ),
            key: "3",
            children: <BasketBody params={params}/>,
          },
          {
            label: (
              <Flex vertical={true} gap={"10px"} align="center">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.74967 12.9946C5.75012 12.9946 6.70769 13.1425 7.61181 13.4133C7.81756 13.4744 8.04125 13.4156 8.18767 13.2672C9.21695 12.2275 10.4261 11.3795 11.7725 10.7665L11.8545 10.73C12.5653 10.4175 13.3497 10.23 14.1667 10.23C14.9837 10.23 15.7681 10.4175 16.4789 10.73L16.5609 10.7665C17.9074 11.3795 19.1165 12.2275 20.1458 13.2672C20.2922 13.4156 20.5159 13.4744 20.7216 13.4133C21.6258 13.1425 22.5833 12.9946 23.5838 12.9946C23.8782 12.9946 24.1248 12.7498 24.1248 12.4546C24.1248 7.73695 20.2162 3.92461 15.4997 3.92461H12.8338H9.16666C4.45014 3.92461 0.541534 7.73695 0.541534 12.4546C0.541534 12.7498 0.788098 12.9946 1.08249 12.9946H4.74967ZM2.20833 8.54631C2.20833 6.2541 4.04772 4.42461 6.33333 4.42461C8.61903 4.42461 10.4583 6.2541 10.4583 8.54631C10.4583 10.8385 8.61903 12.668 6.33333 12.668C4.04772 12.668 2.20833 10.8385 2.20833 8.54631Z"
                    fill={returnStyleActiveBg("4")}
                  />
                  <path
                    d="M20.8333 12.7913C22.1961 12.7913 23.3333 11.654 23.3333 10.2913C23.3333 8.92858 22.1961 7.79132 20.8333 7.79132C19.4706 7.79132 18.3333 8.92858 18.3333 10.2913C18.3333 11.654 19.4706 12.7913 20.8333 12.7913Z"
                    fill={returnStyleActiveAccent("4")}
                  />
                  <path
                    d="M7.49967 22.9996C9.01915 22.9996 10.2497 21.7685 10.2497 20.2478C10.2497 18.727 9.01915 17.496 7.49967 17.496C5.98018 17.496 4.74967 18.727 4.74967 20.2478C4.74967 21.7685 5.98018 22.9996 7.49967 22.9996Z"
                    fill={returnStyleActiveAccent("4")}
                  />
                </svg>
                <Text style={returnStyleActive("4")}>{t('profil')}</Text>
              </Flex>
            ),
            key: "4",
            children: (
              <List
                size="small"
                dataSource={accountItems}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            ),
          },
        ]}
      />
    </div>
  );
}
