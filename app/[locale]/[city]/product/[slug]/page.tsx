"use server";
import { headers } from 'next/headers'
import { isMobileDevice } from "@/shared/tools/responsive";
import { ProductPage } from '@/_pages/ProductPage';

const Page = async ({ params }: { params: any }) => {
  const mobile = isMobileDevice(headers().get('user-agent')||"");
  return <ProductPage params={{ ...params, mobile }} />;
};

export default Page;
