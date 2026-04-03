
"use client";

import "./globals.css";
import { AuthProvider } from "@/src/context/AuthContext";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [queryClient] = useState(() => new QueryClient)

  return (
    <html lang="en">
      <head>
        <title>NowScore</title>
        <meta name="description" content="Provides Live Score of Football and Cricket" />
      </head>
      <body
        className=''
      >
        <main className="">
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                {children}
              </AuthProvider>
            </QueryClientProvider>
          </GoogleOAuthProvider>
        </main>
      </body>
    </html>
  );
}
