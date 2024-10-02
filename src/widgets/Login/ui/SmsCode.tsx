import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./SmsCode.module.scss";
import { LogoSCK } from "@/entities/LogoSCK";
import { UrlApi } from "@/shared/api/url";
import { notification } from "antd";
import { useLocalStorage } from "usehooks-ts";
interface SmsCodeProps {
  params: any;
  numberPhone: string;
  phone_number_id: string;
}

const SmsCode: React.FC<SmsCodeProps> = React.memo(
  ({ params, numberPhone, phone_number_id }) => {
    const [code, setCode] = useState<string[]>(["", "", "", ""]);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [error, setError] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(120); // Таймер на 2 минуты
    const [isResendAllowed, setIsResendAllowed] = useState<boolean>(false);
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const [api, contextHolder] = notification.useNotification();
    const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
    const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");
    const setRef = useCallback((el: HTMLInputElement | null, index: number) => {
      inputRefs.current[index] = el;
    }, []);

    const handleInputChange = (index: number, value: string) => {
      if (/^\d$/.test(value)) {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        setError(false); // Сбрасываем ошибку при вводе цифры

        if (index < code.length - 1) {
          setActiveIndex(index + 1); // Перемещаем фокус на следующее поле
        }
      }
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
      if (event.key === "ArrowRight" && index < code.length - 1) {
        setActiveIndex(index + 1);
      } else if (event.key === "ArrowLeft" && index > 0) {
        setActiveIndex(index - 1);
      } else if (event.key === "Backspace" && !code[index] && index > 0) {
        setActiveIndex(index - 1);
      } else if (event.key === "Tab" && event.shiftKey && index > 0) {
        event.preventDefault(); // Поддержка Shift+Tab
        setActiveIndex(index - 1);
      } else if (event.key === "Tab" && index < code.length - 1) {
        event.preventDefault(); // Поддержка Tab
        setActiveIndex(index + 1);
      }
    };

    const handlePaste = (event: React.ClipboardEvent) => {
      const pasteData = event.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, 4);
      if (pasteData.length === 4) {
        setCode(pasteData.split(""));
        setActiveIndex(3);
        setError(false); // Сбрасываем ошибку при вставке
      } else {
        setError(true); // Показываем ошибку при неправильной вставке
      }
    };

    const handleSubmit = () => {
      if (code.join("").length !== 4) {
        setError(true); // Устанавливаем ошибку, если код введён не полностью
        return;
      }
      setError(false);
      console.log("Введенный код:", code.join(""));

      fetch(
        `${UrlApi.getUserSmsAuth}?code=${code.join(
          ""
        )}&phone_number_id=${phone_number_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setAccessToken(data.access.token);
          setRefreshToken(data.refresh.token);
          window.location.href = "/";
        })
        .catch((error) => {
          api.error({
            message: "Не вышло проверить код",
            description: error.message,
          });
        });

      // Ваша логика проверки кода или отправки данных
    };

    // Таймер обратного отсчета
    useEffect(() => {
      if (timer > 0) {
        const intervalId = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        return () => clearInterval(intervalId); // Очищаем таймер при размонтировании компонента
      } else {
        setIsResendAllowed(true); // Разрешаем повторную отправку кода
      }
    }, [timer]);

    const handleResend = () => {
      if (isResendAllowed) {
        console.log("Повторная отправка кода");
        // Логика повторной отправки кода
        setTimer(120); // Сбрасываем таймер обратно на 2 минуты
        setIsResendAllowed(false);
        setCode(["", "", "", ""]); // Сбрасываем код
        setActiveIndex(0); // Сбрасываем активный индекс
      }
    };

    // Форматирование времени в MM:SS
    const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;
    };

    useEffect(() => {
      if (inputRefs.current[activeIndex]) {
        inputRefs.current[activeIndex]?.focus();
      }
    }, [activeIndex]);

    return (
      <>
        {contextHolder}
        <div className={styles.container}>
          <div className={styles.logoContainer}>
            <LogoSCK params={params} />
          </div>
          <h2 className={styles.title}>Введите код из SMS</h2>
          <p className={styles.subtitle}>
            Код подтверждения отправлен на номер <br />
            <a href={`tel:${numberPhone}`} className={styles.link}>
              {numberPhone}
            </a>
          </p>

          <div className={styles.smsInputContainer} onPaste={handlePaste}>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => setRef(el, index)} // Используем setRef для корректного типа
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`${styles.input} ${error ? styles.error : ""}`}
                aria-label={`Введите цифру ${index + 1} из 4`}
              />
            ))}
          </div>

          {error && (
            <p className={styles.errorMessage}>
              Пожалуйста, введите правильный 4-значный код.
            </p>
          )}

          <p className={styles.timerText}>
            {isResendAllowed ? (
              <span onClick={handleResend} className={styles.resendLink}>
                Отправить код повторно
              </span>
            ) : (
              `Отправить код повторно через ${formatTime(timer)}`
            )}
          </p>

          <button onClick={handleSubmit} className={styles.submitButton}>
            Подтвердить
          </button>

          <a href="#" className={styles.link}>
            Ввести другой номер телефона
          </a>
        </div>
      </>
    );
  }
);

export default SmsCode;
