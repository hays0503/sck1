"use client";
import { Suspense, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SaveTokens = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (
      searchParams.get("accessTokenData") &&
      searchParams.get("refreshTokenData")
    ) {
      // Сохраняем токены в localStorage
      window.localStorage.setItem(
        "accessToken",
        searchParams.get("accessTokenData") as string
      );
      window.localStorage.setItem(
        "refreshToken",
        searchParams.get("refreshTokenData") as string
      );
      // Можно сделать перенаправление или другие действия после сохранения
      router.push("/");
    }
  }, []);

  return <div>Saving tokens...</div>;
};

const AuthWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SaveTokens />
    </Suspense>
  );
};

export default AuthWrapper;
