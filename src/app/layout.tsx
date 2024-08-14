import "@jebe/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@jebe/trpc/react";
import { NextUIProvider } from "@nextui-org/react";
import AuthProvider from "@jebe/app/_components/AuthProvider";


export const metadata = {
  title: "Llamados - JEBE 2024",
  description: "2° Congreso de Jóvenes JEBE",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

interface Props {
  children: React.ReactNode;
}

const RootLayout:React.FC<Props> = ({children}): JSX.Element => {
  return (
    <html lang="es" className={`${GeistSans.variable}`}>
      <body>
      <NextUIProvider>
        <AuthProvider>
          <TRPCReactProvider>
              <main className="w-screen h-screen flex bg-llamados bg-center bg-cover">
              {children}
              </main>
          </TRPCReactProvider>
        </AuthProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}

export default RootLayout;