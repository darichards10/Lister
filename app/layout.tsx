import type { Metadata } from "next";
import { Share_Tech } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Head from "./components/head";
import { UserProvider } from '@auth0/nextjs-auth0/client';


const ShareTech = Share_Tech({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Lister"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
    <html lang="en">
        <main>
          <body className={ShareTech.className}>
            <Head />
            <Header />
            {children}
          </body>
        </main>
    </html>
    </UserProvider>
  );
}
