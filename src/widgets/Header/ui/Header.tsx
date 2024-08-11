import { Button, Flex, Row, Col, Dropdown } from "antd";
import Image from "next/image";
import Link from "next/link";
import { DownOutlined } from '@ant-design/icons';

import type { MenuProps } from 'antd';
import { useTranslations } from "next-intl";

export default function Header() {
  const mobile = { flex: "100%" };
  const tablet = { flex: "50%" };

  const t = useTranslations();

  const accountItems: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Link href="/account">
          {t("akkaunt")}
        </Link>
      ),
    },
    {
      key: "1",
      label: (
        <Flex gap={"10px"}>
          <span>
            {t("vybrat-temu")}
          </span>
          {/* <ThemeSwitcher /> */}
        </Flex>
      ),
    },
    {
      key: "2",
      label: (
        <span>
        Русский{/* <LangSwitcher /> */}
        </span>
      ),
    },
  ];


  return (
    <div
      style={{
        margin: "10px 0px 10px 0px",
        paddingTop: "5px",
        paddingBottom: "5px",
        border: "1px solid #f0f0f0",
      }}
    >
      <Row
        gutter={{ xs: 24, lg: 11, xl: 0, xxl: 0 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Col xs={{...mobile,order:1}} md={{...mobile,order:1}} lg={{ flex: "10%",order:1 }} xl={{ flex: "15%",order:1 }}> <Flex justify="center" align="baseline">
            <Button
              icon={
                <Image
                  src={"/place.svg"}
                  width={24}
                  height={24}
                  alt="account"
                />
              }
            >
              {t('vybor-goroda')}
            </Button>
          </Flex>
        </Col>

        <Col xs={{...mobile,order:3}} md={{...mobile,order:3}} lg={{ flex: "auto",order:2 }}>
          <Row
            gutter={{ lg: 10 }}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Col xs={mobile} md={tablet} lg={{ flex: "7%" }}>
              <Flex justify="center">
                <Link href={`/`}>{t('otzyvy')}</Link>
              </Flex>
            </Col>
            <Col xs={mobile} md={tablet} lg={{ flex: "7%" }}>
              <Flex justify="center">
                <Link href={`/`}>{t('o-nas')}</Link>
              </Flex>
            </Col>
            <Col xs={mobile} md={tablet} lg={{ flex: "7%" }}>
              <Flex justify="center">
                <Link href={`/`}>{t('dostavka')}</Link>
              </Flex>
            </Col>
            <Col xs={mobile} md={tablet} lg={{ flex: "7%" }}>
              <Flex justify="center">
                <Link href={`/`}>{t('oplata')}</Link>
              </Flex>
            </Col>
            <Col
              xs={mobile}
              md={tablet}
              lg={{ flex: "16%" }}
              xl={{ flex: "13%" }}
              xxl={{ flex: "10%" }}
            >
              <Flex justify="center">
                <Link href={`/`}>{t('nashi-garantii')}</Link>
              </Flex>
            </Col>
            <Col
              xs={mobile}
              md={tablet}
              lg={{ flex: "14%" }}
              xl={{ flex: "11%" }}
              xxl={{ flex: "9%" }}
            >
              <Flex justify="center">
                <Link href={`/`}>{t('pochemu-my')}</Link>
              </Flex>
            </Col>
            <Col xs={mobile} md={tablet} lg={{ flex: "7%" }}>
              <Flex justify="center">
                <Link href={`/`}>{t('kontakty')}</Link>
              </Flex>
            </Col>
            <Col
              xs={mobile}
              md={tablet}
              lg={{ flex: "22%" }}
              xl={{ flex: "18%" }}
              xxl={{ flex: "13%" }}
            >
              <Flex justify="center">
                <Link href={`/`}>{t('ostavit-obrashenie')}</Link>
              </Flex>
            </Col>
          </Row>
        </Col>

        <Col xs={{...mobile,order:2}} md={{...mobile,order:2}} lg={{ flex: "15%",order:3 }} xl={{ flex: "15%",order:3 }}>
          <Dropdown id="accountDropdown" menu={{ items: accountItems }}>
            <Flex justify="center">
              <Image src={"/login.svg"} width={24} height={24} alt="account" />
              <>{t('lichnyi-kabinet')}</>
              <DownOutlined />
            </Flex>
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
}
