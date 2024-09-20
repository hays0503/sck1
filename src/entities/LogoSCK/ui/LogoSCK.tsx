import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function LogoSCK({ params }: { params: any }) {
  const localeActive = useLocale();
  return (
    <>
      <a
        href={`/${localeActive}/${params.city}`}
        >
        <div
          style={{
            position: "relative",
            width: "82px",
            height: "44px",
            backgroundColor: "#FFC00E",
            padding: "4px,12px,4px,12px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "4px",
          }}
        >
          <Image
            alt="logo sck"
            src={"/logo.svg"}
            width={58}
            height={32}
            style={{ objectFit: "contain", objectPosition: "center center" }}
          />
        </div>
      </a>
    </>
  );
}
