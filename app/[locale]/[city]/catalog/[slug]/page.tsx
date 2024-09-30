"use server";
import { headers } from 'next/headers'
import { isMobileDevice } from "@/shared/tools/responsive";
import { CatalogPage } from '@/_pages/CatalogPage';

const Page = async ({ params }: { params: any }) => {
  const mobile = isMobileDevice(headers().get('user-agent')||"");
  return <CatalogPage params={{ ...params, mobile }} />;
};

export default Page;
