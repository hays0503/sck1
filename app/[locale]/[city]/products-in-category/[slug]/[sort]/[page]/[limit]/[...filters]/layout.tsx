import { UrlApiWithDomain, UrlRevalidate } from "@/shared/api/url";
import type { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "dev.SCK-1.kz",
  description: "Сайт в разработке dev.SCK-1.kz",
};


export async function generateStaticParams() {
  const fetchCity = await (await fetch(UrlApiWithDomain.getCity,{
    ...UrlRevalidate.getCity,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })).json();
  const city = fetchCity.map((i:any)=>({city:i.additional_data.EN}));
  return city
}

export default async function RootLayout({
  children,
  params: { locale,city},
}: {
  children: React.ReactNode;
  params: { locale: string,city:string};
}) {

  unstable_setRequestLocale(locale);
  return (
    <html lang={locale} >
      <body>
        {children}
      </body>
    </html>
  );
}
