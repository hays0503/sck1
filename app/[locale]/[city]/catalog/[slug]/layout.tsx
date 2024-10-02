import { ProvidersServer } from "@/_app/providers/providersServer";
import type { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server"; 
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "dev.SCK-1.kz",
  description: "Сайт в разработке dev.SCK-1.kz",
};

const locales = ["en", "ru", "kz"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
const inter = Inter({
  subsets: ['cyrillic',"latin"]
})

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
 
  unstable_setRequestLocale(locale);
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <ProvidersServer>{children}</ProvidersServer>
      </body>
    </html>
  );
}
