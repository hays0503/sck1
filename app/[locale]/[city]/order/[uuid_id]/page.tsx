"use server";
import { headers } from 'next/headers'
import { isMobileDevice } from "@/shared/tools/responsive";
import { OrderPage } from '@/_pages/OrderPage';

const Page = async ({ params }: { params: any }) => {
  const mobile = isMobileDevice(headers().get('user-agent')||"");
  return <OrderPage params={{ ...params, mobile }} />;
};

export default Page;
