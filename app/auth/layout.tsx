import { ProvidersServer } from "@/_app/providers/providersServer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "dev.SCK-1.kz",
  description: "Сайт в разработке dev.SCK-1.kz",
};

const inter = Inter({
  subsets: ['cyrillic',"latin"]
})

export default async function RootLayout({
  children,
 }: {
  children: React.ReactNode;
}) {
 
  return (
    <html>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
