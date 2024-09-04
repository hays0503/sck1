"use server";

import { MainPage } from "@/_pages/MainPage/MainPage";
import { isMobileDevice } from "@/shared/tools/responsive";

const Page = async ({ params }: { params: any }) => {
  console.log("C:/code/sck1/app/[locale]/[city]/page.tsx => Page=>",params)
  const mobile = isMobileDevice();
  return <MainPage params={{ ...params, mobile }} />;
};

export default Page;
