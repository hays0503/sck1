import { HeaderMenu } from "@/features/HeaderMenu";
import HeaderNavigation from "@/features/HeaderNavigation/ui/HeaderNavigation";

export default function HeaderSCK({ params }: { params: any }) {
  return (
    <header>
      <HeaderNavigation params={params} />
      <HeaderMenu params={params} />
    </header>
  );
}
