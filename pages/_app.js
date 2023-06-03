import "@/styles/globals.css";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

const lightTheme = createTheme({
  type: "light",
});

const darkTheme = createTheme({
  type: "dark",
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/styles/global.css" />
      </Head>
      <NextThemesProvider
        defaultTheme="system"
        attribute="class"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}
      >
        <NextUIProvider>
          <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
          </SessionProvider>
        </NextUIProvider>
      </NextThemesProvider>
    </>
  );
}
