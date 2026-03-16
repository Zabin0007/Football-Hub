import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/src/components/Navbar";



export const metadata: Metadata = {
  title: "NowScore",
  description: "d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className=''
      >
        <Navbar/>
        <main className="">
          {children}
        </main>
      </body>
    </html>
  );
}
