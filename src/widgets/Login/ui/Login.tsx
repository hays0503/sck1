"use client";
import { Button, Input, Form } from 'antd';
import styles from './Login.module.scss';
import { useState } from 'react';
import { LogoSCK } from '@/entities/LogoSCK';
import { GoogleOutlined } from '@ant-design/icons';
import Image from 'next/image';
import SmsCode from './SmsCode'; // Импортируем компонент для ввода кода

export default function Login({ params }: { params: any }) {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isSmsSent, setIsSmsSent] = useState<boolean>(false); // Добавляем состояние для переключения

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = () => {
    // Логика отправки SMS-кода
    console.log('SMS-код отправлен на номер:', phoneNumber);
    setIsSmsSent(true); // После отправки переключаемся на компонент ввода кода
  };

  // Если SMS отправлен, отображаем компонент для ввода кода, иначе - ввод номера
  if (isSmsSent) {
    return <SmsCode params={params} numberPhone={phoneNumber}/>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <LogoSCK params={params} />
      </div>
      <h2 className={styles.title}>Введите номер телефона</h2>
      <p className={styles.subtitle}>Мы отправим вам SMS-код в уведомлении на телефон для входа</p>
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
        <div className={styles.icon}><Image src={'/google-logo.svg'} alt="vk" width={32} height={32} /></div>
        <div className={styles.icon}><Image src={'/vk-logo.svg'} alt="vk" width={32} height={32} /></div>
      </div>
      <a href="#" className={styles.helpLink}>Нужна помощь?</a>
    </div>
  );
};
