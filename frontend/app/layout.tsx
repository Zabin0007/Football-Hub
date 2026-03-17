import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/src/context/AuthContext";

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
        <main className="">
          <AuthProvider>
          {children}
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
