import { MainPage } from "@/_pages/MainPage/MainPage";

const Page = async ({ params }: { params: any }) => {
  console.log("C:/code/sck1/app/[locale]/[city]/page.tsx => Page=>",params)
  return <MainPage params={params} />;
};

export default Page;
