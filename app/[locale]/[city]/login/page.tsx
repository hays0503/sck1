"use server";
import { headers } from 'next/headers'
import { isMobileDevice } from "@/shared/tools/responsive";
import { LoginPage } from '@/_pages/LoginPage';

const Page = async ({ params }: { params: any }) => {
  const mobile = isMobileDevice(headers().get('user-agent')||"");
  return <LoginPage params={{ ...params, mobile }} />;
};

export default Page;
