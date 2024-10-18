"use client";
import { Button, Input, Form, notification } from "antd";
import styles from "./Login.module.scss";
import { useState } from "react";
import { LogoSCK } from "@/entities/LogoSCK";
import { GoogleOutlined } from "@ant-design/icons";
import Image from "next/image";
import SmsCode from "./SmsCode"; // Импортируем компонент для ввода кода
import { UrlApi } from "@/shared/api/url";

export default function Login({ params }: { params: any }) {
  const [api, contextHolder] = notification.useNotification();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isSmsSent, setIsSmsSent] = useState<boolean>(false); // Добавляем состояние для переключения
  const [phone_number_id, setPhone_number_id] = useState<string>(""); // Добавляем состояние для переключения

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = () => {
    // Логика отправки SMS-кода
    fetch(UrlApi.getUserSmsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        country_code: "+7",
        number: phoneNumber,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          setPhone_number_id(data.id);
          setIsSmsSent(true); // После отправки переключаемся на компонент ввода кода
        }
      })
      .catch((error) => {
        api.error({
          message: "Не вышло отправить SMS-код",
          description: error.message,
        });
      });      
  };

  // Если SMS отправлен, отображаем компонент для ввода кода, иначе - ввод номера
  if (isSmsSent) {
     return (
      <SmsCode
        params={params}
        numberPhone={phoneNumber}
        phone_number_id={phone_number_id}
      />
    );
  }

  const GoogleAuth = async () => {
    // Логика Google-авторизации
    const { url: UrlToGoogle } = await fetch(UrlApi.getUserUrlGoogle, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        api.error({
          message: "Не вышло запросить ссылку для авторизации",
          description: error.message,
        });
      });

    if (UrlToGoogle) {
      window.open(UrlToGoogle, "blank");
    }
  };

  return (
    <>
      {contextHolder}
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <LogoSCK params={params} />
        </div>
        <h2 className={styles.title}>Введите номер телефона</h2>
        <p className={styles.subtitle}>
          Мы отправим вам SMS-код в уведомлении на телефон для входа
        </p>
        <Form onFinish={handleSubmit} className={styles.form}>
          <Form.Item>
            <Input
              placeholder="+7 (000) 000 00 00"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className={styles.input}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.submitButton}
            >
              Получить SMS-код
            </Button>
          </Form.Item>
        </Form>

        <p className={styles.orText}>Или войдите через</p>
        <div className={styles.socialIcons}>
          <button className={styles.icon} onClick={GoogleAuth}>
            <Image src={"/google-logo.svg"} alt="vk" width={32} height={32} />
          </button>
          <button className={styles.icon}>
            <Image src={"/vk-logo.svg"} alt="vk" width={32} height={32} />
          </button>
        </div>
        <a href="#" className={styles.helpLink}>
          Нужна помощь?
        </a>
      </div>
    </>
  );
}
