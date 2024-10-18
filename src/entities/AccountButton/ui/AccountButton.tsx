"use client";
import { UrlApi } from "@/shared/api/url";
import { useGetCityParams } from "@/shared/hook/useGetCityParams";
import { Button, Typography } from "antd";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { UserInfo } from "os";
import { useEffect, useState } from "react";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";
import { notification } from "antd";
const { Text } = Typography;

export default function AccountButton() {
  const t = useTranslations();
  const localeActive = useLocale();
  const currentCity = useGetCityParams();
  // @ts-ignore
  const [userData, setUserData] = useState<UserInfo>();
  const [accessTokenExpiated, setAccessTokenExpiated] = useState<boolean>(true);
  const [api, contextHolder] = notification.useNotification();

  const getInfo = async () => {
    if (window) {
      const accessToken = window.localStorage.getItem("accessToken");
      const refreshToken = window.localStorage.getItem("refreshToken");
      const setAccessToken = (token: string) => {
        window.localStorage.setItem("accessToken", token);
      };
      const setRefreshToken = (token: string) => {
        window.localStorage.setItem("refreshToken", token);
      };
      const dataUser = await (
        await fetch(UrlApi.getUserInfoApi, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            token: accessToken as string,
          }),
        })
      ).json().then((data) => {
        if(data.detail !== "Token expired") {
          if(data.hasOwnProperty("user")) {
            window.localStorage.setItem("user_id", JSON.stringify(data.user.id));
          }
        }
        return data;
      });

      if (dataUser) {
        // Обновляем токен
        if (dataUser.detail === "Token expired") {
          // const refresh_token = window.localStorage.getItem("refreshToken");
          await fetch(UrlApi.getUserRefreshTokenApi, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              token: refreshToken,
            }),
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              console.log("Token expired =>", data);
              if(data.hasOwnProperty("user_id")) {
                window.localStorage.setItem("user_id", JSON.stringify(data.user_id));
              }
              setAccessToken(data.token);
              getInfo();
            });
        } else {
          if (dataUser.hasOwnProperty("user")) {
            setAccessTokenExpiated(false);
            setUserData(dataUser);
          }
        }
      }
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      {contextHolder}
      <Button
        icon={<Image src="/login.svg" width={32} height={32} alt="login" />}
        size="large"
        onClick={() => {
          if (accessTokenExpiated) {
            window.location.replace(`/${localeActive}/${currentCity}/login`);
          } else {
            window.location.replace(`/${localeActive}/${currentCity}/account`);
          }
        }}
      >
        {/* Не авторизован */}
        {accessTokenExpiated && <Text>{t("lichnyi-kabinet")}</Text>}
        {!accessTokenExpiated && (
          <Text>{`${userData?.user.first_name} ${userData.user.last_name}`}</Text>
        )}
      </Button>
    </>
  );
}
