"use server";

import { Button, Flex, Row, Col, Dropdown } from "antd";
import Image from "next/image";
import Link from "next/link";
import { DownOutlined } from '@ant-design/icons';

import type { MenuProps } from 'antd';

export default async function Header() {
  const mobile = { flex: "100%" };
  const tablet = { flex: "50%" };

  const accountItems: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Link href="/account">
          123
          {/* {t("akkaunt")} */}
        </Link>
      ),
    },
    {
      key: "1",
      label: (
        <Flex gap={"10px"}>
          <span>
            321
            {/* {t("vybrat-temu")} */}
          </span>
          {/* <ThemeSwitcher /> */}
        </Flex>
      ),
    },
    {
      key: "2",
      label: (
        <>
        123
          {/* <LangSwitcher /> */}
        </>
      ),
    },
  ];

  return (
    <div
      style={{
        margin: "10px 0px 10px 0px",
        paddingTop: "5px",
        paddingBottom: "5px",
        boxShadow: "1px 4px 8px 0px rgba(34, 60, 80, 0.2)",
      }}
    >
      <Row
        gutter={{ xs: 24, lg: 11, xl: 0, xxl: 0 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Col xs={mobile} md={mobile} lg={{ flex: "10%" }} xl={{ flex: "15%" }}>
          <Flex justify="center" align="baseline">
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
              Выбор города
            </Button>
          </Flex>
        </Col>

        <Col lg={{ flex: "auto" }}>
          <Row
            gutter={{ lg: 10 }}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Col xs={mobile} md={tablet} lg={{ flex: "7%" }}>
              <Flex justify="center">
                <Link href={`/`}>Отзывы</Link>
              </Flex>
            </Col>
            <Col xs={mobile} md={tablet} lg={{ flex: "7%" }}>
              <Flex justify="center">
                <Link href={`/`}>О нас</Link>
              </Flex>
            </Col>
            <Col xs={mobile} md={tablet} lg={{ flex: "7%" }}>
              <Flex justify="center">
                <Link href={`/`}>Доставка</Link>
              </Flex>
            </Col>
            <Col xs={mobile} md={tablet} lg={{ flex: "7%" }}>
              <Flex justify="center">
                <Link href={`/`}>Оплата</Link>
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
                <Link href={`/`}>Наши гарантии</Link>
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
                <Link href={`/`}>Почему мы?</Link>
              </Flex>
            </Col>
            <Col xs={mobile} md={tablet} lg={{ flex: "7%" }}>
              <Flex justify="center">
                <Link href={`/`}>Контакты</Link>
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
                <Link href={`/`}>Оставить обращение</Link>
              </Flex>
            </Col>
          </Row>
        </Col>

        <Col xs={mobile} md={mobile} lg={{ flex: "15%" }} xl={{ flex: "15%" }}>
          <Dropdown menu={{ items: accountItems }}>
            <Flex justify="center">
              <Image src={"/login.svg"} width={24} height={24} alt="account" />
              <>Личный кабинет</>
              <DownOutlined />
            </Flex>
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
}
