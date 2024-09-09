"use server";
import { headers } from 'next/headers'
import { MainPage } from "@/_pages/MainPage/MainPage";
import { isMobileDevice } from "@/shared/tools/responsive";

const Page = async ({ params }: { params: any }) => {
  const mobile = isMobileDevice(headers().get('user-agent')||"");
  return <MainPage params={{ ...params, mobile }} />;
};

export default Page;
