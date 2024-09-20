import { HeaderMenu } from "@/features/HeaderMenu";
import HeaderNavigation from "@/features/HeaderNavigation/ui/HeaderNavigation";
import { Flex } from "antd";

export default function HeaderSCK({ params,carousel }: { params: any,carousel?:boolean }) {
  return (
    <header>
      <Flex vertical={true} align="center" style={{ width: "100%" }} gap={"15px"}>
        <HeaderNavigation params={params} style={{ width: "80%" }}/>
        <HeaderMenu params={params} style={{ width: "80%" }} carousel={carousel}/>
      </Flex>
    </header>
  );
}
