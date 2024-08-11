"use server";

import { Providers } from "@/_app/providers/providers";
import { Header } from "@/widgets/Header";

export async function MainPage({ params }: { params: any }) {
  return (
    <>
      <Providers>
        <header>
            <Header {...params}/>
        </header>
        <section>

        </section>
        <footer>

        </footer>
      </Providers>
    </>
  );
}
