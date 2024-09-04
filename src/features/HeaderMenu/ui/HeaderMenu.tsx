import { CatalogDesktop } from "@/entities/CatalogDesktop";
import { LogoSCK } from "@/entities/LogoSCK";
import { Flex } from "antd";

export default function HeaderMenu({ params }: { params: any }) {
  return (
    <>
      <Flex>
        <LogoSCK params={params} />
        <CatalogDesktop params={params} />
      </Flex>
    </>
  )
}
