"use server";
import { headers } from 'next/headers'
import { isMobileDevice } from "@/shared/tools/responsive";
import { ProductsInCategory } from '@/_pages/ProductsInCategory';

const Page: React.FC<{ params: any }> = async ({ params }) => {
  const mobile = isMobileDevice(headers().get('user-agent')||"");
  console.log(params);
  return <ProductsInCategory params={{ ...params, mobile }} />;
};

export default Page;
