import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/src/context/AuthContext";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export const metadata: Metadata = {
  title: "NowScore",
  description: "d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [queryClient] = useState(() => new QueryClient)

  return (
    <html lang="en">
      <body
        className=''
      >
        <main className="">
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              {children}
            </AuthProvider>
          </QueryClientProvider>
        </main>
      </body>
    </html>
  );
}
