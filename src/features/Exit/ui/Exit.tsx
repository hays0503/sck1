import { Button } from "antd";
import { useTranslations } from "next-intl";

export default function Exit() {
  const t = useTranslations();
  const exit = () => {
    localStorage.clear();
    window.location.replace("/");
  }
  return (<Button onClick={exit}>{t("exit")}</Button>)
};