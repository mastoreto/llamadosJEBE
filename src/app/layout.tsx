import "@jebe/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@jebe/trpc/react";
import {NextUIProvider} from "@nextui-org/react";


export const metadata = {
  title: "Llamados - JEBE 2024",
  description: "2° Congreso de Jóvenes JEBE",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <NextUIProvider>
            <main className="w-screen h-screen flex bg-llamados bg-center bg-cover">
            {children}
            </main>
          </NextUIProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
