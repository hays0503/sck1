"use client";

import { BasketBody } from "@/entities/Basket/BasketBody";
import useFetcherCity from "@/shared/api/fetch/city";
import { UrlApi } from "@/shared/api/url";
import { selectDataByLangCity } from "@/shared/tools/selectDataByLang";
import { iCity } from "@/shared/types/city";
import SmsCode from "@/widgets/Login/ui/SmsCode";
import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Spin,
  message,
  notification,
} from "antd";
import { useLocale, useTranslations } from "next-intl";
import { Suspense, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";

export default function Order({ params }: { params: any }) {
  const [api, contextHolder] = notification.useNotification();
  const locale = useLocale();
  const t = useTranslations();

  const { data: citiesData } = useFetcherCity();
  const cities: iCity[] = citiesData ?? [];

  type FieldType = {
    name: string;
    phone: string;
    email: string;
    city: string;
    address: string;
    comment?: string;
    delivery_type: "DELIVERY" | "PICKUP";
    cash_on_delivery: boolean;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumberId, setPhoneNumberId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formData, setFormData] = useState<FieldType>();
  const uuid_id = useReadLocalStorage("uuid_id");

  const handleSmsSubmit = async (phoneNumber: string) => {
    const response = await fetch(UrlApi.getUserSmsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        country_code: "+7",
        number: phoneNumber,
      }),
    });
    const data = await response.json();
    if (data) {
      setPhoneNumberId(data.id);
    }
  };

  const handleSubmit = async (values: FieldType) => {
    // Логика отправки формы
    console.log("Success:", values);
    setIsModalOpen(true);
    setPhoneNumber(values.phone);
    setFormData(values);
    await handleSmsSubmit(values.phone);
  };

  const handleOrderSuccess = (values: FieldType) => { return async (accessToken:string) => {
    const dataUser = await (
      await fetch(UrlApi.getUserInfoApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          token: accessToken,
        }),
      })
    ).json();

    if (dataUser) {
      const data = {
        uuid_id: uuid_id,
        user_id: dataUser.id,
        order_status: "NEW",
        phone_number: values.phone,
        comment: values.comment,
        delivery_type: "DELIVERY",
        // @ts-ignore
        shipping_city: cities[values.city].name_city ?? "Не указано",
        delivery_address: values.address,
        payment_type: values.cash_on_delivery
          ? "CASH_ON_DELIVERY"
          : "CREDIT_CARD",
        cash_on_delivery: values.cash_on_delivery,
      };

      // создаем заказ
      await fetch(UrlApi.getOrderApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }).then((response) => {
        window.localStorage.removeItem("uuid_id");
      });
    }
  }};

  return (
    <>
      {contextHolder}
      <Modal
        title={t("placing-an-order")}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Suspense fallback={<Spin />}>
          {phoneNumber != "" && (
            <SmsCode
              params={params}
              numberPhone={phoneNumber}
              phone_number_id={phoneNumberId}
              onSuccess={handleOrderSuccess(formData!)}
            />
          )}
        </Suspense>
      </Modal>
      <Flex
        style={{ width: "100%", minHeight: "800px" }}
        justify="center"
        align="center"
      >
        <Flex style={{ width: "80%", minHeight: "600px" }} vertical gap="15px">
          <h1>{t("placing-an-order")}</h1>
          <Flex style={{ width: "100%" }}>
            <Flex style={{ width: "45%" }}>
              <BasketBody params={params} />
            </Flex>
            <Divider type="vertical" />
            <Flex vertical gap="15px" style={{ width: "50%" }}>
              <h2>{t("data-for-placing-an-order")}</h2>
              <Form onFinish={handleSubmit}>
                {/* ФИО */}
                <Form.Item<FieldType>
                  label={t("fio")}
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: t("please-input-your-username"),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                {/* Телефон */}
                <Form.Item<FieldType>
                  label={t("telefon")}
                  name="phone"
                  rules={[
                    { required: true, message: t("please-input-your-phone") },
                  ]}
                >
                  <Input />
                </Form.Item>
                {/* Email */}
                <Form.Item<FieldType>
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: t("please-input-your-email") },
                  ]}
                >
                  <Input />
                </Form.Item>
                {/* Город */}
                <Form.Item<FieldType>
                  label={t("selectCity")}
                  name="city"
                  rules={[
                    { required: true, message: t("please-input-your-city") },
                  ]}
                >
                  <Select
                    options={cities.map((city) => ({
                      label: selectDataByLangCity(city, locale),
                      value: city.id,
                    }))}
                  />
                </Form.Item>
                {/* Адрес */}
                <Form.Item<FieldType>
                  label={t("address")}
                  name="address"
                  rules={[
                    { required: true, message: t("please-input-your-address") },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<FieldType>
                  label={t("deliveryType")}
                  name="delivery_type"
                  rules={[
                    {
                      required: true,
                      message: t("please-select-delivery-type"),
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value="DELIVERY">{t("delivery")}</Radio>
                    <Radio value="PICKUP">{t("pickup")}</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item<FieldType>
                  label={t("paymentType")}
                  name="cash_on_delivery"
                >
                  <Checkbox />
                </Form.Item>
                {/* Комментарий */}
                <Form.Item<FieldType> label={t("kommentarii")} name="comment">
                  <Input />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  {t("podtverdit")}
                </Button>
              </Form>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
