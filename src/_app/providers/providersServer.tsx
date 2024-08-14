"use server";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "@/shared/ui/style/Reset.scss";
export async function ProvidersServer({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <AntdRegistry>
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </AntdRegistry>
  );
}
