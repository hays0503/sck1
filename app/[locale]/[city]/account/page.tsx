"use server";
import { headers } from "next/headers";

import { isMobileDevice } from "@/shared/tools/responsive";
import { AccountPage } from "@/_pages/AccountPage/ui/AccountPage";

const Page = async ({ params }: { params: any }) => {
  const mobile = isMobileDevice(headers().get("user-agent") || "");
  return <AccountPage params={{ ...params, mobile }} />;
};

export default Page;
